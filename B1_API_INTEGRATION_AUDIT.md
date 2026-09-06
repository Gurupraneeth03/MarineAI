# 🔌 Phase B1 Frontend ↔ Backend API Integration Audit & Mapping

**Project:** Marine AI Platform (SIH 2026 Unified Repository)  
**Repository:** `c:\Users\Guru\Desktop\SIH 2026\MarineAI`  
**Branch:** `feature/unified-marine-ai`  
**Audit Date:** September 6, 2026  
**Document Name:** `B1_API_INTEGRATION_AUDIT.md`

---

## 1. Executive Summary

Phase B1 establishes the technical contract and data transformation mapping between the complete **React 18 Frontend UI** (`frontend/src/`) and the authoritative **Express Backend REST API** (`backend/src/server.js`).

### Key Findings:
1. **API Centralization**: The Express Backend (Port `5000`) already implements REST endpoints for weather, oceanography, PFZ intelligence, geofencing boundary analysis, risk calculations, route solvers, alert engines, and Agentic AI queries.
2. **FastAPI Microservice Strategy**: The FastAPI microservice (`backend/app/main.py` on Port `8000`) duplicate-serves PFZ queries. To prevent cross-port complexity, the frontend will communicate **exclusively with the Express API (Port 5000)**, which proxies or encapsulates spatial services.
3. **Data Shape Adapters Required**: Data shape discrepancies exist between backend response models (e.g. INCOIS raw features, numeric risk scores 0-250+, Extended Phase 3 geofence objects) and UI component props. Client-side adapter functions in `frontend/src/api/` will normalize these data streams.

---

## 2. Express Backend API Inventory

The Express server (`backend/src/server.js`) exposes the following endpoints verified by source inspection:

| Endpoint Path | Method | Controller / File | Body / Query Parameters | Response Structure | External Source |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | `server.js` | None | `{ status: "ok", message: "...", services: {...} }` | Internal |
| `/api/weather` | `GET` | `liveDataController.js` | Required: `lat`, `lon` | `{ success: true, windSpeed, windGust, precipitation, weatherCode, source: "Open-Meteo" }` | Live Open-Meteo API |
| `/api/weather/forecast` | `GET` | `liveDataController.js` | Required: `lat`, `lon`, `targetDate` | `{ success: true, forecastDate, windSpeed, windGust, precipitationProbability, ... }` | Live Open-Meteo API |
| `/api/ocean` | `GET` | `liveDataController.js` | Required: `lat`, `lon` | `{ success: true, waveHeight, wavePeriod, sst, currentSpeed, currentDirection, source: "Open-Meteo Marine" }` | Live Open-Meteo Marine API |
| `/api/ocean/forecast` | `GET` | `liveDataController.js` | Required: `lat`, `lon`, `targetDate` | `{ success: true, forecastDate, waveHeight, wavePeriod, sst, currentSpeed, ... }` | Live Open-Meteo Marine API |
| `/api/warnings` | `GET` | `liveDataController.js` | Optional: `lat`, `lon` | `{ success: true, count, warnings: [...] }` | IMD Cyclone Feed |
| `/api/pfz` | `GET` | `pfzController.js` | Optional: `category`, `limit` | `{ success: true, count, category, source: "INCOIS", pfzs: [...] }` | Live INCOIS Capabilities XML |
| `/api/pfz/nearby` | `GET` | `pfzController.js` | Optional: `latitude`, `longitude`, `limit` | `{ success: true, count, user_location, pfzs: [...] }` | Live INCOIS Capabilities XML |
| `/api/pfz/ranked` | `GET` | `pfzController.js` | Required: `latitude`, `longitude` | `{ success: true, count, user_location, rankedPfzs: [...] }` | Live INCOIS Solver |
| `/api/marine/sst` | `GET` | `sstController.js` | Optional: `minLat`, `maxLat`, `minLon`, `maxLon` | `{ success: true, source: "INCOIS ERDDAP", sstData: [...] }` | INCOIS ERDDAP API |
| `/api/marine/risk` | `POST` | `riskController.js` | Body: `{ windSpeed, windGust, waveHeight, rainProbability, lightning, cyclone }` | `{ success: true, risk: { score, level, factors, perFactorBreakdown, confidenceScore, explainability } }` | Phase 8 Risk Engine |
| `/api/marine/geofence` | `GET` | `geofenceController.js` | Optional query: `latitude`, `longitude` | `{ status: "ok", count, zones, geoJson, disclaimer }` | Phase 3 GIS Engine |
| `/api/marine/geofence/check` | `POST` | `geofenceController.js` | Body: `{ latitude, longitude, waypoints, pfzs }` | `{ status: "ok", classification, pointCheck, routeCheck, pfzSafetyEnrichment, explanation, disclaimer }` | Phase 3 GIS Engine |
| `/api/route/marine` | `POST` | `marineRouteController.js` | Body: `{ startLat, startLon, destLat, destLon }` | `{ success: true, route: { waypoints, distanceKm, riskScore, geofenceStatus } }` | Route Solver |
| `/api/route/optimize` | `POST` | `routeRoutes.js` | Body: `{ grid, start, goal, restrictedCells, marineConditions }` | `{ success: true, path, totalCost, marineRisk }` | A* Route Solver |
| `/api/fishing-route/find` | `POST` | `fishingRouteController.js` | Body: `{ startLat, startLon, targetPfzId }` | `{ success: true, route: { waypoints, distanceKm, totalRiskCost, geofenceStatus } }` | Fishing Route Solver |
| `/api/marine/analyze` | `POST` | `marineAnalyzeController.js` | Body: `{ query, userLocation, language }` | `{ success: true, intent, answer, recommendation, evidence, context }` | Agentic AI Orchestrator |
| `/api/alerts` | `GET` | `alertController.js` | None | `{ success: true, count, alerts: [...] }` | Alert Engine |
| `/api/alerts/evaluate` | `POST` | `alertController.js` | Body: `{ weather, ocean, location }` | `{ success: true, count, alerts: [...] }` | Alert Engine |

---

## 3. FastAPI Microservice Inventory

FastAPI entry point: `backend/app/main.py` (Port `8000`)

| Endpoint Path | Method | Parameters | Purpose | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `GET` | None | Service status & title metadata | Internal microservice check |
| `/api/health` | `GET` | None | Health check | Internal microservice check |
| `/api/pfz` | `GET` | Query: `category` | Returns mock PFZ list | **Do not call directly** (Express `/api/pfz` already serves this with live INCOIS data) |
| `/api/pfz/nearby` | `GET` | Query: `lat`, `lon`, `category` | Returns nearby mock PFZs | **Do not call directly** (Express `/api/pfz/nearby` already serves this) |

*Decision:* All frontend communications will target the **Express API on Port 5000**. The FastAPI service remains an internal microservice.

---

## 4. Frontend Page & Component Audit

| Page Component | Sub-Components | Current Data Mode | Backend API Target |
| :--- | :--- | :--- | :--- |
| **`DashboardPage.jsx`** | `SpatialIntelligenceMap`, `MarineAICoPilot`, `ActiveAlertsCard`, `MarineSafetyCard`, `NearestPFZCard`, `WeatherOceanCards` | Static mock state + hardcoded coordinates | `GET /api/weather`, `GET /api/ocean`, `GET /api/pfz/nearby`, `POST /api/marine/risk`, `GET /api/alerts` |
| **`AIAssistantPage.jsx`** | `ProcessingPipeline`, `AIResponseCard`, `FleetContextSidebar` | `setTimeout(1200)` simulation | `POST /api/marine/analyze` |
| **`MarineMapPage.jsx`** | `MarineMap`, `MapLegend`, `PFZInfoCard` | `DEMO_GEOFENCE_ZONES` + static PFZ array | `GET /api/pfz`, `GET /api/marine/geofence`, `POST /api/marine/geofence/check`, `GET /api/marine/sst` |
| **`PFZExplorerPage.jsx`** | `PFZCard`, `PFZFilterBar`, `PFZTelemetryGrid` | Hardcoded PFZ arrays | `GET /api/pfz`, `GET /api/pfz/ranked` |
| **`SafetyRiskPage.jsx`** | `SafetyScoreGauge`, `RiskIndexCard`, `AIRiskReasoningCard`, `CraftToleranceCard` | Mock risk score (78/100) & limits | `POST /api/marine/risk`, `GET /api/weather`, `GET /api/ocean` |
| **`SafeRoutesPage.jsx`** | `SafeRouteMapCard`, `RouteAssessmentCard`, `WaypointsListCard` | Hardcoded waypoints & static risk cost | `POST /api/fishing-route/find`, `POST /api/marine/geofence/check` |
| **`WeatherPage.jsx`** | `WindWaveGaugeCard`, `OceanMetricsCard`, `DiurnalHourlyCard`, `IMDAlertBanner` | Hardcoded metrics (18 kts, 2.1m waves) | `GET /api/weather`, `GET /api/ocean`, `GET /api/weather/forecast`, `GET /api/warnings` |
| **`AlertsPage.jsx`** | `AlertCard`, `AlertSummaryBar` | Hardcoded alert array | `GET /api/alerts`, `GET /api/warnings` |
| **`GeofencesPage.jsx`** | Zone detail cards & violation log | Hardcoded zone list | `GET /api/marine/geofence`, `POST /api/marine/geofence/check` |
| **`ReportsPage.jsx`** | Document preview brief | Static metrics | Aggregated from `GET /api/live-data`, `GET /api/pfz` |
| **`SettingsPage.jsx`** | `APISettingsCard`, `VesselProfileSettingsCard` | Local state | Saves vessel specs to pass into `POST /api/marine/risk` |

---

## 5. Detailed Frontend ↔ Backend Mapping Matrix

### 1. Command Dashboard (`DashboardPage.jsx`)
* **Primary Endpoint**: `GET /api/weather?lat=16.98&lon=82.24` and `GET /api/ocean?lat=16.98&lon=82.24`
* **HTTP Method**: `GET`
* **Parameters**: `lat=16.98`, `lon=82.24`
* **UI Response Fields**: `windSpeed`, `waveHeight`, `sst`, `precipitationProbability`
* **Current Mock Source**: Inline JS state in `DashboardPage.jsx`
* **Adapter Required**: **YES**. Combine weather and ocean API payloads into single telemetry state object.
* **Difficulty**: Easy

### 2. AI Assistant (`AIAssistantPage.jsx`)
* **Primary Endpoint**: `POST /api/marine/analyze`
* **HTTP Method**: `POST`
* **Request Body**: `{ query: string, userLocation: { latitude, longitude }, language: "en"|"te" }`
* **UI Response Fields**: `answer`, `recommendation`, `evidence`
* **Current Mock Source**: `setTimeout` simulation in `AIAssistantPage.jsx`
* **Adapter Required**: **YES**. Format `answer` and `evidence` into chat bubble format expected by `AIResponseCard.jsx`.
* **Difficulty**: Medium

### 3. PFZ Intelligence Explorer (`PFZExplorerPage.jsx`)
* **Primary Endpoint**: `GET /api/pfz/ranked?latitude=16.98&longitude=82.24`
* **HTTP Method**: `GET`
* **Parameters**: `latitude=16.98`, `longitude=82.24`
* **UI Response Fields**: `id`, `name`, `latitude`, `longitude`, `score`, `category`
* **Current Mock Source**: Hardcoded `pfzArray` in `PFZExplorerPage.jsx`
* **Adapter Required**: **YES**. Map INCOIS feature objects to UI tier badges (`VERY_HIGH`, `HIGH`, `MODERATE`, `LOW`).
* **Difficulty**: Easy

### 4. Safety & Risk Assessor (`SafetyRiskPage.jsx`)
* **Primary Endpoint**: `POST /api/marine/risk`
* **HTTP Method**: `POST`
* **Request Body**: `{ windSpeed, windGust, waveHeight, rainProbability, lightning, cyclone }`
* **UI Response Fields**: `score`, `level`, `factors`, `perFactorBreakdown`, `confidenceScore`, `explainability`
* **Current Mock Source**: Hardcoded risk index state in `SafetyRiskPage.jsx`
* **Adapter Required**: **YES**. Normalize numeric score range (0-250+) to 0-100 gauge display.
* **Difficulty**: Medium

### 5. Safe Route Planner (`SafeRoutesPage.jsx`)
* **Primary Endpoint**: `POST /api/fishing-route/find`
* **HTTP Method**: `POST`
* **Request Body**: `{ startLat: 16.98, startLon: 82.24, targetPfzId: string }`
* **UI Response Fields**: `waypoints`, `distanceKm`, `totalRiskCost`, `geofenceStatus`
* **Current Mock Source**: Static waypoint array in `SafeRoutesPage.jsx`
* **Adapter Required**: **YES**. Transform waypoints `[{ lat, lon }]` into GeoJSON LineString coordinates `[[lon, lat]]`.
* **Difficulty**: Medium

---

## 6. Data Shape Mismatches & Adapter Specifications

| Mismatch ID | Component / Feature | Backend Output Format | Frontend UI Expected Format | Required Transformation / Adapter Function |
| :--- | :--- | :--- | :--- | :--- |
| **MISMATCH-1** | PFZ Category Rating | `category: "INCOIS_PFZ"` | `category: "VERY_HIGH" \| "HIGH" \| "MODERATE" \| "LOW"` | Map `pfz_score` (or index position) to category tiers: >80 -> `VERY_HIGH`, 60-80 -> `HIGH`, 40-60 -> `MODERATE`, <40 -> `LOW`. |
| **MISMATCH-2** | Weather & Ocean Telemetry | Two separate endpoints (`/api/weather` & `/api/ocean`) | Unified `telemetry` object | Combine parallel `Promise.all([fetchWeather(), fetchOcean()])` responses into single object. |
| **MISMATCH-3** | Risk Gauge Score Scale | `score: 215` (Uncapped cumulative risk points) | `score: 78` (Capped 0-100 gauge percentage) | Scale formula: `gaugeScore = Math.min(100, Math.round((score / 250) * 100))`. |
| **MISMATCH-4** | GeoJSON Coordinate Order | `{ latitude: 16.98, longitude: 82.24 }` | Leaflet GeoJSON `[longitude, latitude]` (`[82.24, 16.98]`) | Utility function `toGeoJSONCoords({ lat, lon }) => [lon, lat]`. |
| **MISMATCH-5** | AI Assistant Chat Bubble | `{ success: true, answer: "...", evidence: {...} }` | Chat stream message object `{ id, type: 'assistant', text, evidenceCard }` | Transform AI orchestrator output to match `AIResponseCard.jsx` props. |

---

## 7. Recommended Central API Layer Design

Location: **`frontend/src/api/`**

### Architecture:
```
frontend/src/api/
├── client.js           # Central Axios/Fetch HTTP wrapper (Base URL, timeout, fallback handling)
├── endpoints.js        # REST route path definitions
├── adapters.js         # Data transformation & normalization functions
├── weatherApi.js       # Weather & ocean data endpoints
├── pfzApi.js           # PFZ listing & ranking endpoints
├── riskApi.js          # Risk index calculation endpoint
├── geofenceApi.js      # Geofence breach verification endpoint
├── routeApi.js         # Safe route calculation endpoint
├── aiApi.js            # Agentic AI query endpoint
└── alertsApi.js        # Active alerts & warnings endpoint
```

### Configuration:
* **Base URL**: `import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'`
* **Timeout**: `15000` ms (15 seconds) with graceful fallback to mock data on network error or timeout.

---

## 8. Security & Environment Boundaries

| Variable Name | Environment Scope | Exposed to Browser? | Purpose / Policy |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Frontend (`frontend/.env`) | **YES** | Public API target URL (`http://localhost:5000/api`) |
| `GEMINI_API_KEY` | Backend (`.env` at root) | 🛑 **NO** | Kept strictly on server; AI queries proxied through `/api/marine/analyze` |
| `WEATHER_API_KEY` | Backend (`.env` at root) | 🛑 **NO** | Kept strictly on server; Weather proxied through `/api/weather` |
| `DATABASE_URL` | Backend (`.env` at root) | 🛑 **NO** | Kept strictly on server |

---

## 9. Integration Dependencies & Blockers

1. **Express Backend Running**: Express server must be running on port 5000 (`cd backend && npm start`).
2. **CORS Enabled**: Express backend `cors()` middleware verified enabled in `server.js`.
3. **No Frontend Structural Changes**: Frontend UI components remain visually identical; adapters replace static `useState` initializers.

---

## 10. Recommended B2 Implementation Order

When executing Phase B2 (API Layer & Service Integration), follow this order:

1. **Step B2.1**: Create `frontend/src/api/client.js`, `endpoints.js`, and `adapters.js`.
2. **Step B2.2**: Wire Dashboard & Telemetry (`weatherApi.js`, `alertsApi.js`).
3. **Step B2.3**: Wire PFZ Explorer & Maps (`pfzApi.js`, `geofenceApi.js`).
4. **Step B2.4**: Wire Safety & Risk Assessor (`riskApi.js`).
5. **Step B2.5**: Wire Safe Route Planner (`routeApi.js`).
6. **Step B2.6**: Wire Agentic AI Assistant (`aiApi.js`).

---

*Phase B1 Audit Completed. Document created at root.*
