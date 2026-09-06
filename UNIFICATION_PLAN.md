# 🛡️ Repository Unification Master Plan — Marine AI Platform

**Target Repository:** `c:\Users\Guru\Desktop\SIH 2026\MarineAI` (Authoritative Frontend)  
**Source Teammate Repository:** `c:\Users\Guru\Desktop\SIH 2026\marine-ai-latest` (Authoritative Backend/AI/GIS)  
**Plan Date:** September 6, 2026  
**Document Name:** `UNIFICATION_PLAN.md`

---

> [!IMPORTANT]
> **MANDATORY UNIFICATION DIRECTIVES:**
> * **NO BLIND GIT MERGE:** A standard git merge would risk overwriting the authoritative frontend with an outdated placeholder.
> * **PRESERVE FRONTEND:** The React 18 + Vite 6 + Tailwind + Leaflet frontend in `MarineAI` (10 full pages & custom components) MUST be preserved 100% intact.
> * **PRESERVE FRONTEND GIS:** `frontend/src/gis/` MUST be preserved for client-side Leaflet layer generation.
> * **DO NOT MODIFY TEAMMATE REPO:** `marine-ai-latest` is read-only during audit and planning.

---

## 1. Final Proposed Unified Directory Structure

```
MarineAI/ (Unified Master Repository)
├── .env.example                     # Unified environment key definitions
├── .gitignore                       # Standardized git ignore rules
├── FRONTEND_REPOSITORY_AUDIT.md     # Frontend audit report
├── BACKEND_REPOSITORY_AUDIT.md      # Backend audit report
├── UNIFICATION_PLAN.md              # This execution blueprint
├── HANDOFF_MEMBER4_MEMBER5.md       # Integration contract specs
├── HANDOFF_MEMBER6.md               # Lead integration summary
├── MEMBER_1_EXECUTION_SUMMARY.txt   # AI execution report
├── README.md                        # Unified platform overview & quickstart
├── incois-capabilities.xml          # INCOIS WMS/WFS capabilities schema (from marine-ai-latest)
├── pfz-capabilities.xml             # INCOIS PFZ service capabilities schema (from marine-ai-latest)
├── test-fishing.json                # Fishing vessel test telemetry (from marine-ai-latest)
├── package.json                     # Root dependencies (@google/generative-ai) (from marine-ai-latest)
├── package-lock.json                # Root lockfile (from marine-ai-latest)
│
├── frontend/                        # Authoritative React 18 Frontend (FROM MarineAI)
│   ├── index.html
│   ├── package.json                 # Frontend dependencies (React 18, Vite 6, Tailwind, Leaflet, Recharts)
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js               # Dev server configuration (Port 5173)
│   ├── public/
│   │   └── logo.png
│   └── src/
│       ├── App.jsx                  # Main router (10 page routes)
│       ├── main.jsx                 # Entry point
│       ├── index.css                # Global CSS & Tailwind directives
│       ├── assets/
│       ├── components/              # 10 modularized component categories
│       ├── pages/                   # 10 complete page view components
│       └── gis/                     # Client-side GIS layer engine (PRESERVED)
│           ├── distance.js
│           ├── geofence.js
│           ├── spatialQueries.js
│           └── layers/
│
├── backend/                         # Authoritative Express & FastAPI Backend (FROM marine-ai-latest)
│   ├── package.json                 # Express server dependencies (express 5.2, cors, dotenv)
│   ├── package-lock.json
│   ├── app/                         # FastAPI Python GIS Microservice (Port 8000)
│   │   ├── main.py
│   │   └── mock_data.py
│   ├── routes/                      # Route handlers (fishing, marine, route, SST)
│   ├── services/                    # Ocean & route solvers (SST, weather, IMD, PFZ, route optimizer)
│   └── src/                         # Core Express API codebase (Port 5000)
│       ├── server.js                # Express entry point
│       ├── alertEngine.js           # Dynamic alert generator
│       ├── hazardDetector.js        # Hazard breach detector
│       ├── controllers/             # REST API controllers
│       └── routes/                  # REST endpoints (/api/marine, /api/pfz, /api/alerts)
│
├── ai/                              # Authoritative Agentic AI Engine (FROM marine-ai-latest)
│   ├── agents/
│   │   ├── intentAgent.js           # 7-intent classifier + Telugu language support
│   │   ├── plannerAgent.js          # Dynamic task sequence planner
│   │   └── synthesisAgent.js        # Phase 8 Explainability evidence synthesizer
│   ├── contextManager.js            # Phase 7 Multi-turn state & location memory
│   ├── orchestrator.js              # Central pipeline executor
│   ├── prompts.js                   # System prompts
│   ├── tools.js                     # REST API tool execution wrappers
│   ├── test.js                      # Automated AI test suite
│   ├── test_multiturn_phase7.js     # Phase 7 multi-turn test suite
│   └── package.json
│
├── gis/                             # Authoritative Root GIS Engine (FROM marine-ai-latest)
│   ├── distance.js                  # Haversine distance math
│   ├── geofence.js                  # Phase 3 Geofencing boundary engine (14 KB)
│   ├── spatialQueries.js            # Spatial query utilities
│   ├── test_geofence_phase3.js      # Geofence verification tests
│   └── layers/
│
├── risk-engine/                     # Authoritative Risk Engine (FROM marine-ai-latest)
│   ├── riskCalculator.js            # Phase 8 Risk calculator with per-factor breakdown (5.6 KB)
│   ├── riskGrid.js                  # Spatial risk grid solver
│   ├── routeCost.js                 # Route risk cost evaluator
│   └── thresholds.js                # Safety thresholds & craft limits
│
├── data/                            # Processed & Sample Datasets
│   └── sample-marine-data.json
│
└── docs/                            # Platform Architecture & API Contracts
    ├── api-contract.md
    ├── architecture.md
    ├── data-sources.md
    └── route-optimization.md
```

---

## 2. File & Directory Provenance Matrix

### 2.1 Files Taken from Current Repository (`MarineAI`)

| Path | Description | Reason for Selection |
| :--- | :--- | :--- |
| `frontend/` | Complete React 18 + Vite 6 + Tailwind CSS + Leaflet UI | Contains all 10 pages, HUD components, and map visualization developed by user |
| `frontend/src/gis/` | Client-side GIS helper functions and GeoJSON layer builders | Required by `MarineMap.jsx` and client UI for live browser map rendering |
| `frontend/package.json` | Frontend package dependencies | Includes React 18, Leaflet, Recharts, Lucide-react, Tailwind |
| `FRONTEND_REPOSITORY_AUDIT.md` | Audit report for frontend repository | Retained for audit history and documentation |

### 2.2 Files Taken from Teammate Repository (`marine-ai-latest`)

| Path | Description | Reason for Selection |
| :--- | :--- | :--- |
| `backend/` | Complete Node.js Express REST API & Python FastAPI service | Authoritative backend with live ERDDAP, weather, cyclone, and PFZ services |
| `ai/` | Agentic AI Engine (Phases 1-8) | Includes Phase 7 Multi-Turn Context (Telugu) and Phase 8 Explainability |
| `gis/` | Root-level GIS & Geofencing Engine | Contains Phase 3 enhanced boundary math (`geofence.js` - 14 KB) |
| `risk-engine/` | Marine Safety Risk Calculation Engine | Contains Phase 8 per-factor breakdown (`riskCalculator.js` - 5.6 KB) |
| `incois-capabilities.xml` | INCOIS WMS capabilities schema | Required by `marineDataService.js` for XML capability parsing |
| `pfz-capabilities.xml` | INCOIS PFZ service capabilities spec | Required for PFZ layer specs |
| `test-fishing.json` | Fishing vessel telemetry test data | Test fixture for route optimization |
| `package.json` (Root) | Root-level package manifest | Declares `@google/generative-ai` (`^0.24.1`) dependency |
| `package-lock.json` (Root) | Root package lockfile | Ensures deterministic dependency tree for root scripts |
| `BACKEND_REPOSITORY_AUDIT.md` | Audit report for backend repository | Retained for audit history and documentation |

---

## 3. Files Requiring Manual Reconciliation

1. **`README.md`**:
   - **Current `MarineAI` README**: Contains team signature `# MarineAI`.
   - **`marine-ai-latest` README**: Clean structure without duplicate title comment.
   - **Reconciliation Action**: Merge into a single clean `README.md` featuring project description, directory overview, and setup instructions for both frontend (`cd frontend && npm run dev`) and backend (`cd backend && npm start`).

2. **`.env.example`**:
   - **Reconciliation Action**: Consolidate all required environment variables into a single root `.env.example`:
     ```env
     # Server Port Configuration
     PORT=5000
     FRONTEND_URL=http://localhost:5173
     
     # AI & External API Credentials
     LLM_API_KEY="your_gemini_api_key_here"
     WEATHER_API_KEY="your_weather_api_key_here"
     
     # Database (Optional/Future)
     DATABASE_URL="#"
     ```

---

## 4. Files That Should NOT Be Copied

> [!CAUTION]
> **DO NOT COPY THE FOLLOWING FILES UNDER ANY CIRCUMSTANCES:**

1. **`marine-ai-latest/frontend/`**: The frontend directory in `marine-ai-latest` is an outdated single-file placeholder (`src/App.jsx`). Copying it would destroy the user's complete 10-page frontend application.
2. **`marine-ai-latest/.git/`**: The git revision history of `marine-ai-latest` must not overwrite the `MarineAI` git repository.
3. **`node_modules/` or `dist/`**: Binary builds and installed node modules must never be copied between repositories.

---

## 5. Duplicate Files & Spatial Disambiguation

| Duplicate Item | Location A | Location B | Resolution |
| :--- | :--- | :--- | :--- |
| **GIS Module** | `frontend/src/gis/` | Root `gis/` | **PRESERVE BOTH WITH DISTINCT ROLES:**<br>• `frontend/src/gis/`: Client-side GeoJSON builders used by Leaflet components.<br>• Root `gis/`: Server-side Phase 3 geofencing engine used by backend APIs and AI tools. |
| **Execution Summary** | Root `MEMBER_1_EXECUTION_SUMMARY.txt` | `ai/MEMBER_1_EXECUTION_SUMMARY.txt` | Retain both for historical reference. |
| **Handoff Docs** | Root `HANDOFF_MEMBER4_MEMBER5.md` | `marine-ai-latest/HANDOFF_MEMBER4_MEMBER5.md` | Identical documents; keep single root copy. |

---

## 6. Configuration & Port Conflict Analysis

| Service Component | Configuration File | Default Port | Proxy / CORS Strategy |
| :--- | :--- | :--- | :--- |
| **Frontend UI (Vite)** | `frontend/vite.config.js` | `5173` | Add API proxy to `http://localhost:5000` in `vite.config.js` |
| **Express Backend** | `backend/src/server.js` | `5000` | `cors()` enabled for `http://localhost:5173` |
| **FastAPI GIS Microservice** | `backend/app/main.py` | `8000` | `CORSMiddleware` enabled for all origins |

---

## 7. Package.json & Dependency Conflict Analysis

There are 3 distinct `package.json` manifests in the unified repository:

1. **Root `package.json`**:
   - Manages top-level AI dependencies (`@google/generative-ai`, `dotenv`).
2. **`frontend/package.json`**:
   - Manages frontend UI libraries (`react`, `react-dom`, `leaflet`, `react-leaflet`, `recharts`, `lucide-react`, `tailwindcss`, `vite`).
3. **`backend/package.json`**:
   - Manages backend server libraries (`express`, `cors`, `dotenv`, `nodemon`).

*This sub-package separation is clean and prevents version conflicts between React and Express dependencies.*

---

## 8. .env.example Conflict Analysis

* `MarineAI/.env.example` and `marine-ai-latest/.env.example` contain matching key signatures (`PORT`, `DATABASE_URL`, `LLM_API_KEY`, `WEATHER_API_KEY`, `FRONTEND_URL`).
* Unified `.env.example` will document default ports and descriptive placeholder comments.

---

## 9. README & Documentation Conflict Analysis

* `README.md` files differ only in minor artifact comment lines.
* Unified `README.md` will clearly demarcate how to run frontend (`cd frontend && npm run dev`) and backend (`cd backend && npm start`).

---

## 10. .gitignore Conflict Analysis

* Both `.gitignore` files are 100% identical (12 lines covering `node_modules/`, `.env`, `dist/`, `build/`, `.vscode/`, `*.log`, `__pycache__/`, `*.pyc`, `.DS_Store`, `Thumbs.db`).
* Unified `.gitignore` will be preserved without conflict.

---

## 11. Potentially Dangerous Overwrites & Risk Prevention

> [!WARNING]
> **CRITICAL OVERWRITE RISKS TO AVOID:**
>
> 1. **Accidental Overwrite of `MarineAI/frontend/`:**
>    - **Risk:** Copying `marine-ai-latest/frontend/` into `MarineAI/` will wipe out all 10 frontend pages, layout components, and custom CSS.
>    - **Mitigation:** Explicitly exclude `frontend/` when copying from `marine-ai-latest`.
>
> 2. **Accidental Deletion of `frontend/src/gis/`:**
>    - **Risk:** Assuming root `gis/` replaces `frontend/src/gis/` will break `MarineMap.jsx` rendering imports.
>    - **Mitigation:** Keep `frontend/src/gis/` untouched.
>
> 3. **Blind Git Merge / Checkout:**
>    - **Risk:** Running `git merge` between branches will trigger dozens of file conflict markers and potentially pick older backend/AI files.
>    - **Mitigation:** Execute manual targeted folder copying rather than git merge.

---

## 12. Recommended Step-by-Step Order of Operations for Unification

When ready to execute unification, follow this strict 8-step sequence:

### Step 1: Pre-Unification Safety Checkpoint
Create a clean git commit or backup branch in `MarineAI`:
```bash
git checkout -b feature/unified-marine-ai
```

### Step 2: Copy Authoritative Backend Modules from `marine-ai-latest`
Copy the following directories from `marine-ai-latest` into `MarineAI` (overwriting older backend code in `MarineAI`):
- Copy `marine-ai-latest/backend/` -> `MarineAI/backend/`
- Copy `marine-ai-latest/ai/` -> `MarineAI/ai/`
- Copy `marine-ai-latest/risk-engine/` -> `MarineAI/risk-engine/`
- Copy `marine-ai-latest/gis/` -> `MarineAI/gis/` (Root level GIS engine)

### Step 3: Copy XML Capabilities & Telemetry Data
Copy root data files from `marine-ai-latest` into `MarineAI`:
- Copy `marine-ai-latest/incois-capabilities.xml` -> `MarineAI/incois-capabilities.xml`
- Copy `marine-ai-latest/pfz-capabilities.xml` -> `MarineAI/pfz-capabilities.xml`
- Copy `marine-ai-latest/test-fishing.json` -> `MarineAI/test-fishing.json`

### Step 4: Copy Root Package Manifests
Copy root dependency files from `marine-ai-latest` into `MarineAI`:
- Copy `marine-ai-latest/package.json` -> `MarineAI/package.json`
- Copy `marine-ai-latest/package-lock.json` -> `MarineAI/package-lock.json`

### Step 5: Copy Backend Audit Report
Copy `marine-ai-latest/BACKEND_REPOSITORY_AUDIT.md` -> `MarineAI/BACKEND_REPOSITORY_AUDIT.md` for complete audit documentation.

### Step 6: Verify Frontend Integrity
Confirm that `MarineAI/frontend/` (and specifically `MarineAI/frontend/src/gis/`) remains completely untouched and intact.

### Step 7: Reconcile `.env.example` & `README.md`
Apply the unified `.env.example` and consolidated `README.md`.

### Step 8: Execution Verification
1. Run `cd frontend && npm install` (if needed) & `npm run dev` to verify UI opens cleanly.
2. Run `cd backend && npm start` to verify Express API starts on port 5000.
3. Run `cd ai && node test.js` to verify AI orchestrator tests pass.

---

*Unification Plan Completed. Standing by for approval before proceeding to execution.*
