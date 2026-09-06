import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Circle, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Wind, 
  Waves, 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Send, 
  ShieldAlert, 
  Navigation,
  Compass,
  RotateCcw,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SafetyRiskPage() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState('Risk Heatmap');
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  // Center Coordinates for Risk Core (Offshore Bay of Bengal near Kakinada)
  const centerCoords = [16.85, 82.60];
  const vesselCoords = [16.9241, 82.2418];

  // Custom DivIcon for Center Core Marker
  const coreMarkerIcon = useMemo(() => L.divIcon({
    className: 'core-marker',
    html: `
      <div style="
        background-color: rgba(220,38,38,0.9);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(220,38,38,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="background-color: white; width: 6px; height: 6px; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  }), []);

  // Custom DivIcon for Vessel Marker
  const vesselMarkerIcon = useMemo(() => L.divIcon({
    className: 'vessel-marker',
    html: `
      <div style="
        background-color: #1363DF;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(19,99,223,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="background-color: white; width: 8px; height: 8px; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  }), []);

  // Risk Contributors Data
  const riskContributors = [
    { label: 'Wind', value: 75, color: 'bg-red-500', icon: Wind },
    { label: 'Waves', value: 60, color: 'bg-amber-500', icon: Waves },
    { label: 'Lightning', value: 90, color: 'bg-red-600', icon: Zap },
    { label: 'Cyclone', value: 30, color: 'bg-amber-400', icon: AlertTriangle },
    { label: 'Current', value: 50, color: 'bg-amber-500', icon: Compass }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
            Risk Analysis
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Marine Risk Assessment
          </p>
        </div>

        {/* HEADER RIGHT: RISK LEGEND TAGS & RISK LAYERS BUTTON */}
        <div className="flex flex-wrap items-center gap-3">
          {/* LEGEND BADGES */}
          <div className="hidden sm:flex items-center gap-3 bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700">Low</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-700">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span className="text-slate-700">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <span className="text-slate-700">Extreme</span>
            </div>
          </div>

          {/* RISK LAYERS BUTTON */}
          <div className="relative">
            <button
              onClick={() => setIsLayersOpen(!isLayersOpen)}
              className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#1363DF]" />
              <span>Risk Layers</span>
            </button>

            {/* DROPDOWN LAYER PICKER */}
            {isLayersOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-[500] p-2 text-xs font-medium space-y-1">
                {['Risk Heatmap', 'Wind Vectors', 'Wave Swell Grid', 'Sea Temperature'].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => {
                      setActiveLayer(layer);
                      setIsLayersOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                      activeLayer === layer
                        ? 'bg-blue-50 text-[#1363DF] font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: SATELLITE MAP & METRICS BAR (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* SATELLITE RISK HEATMAP DISPLAY */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden">
            <div className="h-[440px] md:h-[480px] relative w-full">
              <MapContainer
                center={[16.85, 82.50]}
                zoom={8}
                scrollWheelZoom={false}
                className="w-full h-full z-10"
              >
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics"
                />

                {/* CONCENTRIC RISK HEATMAP CONTOURS (OUTER TO INNER) */}
                {/* 1. LOW RISK (GREEN) */}
                <Circle
                  center={centerCoords}
                  radius={75000}
                  pathOptions={{
                    color: '#10B981',
                    fillColor: '#10B981',
                    fillOpacity: 0.35,
                    weight: 1
                  }}
                />

                {/* 2. MODERATE RISK (YELLOW) */}
                <Circle
                  center={centerCoords}
                  radius={52000}
                  pathOptions={{
                    color: '#EAB308',
                    fillColor: '#EAB308',
                    fillOpacity: 0.45,
                    weight: 1
                  }}
                />

                {/* 3. HIGH RISK (ORANGE) */}
                <Circle
                  center={centerCoords}
                  radius={34000}
                  pathOptions={{
                    color: '#F97316',
                    fillColor: '#F97316',
                    fillOpacity: 0.55,
                    weight: 1
                  }}
                />

                {/* 4. EXTREME RISK CORE (RED) */}
                <Circle
                  center={centerCoords}
                  radius={18000}
                  pathOptions={{
                    color: '#DC2626',
                    fillColor: '#DC2626',
                    fillOpacity: 0.70,
                    weight: 2
                  }}
                />

                {/* STORM CORE MARKER */}
                <Marker position={centerCoords} icon={coreMarkerIcon}>
                  <Popup>
                    <div className="p-1 font-sans text-xs">
                      <div className="font-bold text-red-600">Cyclone Extreme Core</div>
                      <div className="text-slate-600">Max Sustained Wind: 48 kts</div>
                    </div>
                  </Popup>
                </Marker>

                {/* ACTIVE VESSEL POSITION MARKER */}
                <Marker position={vesselCoords} icon={vesselMarkerIcon}>
                  <Popup>
                    <div className="p-1 font-sans text-xs">
                      <div className="font-bold text-[#1363DF]">Current Vessel Position</div>
                      <div className="text-slate-600">Kakinada Explorer-04</div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* FLOATING RISK LEVEL LEGEND CARD ON BOTTOM LEFT OF MAP */}
              <div className="absolute bottom-4 left-4 z-[400] bg-slate-950/85 backdrop-blur-md border border-slate-800 text-white p-3 rounded-xl shadow-xl text-xs space-y-2 select-none min-w-[120px]">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-300">Risk Level</p>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Low</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span>Extreme</span>
                  </div>
                </div>
              </div>

              {/* SCALE INDICATOR AT BOTTOM RIGHT */}
              <div className="absolute bottom-4 right-4 z-[400] bg-slate-950/85 backdrop-blur-md border border-slate-800 text-white px-3 py-1.5 rounded-lg font-mono text-[11px] shadow-md">
                20 km
              </div>
            </div>
          </div>

          {/* BOTTOM 4-CARD METRICS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* OVERALL RISK SCORE */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Overall Risk Score</p>
              <div className="flex items-baseline justify-between pt-1">
                <p className="font-mono text-2xl font-bold text-[#0F172A]">
                  72 <span className="text-xs font-normal text-slate-400">/100</span>
                </p>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-600 border border-red-200">
                  High Risk
                </span>
              </div>
            </div>

            {/* PRIMARY RISK FACTOR */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Primary Risk Factor</p>
              <div className="flex items-center gap-2 pt-1">
                <Wind className="w-4 h-4 text-slate-700 shrink-0" />
                <p className="font-bold text-xs text-[#0F172A]">High Wind Speed</p>
              </div>
            </div>

            {/* RISK TREND */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Risk Trend</p>
              <div className="flex items-center gap-2 pt-1 text-emerald-600 font-bold text-xs">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Increasing (+12%)</span>
              </div>
            </div>

            {/* AREA */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <p className="text-xs text-slate-500 font-medium">Area</p>
              <div className="flex items-center gap-2 pt-1 text-slate-800 font-medium text-xs">
                <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Selected Area</p>
                  <p className="font-mono text-[11px] text-slate-500">1200 km²</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RISK SUMMARY GAUGE & CONTRIBUTORS PANEL (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* CARD 1: RISK SUMMARY GAUGE METER */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-3">
            <h2 className="font-bold text-sm text-[#0F172A]">
              Risk Summary
            </h2>

            {/* HALF CIRCLE GAUGE METER */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div className="relative w-44 h-24 flex items-center justify-center">
                <svg className="w-44 h-44 -rotate-180" viewBox="0 0 100 100">
                  {/* BACKGROUND ARC */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    strokeDasharray="125.6 251.2"
                    strokeLinecap="round"
                  />
                  {/* ACTIVE GRADIENT ARC */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#riskGradient)"
                    strokeWidth="10"
                    strokeDasharray="90.4 251.2"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="40%" stopColor="#EAB308" />
                      <stop offset="70%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#DC2626" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* CENTER SCORE OVERLAY */}
                <div className="absolute top-8 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-3xl font-extrabold text-red-600 leading-none">
                    72
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-medium mt-0.5">
                    /100
                  </span>
                </div>
              </div>

              <p className="font-bold text-sm text-red-600 mt-2">
                High Risk
              </p>
            </div>
          </div>

          {/* CARD 2: RISK CONTRIBUTORS PROGRESS BARS */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-3.5">
            <h2 className="font-bold text-sm text-[#0F172A]">
              Risk Contributors
            </h2>

            <div className="space-y-3 text-xs">
              {riskContributors.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-700 font-semibold">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono text-slate-800">{item.value}%</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 3: RISK INTERPRETATION */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-4 space-y-2">
            <h3 className="font-bold text-xs text-[#0F172A]">
              Risk Interpretation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High wind speed and lightning activity are contributing to elevated risk in this area.
            </p>
          </div>

          {/* CARD 4: RECOMMENDATIONS */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-4 space-y-3">
            <h3 className="font-bold text-xs text-[#0F172A]">
              Recommendations
            </h3>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Avoid navigation in high-risk zones</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Monitor weather updates regularly</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Choose alternative safe routes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ensure safety equipment is ready</span>
              </div>
            </div>
          </div>

          {/* CARD 5: VIEW SAFE ROUTES ACTION BUTTON */}
          <button
            onClick={() => navigate('/safe-routes')}
            className="w-full flex items-center justify-center gap-2 bg-[#1363DF] hover:bg-[#0D4EB3] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 rotate-45" />
            <span>View Safe Routes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
