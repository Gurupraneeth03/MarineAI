# ⚡ Runtime Readiness Report — Marine AI Platform

**Document:** `RUNTIME_READINESS_REPORT.md`  
**Repository:** `c:\Users\Guru\Desktop\SIH 2026\MarineAI`  
**Branch:** `feature/unified-marine-ai`  
**Date:** September 6, 2026  

---

## 1. Subsystem Readiness Matrix

### 1.1 Frontend UI Module (`frontend/`)
* **Package Manager:** `npm`
* **Development Start Command:** `cd frontend && npm run dev`
* **Build Command:** `cd frontend && npm run build`
* **Default Port:** `5173` (`http://localhost:5173`)
* **Dependency Status:** Clean `package.json` declaring React 18, Vite 6, Tailwind CSS, Leaflet, React-Leaflet, Lucide-react, and Recharts.
* **Environment Requirements:** None required for initial UI rendering. (API proxy URL will be added during API wireup stage).

### 1.2 Express Backend REST API (`backend/`)
* **Package Manager:** `npm`
* **Start Command:** `cd backend && npm start`
* **Development / Watch Command:** `cd backend && npm run dev` (uses `nodemon`)
* **Default Port:** `5000` (`http://localhost:5000`)
* **Dependency Status:** `package.json` present (`express` ^5.2.1, `cors` ^2.8.6, `dotenv` ^17.4.2, `nodemon` ^3.1.14).
* **Registered Route Modules:**
  * `GET /api/health` — System health check
  * `GET /api/live-data` — Live ocean metrics
  * `POST /api/marine/risk` — Risk index with Phase 8 factor breakdown
  * `POST /api/marine/geofence/check` — Geofence breach checker
  * `GET /api/pfz` — Active PFZs
  * `GET /api/marine/sst` — INCOIS ERDDAP SST
  * `POST /api/route/calculate` — Safe route optimizer
  * `POST /api/fishing-route` — Fishing trajectory solver
  * `POST /api/marine/analyze` — Agentic AI query solver
  * `GET /api/alerts` — Emergency alerts & weather warnings
* **Environment Requirements:** `PORT=5000`, `FRONTEND_URL=http://localhost:5173`.

### 1.3 FastAPI GIS Microservice (`backend/app/main.py`)
* **Package Manager:** `pip` / Python virtual environment
* **Recommended Run Command:** `cd backend && uvicorn app.main:app --reload --port 8000`
* **Default Port:** `8000` (`http://localhost:8000`)
* **Dependency Manifest Status:** ⚠️ **Absent.** `requirements.txt` is not currently included in the repository. Python dependencies (`fastapi`, `uvicorn`) must be installed manually or added via a virtualenv.
* **Exposed Endpoints:**
  * `GET /` — API metadata
  * `GET /api/health` — Microservice health status
  * `GET /api/pfz` — All PFZ records with category filtering
  * `GET /api/pfz/nearby` — PFZs near specified latitude & longitude coordinates

### 1.4 Agentic AI Orchestrator (`ai/`)
* **Package Manager:** `npm`
* **Test Command:** `cd ai && npm test` (runs `node test.js`)
* **Execution Command:** `cd ai && npm start` (runs `node orchestrator.js`)
* **Dependency Status:** `package.json` present (`@google/generative-ai` ^0.21.0, `dotenv` ^16.4.5).
* **Environment Requirements:** `GEMINI_API_KEY` (or `LLM_API_KEY`), `MODEL_NAME` (optional, defaults to `gemini-2.5-flash`), `BACKEND_URL` (defaults to `http://localhost:5000/api`).

### 1.5 Root Package (`package.json`)
* **Purpose:** Provides root-level node module scope for top-level scripts and shared LLM tools.
* **Dependencies:** `@google/generative-ai` (`^0.24.1`), `dotenv` (`^17.4.2`).
* **Scripts:** None declared at root.

---

## 2. Environment Variables Summary Table

| Variable Name | Subsystems Using It | Requirement Status | Default / Fallback | Purpose / Description |
| :--- | :--- | :--- | :--- | :--- |
| `PORT` | Express Backend | Required | `5000` | Port for Express REST API server |
| `FRONTEND_URL` | Express Backend | Optional | `http://localhost:5173` | Allowed origin for CORS headers |
| `GEMINI_API_KEY` | Agentic AI (`ai/`) | Required for Live LLM | *None (Fallback to mock reasoning)* | API key for Google Gemini Generative AI |
| `LLM_API_KEY` | Agentic AI (`ai/`) | Optional Alias | *None* | Secondary environment alias for Gemini LLM key |
| `MODEL_NAME` | Agentic AI (`ai/`) | Optional | `gemini-2.5-flash` | Target Gemini model identifier |
| `BACKEND_URL` | Agentic AI (`ai/tools.js`) | Optional | `http://localhost:5000/api` | Target base REST URL for AI tool execution wrappers |
| `BACKEND_TIMEOUT_MS`| Agentic AI (`ai/tools.js`) | Optional | `15000` (15s) | HTTP timeout duration for backend tool calls |
| `PFZ_TIMEOUT_MS` | Agentic AI (`ai/tools.js`) | Optional | `60000` (60s) | HTTP timeout duration for PFZ solver tool calls |
| `WEATHER_API_KEY` | Express Services | Optional | *None (Fallback to mock data)* | External weather API key |
| `IMD_CYCLONE_URL` | Express Services | Optional | *None (Fallback to IMD mock feed)* | Custom URL override for cyclone warning feed |
| `DATABASE_URL` | Express Backend | Optional / Future | *None* | Connection string for SQL/NoSQL database |

---

## 3. Known Blockers Before Runtime Testing

1. **Python FastAPI Dependency Manifest (`requirements.txt`):**
   * *Status:* Missing.
   * *Impact:* Running `uvicorn app.main:app --reload` requires `fastapi` and `uvicorn` to be pre-installed in the user's Python environment.
2. **Missing Local `.env` File:**
   * *Status:* `.env.example` is reconciled, but local `.env` must be created by developer before starting LLM features.
   * *Impact:* Without `GEMINI_API_KEY`, the AI orchestrator operates in deterministic fallback mock mode.

---

## 4. Exact Recommended Order for Installing & Testing Services

When proceeding to runtime testing in subsequent phases, execute commands in this exact sequence:

### Phase 1: Dependency Installation
1. **Root Installation:**
   ```bash
   npm install
   ```
2. **Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```
3. **Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```
4. **AI Engine Dependencies:**
   ```bash
   cd ai
   npm install
   ```
5. **Python Microservice Dependencies:**
   ```bash
   pip install fastapi uvicorn
   ```

### Phase 2: Environment Configuration
1. Create `.env` from `.env.example` at root:
   ```bash
   cp .env.example .env
   ```
2. Add valid `GEMINI_API_KEY` if testing live AI inference.

### Phase 3: Service Startup Verification
1. **Start Express Backend (Terminal 1):**
   ```bash
   cd backend
   npm start
   ```
   *Verify:* `http://localhost:5000/api/health` returns status `ok`.

2. **Start FastAPI Microservice (Terminal 2):**
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```
   *Verify:* `http://localhost:8000/api/health` returns status `ok`.

3. **Run Agentic AI Suite (Terminal 3):**
   ```bash
   cd ai
   npm test
   ```
   *Verify:* 8/8 automated tests pass.

4. **Start Frontend UI (Terminal 4):**
   ```bash
   cd frontend
   npm run dev
   ```
   *Verify:* UI loads in browser at `http://localhost:5173`.
