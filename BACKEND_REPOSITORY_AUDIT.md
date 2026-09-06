# 🧭 Backend Repository Audit Report — Marine AI Platform

**Project:** Marine AI Advisory & Navigation System (SIH 2026 Backend & AI Core)  
**Audit Date:** September 6, 2026  
**Repository Path:** `c:\Users\Guru\Desktop\SIH 2026\marine-ai-latest`  
**Purpose:** Pre-unification audit of backend services, Agentic AI engine, GIS algorithms, risk engines, and unification preservation plan.

---

## 1. Executive Summary

The `marine-ai-latest` repository contains the **latest, authoritative backend, Agentic AI, GIS, and Risk Engine implementations** developed for the Marine AI Platform.

### Key Capabilities Present in this Repository:
* **Phase 7 Multi-Turn AI Context & Language:** Context memory manager supporting multi-turn conversation tracking, ordinal reference resolution, and Telugu regional query processing.
* **Phase 8 AI Explainability Engine:** Per-factor risk scoring breakdown, confidence scores, evidence source attributions, selection/rejection rationale, and safety alert triggers.
* **Phase 3 Geofencing & Boundary Math:** Enhanced client/server geofencing module supporting 6 restricted zone categories, ray-casting point-in-polygon tests, and route segment intersection warnings.
* **Live Oceanographic Data Connectors:** Express services integrating live SST (Sea Surface Temperature), Chlorophyll, INCOIS ERDDAP data, IMD cyclone warnings, and PFZ (Potential Fishing Zone) recommendations.

---

## 2. Technical Component Breakdown

### 2.1 Complete Directory Structure
```
marine-ai-latest/
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore configuration
├── HANDOFF_MEMBER4_MEMBER5.md       # GIS/Risk integration contract doc
├── HANDOFF_MEMBER6.md               # Lead integration summary
├── MEMBER_1_EXECUTION_SUMMARY.txt   # AI execution report
├── README.md                        # Project overview
├── incois-capabilities.xml          # INCOIS WMS/WFS capabilities schema
├── pfz-capabilities.xml             # INCOIS PFZ service capabilities schema
├── test-fishing.json                # Fishing vessel test telemetry
├── package.json                     # Root dependencies (@google/generative-ai)
├── package-lock.json                # Root package lockfile
├── ai/                              # Agentic AI Engine (Phases 1-8)
│   ├── agents/
│   │   ├── intentAgent.js           # Query intent classifier (7 intent classes + Telugu)
│   │   ├── plannerAgent.js          # Dynamic task sequence generator
│   │   └── synthesisAgent.js        # Evidence-backed answer synthesizer (Phase 8 Explainability)
│   ├── contextManager.js            # Multi-turn state & location memory
│   ├── orchestrator.js              # Central agentic pipeline runner
│   ├── prompts.js                   # System prompt templates
│   ├── tools.js                     # REST API tool execution wrappers
│   ├── test.js                      # Automated AI test suite
│   ├── test_multiturn_phase7.js     # Phase 7 multi-turn & Telugu test suite
│   ├── package.json                 # AI module dependencies
│   └── package-lock.json
├── backend/                         # Node.js/Express REST API Server & FastAPI Microservice
│   ├── package.json                 # Express dependencies (express, cors, dotenv)
│   ├── app/                         # FastAPI Python Microservice (Member 3 GIS API)
│   │   ├── main.py                  # FastAPI application entry point
│   │   └── mock_data.py             # Bay of Bengal PFZ dataset
│   ├── routes/                      # Additional route handlers (fishing, marine, route, SST)
│   ├── services/                    # Oceanographic & risk calculation backend services
│   │   ├── chlorophyllService.js    # Chlorophyll data fetcher
│   │   ├── cycloneService.js        # IMD cyclone warning processor
│   │   ├── dataQualityService.js    # Marine data validation & quality score
│   │   ├── fishingRouteService.js   # Fishing route generation
│   │   ├── geofenceService.js       # Geofence breach verification
│   │   ├── marineDataService.js     # Live INCOIS ocean metrics
│   │   ├── pfzService.js            # Potential Fishing Zone solver
│   │   ├── routeOptimizer.js        # Dynamic waypoint route solver
│   │   └── sstService.js            # INCOIS ERDDAP SST service
│   └── src/                         # Primary Express Server codebase
│       ├── server.js                # Main Express server entry point (Port 5000)
│       ├── alertEngine.js           # Dynamic alert generator
│       ├── hazardDetector.js        # Maritime hazard breach detector
│       ├── controllers/             # Express API controllers (alert, geofence, pfz, risk, sst, liveData)
│       └── routes/                  # Express REST routes (/api/marine, /api/pfz, /api/alerts, etc.)
├── gis/                             # Core GIS & Geofencing Engine (Phase 3)
│   ├── distance.js                  # Spatial distance math (Haversine)
│   ├── geofence.js                  # Polygon breach & route hazard checker (14 KB enhanced)
│   ├── spatialQueries.js            # Spatial query utilities
│   ├── test_geofence_phase3.js      # Phase 3 geofence verification tests
│   └── layers/                      # GeoJSON feature collection generators
├── risk-engine/                     # Marine Safety & Risk Calculation Engine (Phase 8)
│   ├── riskCalculator.js            # Risk index calculator with per-factor breakdown (5.6 KB enhanced)
│   ├── riskGrid.js                  # Spatial risk grid evaluator
│   ├── routeCost.js                 # Route risk cost evaluator
│   └── thresholds.js                # Safety thresholds & craft limits
└── frontend/                        # Placeholder frontend directory (OUTDATED)
    └── src/
        └── App.jsx
```

### 2.2 Backend Framework & Version
* **Primary Server:** Node.js Express `^5.2.1` (`backend/src/server.js`)
* **GIS Microservice:** Python FastAPI `2.0.0` with `uvicorn` (`backend/app/main.py`)

### 2.3 Backend Entry Point
* Express API: [backend/src/server.js](file:///c:/Users/Guru/Desktop/SIH%202026/marine-ai-latest/backend/src/server.js) (runs on `PORT` environment variable or `5000`).
* FastAPI API: [backend/app/main.py](file:///c:/Users/Guru/Desktop/SIH%202026/marine-ai-latest/backend/app/main.py) (runs on `0.0.0.0:8000`).

### 2.4 All Backend Services
* `chlorophyllService.js`: Fetches chlorophyll concentration metrics.
* `cycloneService.js`: Checks IMD cyclone alerts and status.
* `dataQualityService.js`: Tracks data freshness, sensor quality, and flags missing inputs.
* `fishingRouteService.js`: Generates optimized fishing trajectories.
* `geofenceService.js`: Evaluates coordinate proximity to restricted zones.
* `marineDataService.js`: Consolidates wind, wave, SST, and ocean state.
* `pfzService.js` & `pfzRecommendationService.js`: Provides ranked PFZ coordinates.
* `routeOptimizer.js`: Solves lowest-risk route avoiding hazard zones.
* `sstService.js`: Fetches Sea Surface Temperature from INCOIS ERDDAP.
* `weatherService.js`: Weather forecasting and wind/wave metrics.

### 2.5 API Routes / Endpoints

#### Express Server (`http://localhost:5000`)
| Route Base | Handled By | Description / Endpoints |
| :--- | :--- | :--- |
| `GET /api/health` | `server.js` | Server health check |
| `GET /api/live-data` | `liveDataRoutes.js` | Aggregated live ocean metrics |
| `POST /api/marine/risk` | `riskRoutes.js` | Calculates marine risk index with per-factor breakdown |
| `POST /api/marine/geofence/check` | `geofenceRoutes.js` | Point and route geofence breach verification |
| `GET /api/pfz` | `pfzRoutes.js` | Fetches active Potential Fishing Zones |
| `GET /api/marine/sst` | `sstRoutes.js` | Fetches SST data from INCOIS ERDDAP |
| `POST /api/route/calculate` | `marineRouteRoutes.js` | Solves dynamic safe route |
| `POST /api/fishing-route` | `fishingRouteRoutes.js` | Generates safe route to target PFZ |
| `POST /api/marine/analyze` | `marineAnalyzeRoutes.js` | Full agentic analysis query endpoint |
| `GET /api/alerts` | `alertRoutes.js` | Active maritime alerts and weather warnings |

#### FastAPI Microservice (`http://localhost:8000`)
| Endpoint | Description |
| :--- | :--- |
| `GET /` | API metadata & online status |
| `GET /api/health` | Health check |
| `GET /api/pfz` | All PFZs with optional category filter (`VERY_HIGH`, `HIGH`, `MODERATE`, `LOW`) |
| `GET /api/pfz/nearby` | PFZs filtered near user latitude & longitude |

### 2.6 Database Components
* **None currently active.** The system reads data dynamically from INCOIS WMS/ERDDAP APIs, XML capability specs (`incois-capabilities.xml`, `pfz-capabilities.xml`), and local mock fallback structures. `.env.example` includes a placeholder `DATABASE_URL="#"`.

### 2.7 AI Components (Agentic AI Engine - `ai/`)
* **`intentAgent.js`**: Classifies query into 7 intents (`PFZ_SEARCH`, `MARINE_SAFETY`, `SAFE_ROUTE`, `MARINE_CONDITIONS`, `GEOFENCE_CHECK`, `HAZARD_ALERT`, `GENERAL_QUERY`) + Telugu regional query processing.
* **`plannerAgent.js`**: Generates task execution graphs for tool calls.
* **`synthesisAgent.js`**: Generates evidence-backed responses with Phase 8 Explainability metadata (per-factor score breakdown, confidence score, source attributions, rationale).
* **`contextManager.js`**: Phase 7 multi-turn context tracking (retains last location, target PFZ, previous risk score, and ordinal references like "first one").
* **`tools.js`**: Thin HTTP REST wrapper connecting the AI engine to Express backend endpoints.
* **`orchestrator.js`**: Top-level function `processQuery()` driving the pipeline.

### 2.8 GIS Components (`gis/`)
* **`geofence.js`**: Ray-casting point-in-polygon algorithm checking coordinates against 6 hazard categories (IMBL, Naval Exercise Area, Protected Marine Sanctuary, Heavy Shipping Lane, Coral Reef Conservation, Harbor Approach Zone).
* **`distance.js`**: Haversine formula calculating distances in kilometers and nautical miles.
* **`spatialQueries.js`**: Spatial distance sorting and category filters.

### 2.9 Risk-Engine Components (`risk-engine/`)
* **`riskCalculator.js`**: Computes weighted marine safety risk score (0-100) based on wind speed, wave height, SST anomaly, visibility, and cyclone proximity. Produces Phase 8 factor breakdown.
* **`riskGrid.js`**: Evaluates risk scores across spatial grid cells.
* **`routeCost.js`**: Evaluates total risk cost along vessel route waypoints.

### 2.10 Data-Processing Components
* **XML Parsers / Capabilities Specs**: `incois-capabilities.xml` and `pfz-capabilities.xml` define spatial bounding boxes, WMS layers, and feature types.
* **`dataQualityService.js`**: Validates sensor data age and completeness.

### 2.11 Authentication
* **None.** No JWT, passport, or session-based authentication is implemented.

### 2.12 Middleware & CORS
* **Express Middleware**: `cors()` (allowing cross-origin requests) and `express.json()` (body parser).
* **FastAPI Middleware**: `CORSMiddleware` (allowing `allow_origins=["*"]`).

### 2.13 Environment Variables
* Root `.env.example`:
  ```env
  PORT=5000
  DATABASE_URL="#"
  LLM_API_KEY="#"
  WEATHER_API_KEY="#"
  FRONTEND_URL=http://localhost:5173
  ```

### 2.14 Docker / Container Configuration
* **None.** No Dockerfile or `docker-compose.yml` present in this repository.

### 2.15 Dependency Files
* `package.json` (Root): `@google/generative-ai` `^0.24.1`, `dotenv` `^17.4.2`
* `backend/package.json`: `express` `^5.2.1`, `cors` `^2.8.6`, `dotenv` `^17.4.2`, `nodemon` `^3.1.14`
* `ai/package.json`: `@google/generative-ai` `^0.24.1`, `dotenv` `^17.4.2`

### 2.16 Frontend Files
* Minimal outdated single-file placeholder in `frontend/src/App.jsx`.
* **Note:** This placeholder MUST be replaced by the React 18 frontend from the `MarineAI` repository.

### 2.17 Shared & Configuration Files
* `.env.example`, `.gitignore`, `README.md`
* `HANDOFF_MEMBER4_MEMBER5.md`, `HANDOFF_MEMBER6.md`, `MEMBER_1_EXECUTION_SUMMARY.txt`

### 2.18 Git Branch & Recent Commit History
* **Branch:** `main`
* **Status:** Clean (`nothing to commit, working tree clean`)
* **Recent Commits:**
  - `4c86f58`: `feat(explainability): complete Phase 8 per-factor scoring, confidence, source attributions, selection/rejection rationale, alert triggers`
  - `4215170`: `Merge pull request #16 from 24pa1a0503-blip/feat/phase7-multiturn-telugu`
  - `d3c0eea`: `feat(ai): complete Phase 7 multi-turn context tracking, reference/ordinal resolution, and Telugu regional language support`
  - `9b8c821`: `Merge pull request #15 from avinashbatna24-afk/feature/realtime-pfz`
  - `5aa5a95`: `feat(geofence): complete Phase 3 Geofencing engine, 6 zone categories, boundary distance math, Express API endpoints`

---

## 3. Major Directory & File Inventory Table

| PATH | PURPOSE | OWNER/AREA | SHOULD BE PRESERVED | POSSIBLE CONFLICT | NOTES |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `backend/src/server.js` | Express API server entry point | Backend (Member 2) | **YES (CRITICAL)** | Conflict with old backend | Authoritative Express server |
| `backend/src/routes/` | Express REST route declarations | Backend (Member 2) | **YES (CRITICAL)** | Route name overlap | Endpoints for risk, geofence, PFZ, alerts |
| `backend/src/controllers/` | API request controllers | Backend (Member 2) | **YES (CRITICAL)** | Controller signature | Contains business logic for REST APIs |
| `backend/services/` | Ocean data & route solvers | Backend (Member 2/4) | **YES (CRITICAL)** | Service file naming | Integrates ERDDAP SST, weather, IMD |
| `backend/app/main.py` | FastAPI Python spatial API | GIS (Member 3) | **YES** | Port assignment | Microservice for spatial PFZ queries |
| `ai/orchestrator.js` | Central Agentic AI pipeline | AI Lead (Member 1) | **YES (CRITICAL)** | Pipeline imports | Drives Intent -> Plan -> Tool -> Synthesis |
| `ai/contextManager.js` | Multi-turn state & Telugu context | AI Lead (Member 1) | **YES (CRITICAL)** | Memory schema | Phase 7 multi-turn tracking engine |
| `ai/agents/synthesisAgent.js` | Phase 8 Explainability synthesizer | AI Lead (Member 1) | **YES (CRITICAL)** | Output schema | Produces factor breakdown & evidence |
| `ai/agents/intentAgent.js` | 7-intent classifier + Telugu | AI Lead (Member 1) | **YES (CRITICAL)** | Prompt template | Supports English and Telugu intent classification |
| `ai/tools.js` | Tool execution REST wrapper | AI Lead (Member 1) | **YES (CRITICAL)** | Target URLs | Executes tools against backend endpoints |
| `gis/geofence.js` | Phase 3 Geofencing engine (14 KB) | GIS Lead (Member 3) | **YES (CRITICAL)** | Conflict with frontend GIS | Authoritative boundary breach math |
| `risk-engine/riskCalculator.js` | Phase 8 Risk calculator (5.6 KB) | Risk Engine (Member 4) | **YES (CRITICAL)** | Conflict with old calculator | Computes weighted risk & factor breakdown |
| `incois-capabilities.xml` | INCOIS WMS capabilities spec | GIS / Data | **YES** | Root file clutter | Required for INCOIS WMS layer parsing |
| `pfz-capabilities.xml` | PFZ WFS capabilities spec | GIS / Data | **YES** | Root file clutter | Required for PFZ layer specs |
| `test-fishing.json` | Sample fishing telemetry data | Testing / Data | **YES** | Sample data location | Test fixture for route optimization |
| `frontend/` *(Directory)* | Outdated single-file UI placeholder | Frontend | **DO NOT PRESERVE** | **HIGH CONFLICT** | Replace with frontend from `MarineAI` |

---

## 4. Unification Strategy: Backend Components to Preserve

During repository unification, **this repository (`marine-ai-latest`) MUST serve as the authoritative source of truth for all backend, AI, GIS, and Risk Engine code**.

### Must-Preserve Modules:
1. **Agentic AI Core (`ai/`)**: Keep `ai/orchestrator.js`, `ai/contextManager.js` (Phase 7 multi-turn), `ai/agents/synthesisAgent.js` (Phase 8 Explainability), `ai/agents/intentAgent.js`, and `ai/tools.js`.
2. **Express Server & Services (`backend/`)**: Keep `backend/src/server.js`, all controllers in `backend/src/controllers/`, all routes in `backend/src/routes/`, and services in `backend/services/`.
3. **GIS Geofencing Engine (`gis/`)**: Keep the Phase 3 enhanced `gis/geofence.js` (14 KB) and `gis/distance.js`.
4. **Risk Engine (`risk-engine/`)**: Keep the Phase 8 enhanced `risk-engine/riskCalculator.js` (5.6 KB) with per-factor breakdown.
5. **Data Capabilities Specs**: Keep `incois-capabilities.xml` and `pfz-capabilities.xml`.

### Component to Discard/Replace:
* **`frontend/`**: Discard the placeholder `frontend/` directory in this repository and replace it entirely with the React 18 + Vite 6 + Leaflet frontend from the `MarineAI` repository.

---

## 5. Verification Certification

* **Files Modified:** 0 existing files modified.
* **Files Deleted:** 0 files deleted.
* **Packages Installed:** 0 packages installed.
* **Branch State:** `main` remains untouched and 100% intact.

*Audit Report Generated Successfully.*
