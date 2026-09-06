# 🔌 Stage B2.1 Implementation Report: Centralized Frontend API Layer

**Project:** Marine AI Platform (SIH 2026 Unified Repository)  
**Repository:** `c:\Users\Guru\Desktop\SIH 2026\MarineAI`  
**Branch:** `feature/unified-marine-ai`  
**Baseline Commit:** `cf8d59f`  
**Phase:** Stage B2.1 (Centralized Frontend API Layer & Service Abstractions)  
**Date:** September 6, 2026  

---

## 1. Executive Overview

Stage B2.1 establishes the authoritative, centralized frontend API integration layer in `frontend/src/api/`. This layer connects the React 18 UI application to the Express Backend REST API (Port `5000`) while enforcing the **Live Priority & Fallback Architecture**:

1. **Priority**: Live Express backend endpoints always take primary precedence.
2. **Fallback Contract**: If the Express backend is offline, unreachable, or times out, the service layer gracefully falls back to relevant **EXISTING frontend mock/static data fixtures** without crashing the UI.
3. **Explicit Tagging**: All service responses return a uniform contract explicitly indicating whether data is `live` or `fallback` (`isFallback: true`).

No UI pages were modified or connected during B2.1; all existing page component behaviors remain untouched.

---

## 2. Files Created & Modified

### Created Files (Centralized API Layer):
1. `frontend/src/api/client.js` — Native fetch HTTP client wrapper with timeout, JSON parsing, error handling, and `withFallback` wrapper.
2. `frontend/src/api/endpoints.js` — Centralized REST API path constants and parameterized request functions for all Express backend endpoints.
3. `frontend/src/api/adapters.js` — Pure transformation functions normalizing backend models to UI component contracts (PFZ tiers, risk scores, GeoJSON coordinates, AI structures, alerts).
4. `frontend/src/api/weatherApi.js` — Live weather, Open-Meteo ocean, IMD warnings, and unified telemetry service.
5. `frontend/src/api/pfzApi.js` — INCOIS-backed PFZ listing, nearby search, and ranking service.
6. `frontend/src/api/riskApi.js` — Phase 8 Risk Engine integration service.
7. `frontend/src/api/geofenceApi.js` — Phase 3 GIS geofence listing and point/route breach check service with client-side GIS fallback.
8. `frontend/src/api/routeApi.js` — Safe route calculation, A* grid optimizer, and fishing route solver service.
9. `frontend/src/api/aiApi.js` — Agentic AI orchestrator query service.
10. `frontend/src/api/alertsApi.js` — Active maritime alerts and dynamic alert evaluation service.
11. `frontend/.env.example` — Frontend environment configuration template (`VITE_API_BASE_URL`).
12. `B2_1_API_LAYER_REPORT.md` — Stage B2.1 execution and audit report (this document).

### Modified Files:
* None. (Working tree was clean prior to B2.1 and no existing source/page files were altered).

---

## 3. Centralized API Client & Contract Design (`client.js`)

* **Base URL**: `import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'`
* **Default Timeout**: `15000` ms (15 seconds) using `AbortController`.
* **Methods Supported**: `GET`, `POST` (with auto JSON serialization, query parameter encoding, and response status validation).

### Standardized Live/Fallback Contract Structure:

```javascript
// Successful Live Result
{
  data: normalizedData,
  source: "live",
  isFallback: false,
  error: null
}

// Graceful Fallback Result
{
  data: existingMockData,
  source: "fallback",
  isFallback: true,
  error: {
    message: "Request timed out after 15000ms" || "API unavailable",
    status: null || httpStatusCode
  }
}
```

### Timeout & Error Handling:
* Detects network disconnection, HTTP error codes (`400`, `404`, `500`), and `AbortController` timeouts.
* Preserves HTTP status and error descriptions while sanitizing server errors so sensitive internal details are never exposed to UI components.

---

## 4. Express Endpoint Definitions (`endpoints.js`)

All 20 Express endpoints documented in `B1_API_INTEGRATION_AUDIT.md` are defined with parameterized builder functions:

| Endpoint Key | Path | Function Signature | Description |
| :--- | :--- | :--- | :--- |
| `HEALTH` | `/health` | `health()` | Express backend status |
| `LIVE_DATA` | `/live-data` | `liveData()` | Aggregated ocean metrics |
| `WEATHER` | `/weather` | `weather({ lat, lon })` | Open-Meteo live weather |
| `WEATHER_FORECAST` | `/weather/forecast` | `weatherForecast({ lat, lon, targetDate })` | Weather forecast |
| `OCEAN` | `/ocean` | `ocean({ lat, lon })` | Open-Meteo marine telemetry |
| `OCEAN_FORECAST` | `/ocean/forecast` | `oceanForecast({ lat, lon, targetDate })` | Marine forecast |
| `WARNINGS` | `/warnings` | `warnings({ lat, lon })` | IMD cyclone warnings |
| `PFZ` | `/pfz` | `pfz({ category, limit })` | INCOIS PFZ list |
| `PFZ_NEARBY` | `/pfz/nearby` | `pfzNearby({ latitude, longitude, limit })` | Nearby PFZ query |
| `PFZ_RANKED` | `/pfz/ranked` | `pfzRanked({ latitude, longitude })` | Ranked PFZs |
| `MARINE_SST` | `/marine/sst` | `marineSst({ minLat, maxLat, minLon, maxLon })` | INCOIS ERDDAP SST |
| `MARINE_RISK` | `/marine/risk` | `marineRisk(body)` | Risk score calculation |
| `MARINE_GEOFENCE` | `/marine/geofence` | `geofence({ latitude, longitude })` | GIS geofence list |
| `MARINE_GEOFENCE_CHECK` | `/marine/geofence/check` | `geofenceCheck(body)` | Point/route breach check |
| `ROUTE_MARINE` | `/route/marine` | `routeMarine(body)` | Waypoint route solver |
| `ROUTE_OPTIMIZE` | `/route/optimize` | `routeOptimize(body)` | A* grid optimizer |
| `FISHING_ROUTE_FIND` | `/fishing-route/find` | `fishingRouteFind(body)` | Safe route to PFZ |
| `MARINE_ANALYZE` | `/marine/analyze` | `marineAnalyze(body)` | Agentic AI multi-step query |
| `ALERTS` | `/alerts` | `alerts()` | Active maritime alerts |
| `ALERTS_EVALUATE` | `/alerts/evaluate` | `alertsEvaluate(body)` | Dynamic alert evaluator |

---

## 5. Pure Data Transformation Adapters (`adapters.js`)

1. `adaptTelemetry(weatherData, oceanData)`: Merges parallel weather & ocean API responses into unified telemetry model.
2. `adaptPfzTier(score)`: Maps numeric PFZ score to UI category badges (`VERY_HIGH` >= 80, `HIGH` >= 60, `MODERATE` >= 40, `LOW` < 40).
3. `adaptPfzModel(pfz)`: Normalizes INCOIS feature objects into UI PFZ card props.
4. `adaptRiskScore(backendRisk)`: Scales uncapped backend risk score (0-250+) to 0–100 gauge percentage: `gaugeScore = Math.min(100, Math.round((score / 250) * 100))`.
5. `toGeoJSONCoords({ latitude, longitude })`: Transforms coordinate objects or `[lat, lon]` pairs into GeoJSON `[longitude, latitude]`.
6. `adaptAiResponse(backendAiResult)`: Normalizes Agentic AI intent, answer text, recommendations, and evidence.
7. `adaptRouteRepresentation(backendRoute)`: Converts backend route path arrays into structured waypoints and GeoJSON coordinate strings.
8. `adaptAlertModel(alert)`: Normalizes backend maritime alerts for UI alert lists.

---

## 6. Identified & Reused Existing Mock Data

No new mock data was fabricated. The API layer reuses existing, established frontend static fixtures during fallback states:

* **Weather & Ocean**: Wind `14 kt NE`, Waves `1.2 m`, SST `28.4 °C`, Chlorophyll `2.8 mg/m³`, Current `0.6 m/s NE`, Visibility `10 km`.
* **PFZ Explorer**: `PFZ-001` (Godavari Estuary, score 82), `PFZ-002` (Kakinada Deep Sea, score 88), `PFZ-003` (Coromandel South, score 65).
* **Marine Risk**: Score `40/100` (Level: Moderate) with factors (Wind 75, Waves 60, Lightning 90, Cyclone 30, Current 50).
* **GIS Geofencing**: `DEMO_GEOFENCE_ZONES` from `frontend/src/gis/geofence.js` (`IMBL_001`, `MPA_001` Coringa Sanctuary, `DANGER_ZONE_001`).
* **Safe Routes**: Kakinada anchorage (`[16.98, 82.24]`) to target PFZ (`[16.742, 82.491]`), distance `36.4 km`, risk cost `12.5`.
* **Agentic AI**: Demo response structure matching `AIResponseCard.jsx` (Risk level 40, PFZ distance 31.8 km, route distance 36.4 km).
* **Alerts**: Initial alerts fixture matching `AlertsPage.jsx` (`alt-1` High Wind, `alt-2` Cyclone Activity, `alt-3` High Waves).

---

## 7. Security & Environment Configuration

* **`frontend/.env.example`**: Defines `VITE_API_BASE_URL=http://localhost:5000/api`.
* **Strict Security Boundary**: `GEMINI_API_KEY`, `WEATHER_API_KEY`, and `DATABASE_URL` remain strictly backend-only `.env` variables and are never referenced in frontend code.
* **Console Logging Policy**: On fallback, concise development warnings (`console.warn('[MarineAI] API unavailable...')`) are printed without exposing authorization headers, API keys, or tokens.

---

## 8. Verification & Build Confirmation

* **Build Command**: `cd frontend && npm run build`
* **Result**: ✅ **PASSED** (Built in 4.40s with zero errors).
* **Active Servers**: All background server tasks were terminated post-test. No long-running processes remain active.
* **Untouched Pages**: Confirmed that `DashboardPage.jsx`, `AIAssistantPage.jsx`, `MarineMapPage.jsx`, `PFZExplorerPage.jsx`, `SafetyRiskPage.jsx`, `SafeRoutesPage.jsx`, `WeatherPage.jsx`, `AlertsPage.jsx`, `GeofencesPage.jsx`, `ReportsPage.jsx`, and `SettingsPage.jsx` remain 100% untouched.

---

## 9. Git Status Inspection

```bash
On branch feature/unified-marine-ai
Untracked files:
  B2_1_API_LAYER_REPORT.md
  frontend/.env.example
  frontend/src/api/
```

* **No commits or pushes were executed.**
* **Working tree modifications restricted exclusively to `frontend/src/api/`, `frontend/.env.example`, and `B2_1_API_LAYER_REPORT.md`.**
