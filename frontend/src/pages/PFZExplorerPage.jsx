import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Star, 
  Send, 
  Thermometer, 
  Leaf, 
  Wind, 
  Waves, 
  Eye, 
  RefreshCw, 
  Clock, 
  Sun, 
  TrendingUp, 
  Calendar, 
  Fish, 
  Anchor, 
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Compass,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PFZExplorerPage() {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Waypoints
  const startCoords = [16.9241, 80.1985]; // Kakinada
  const pfzCoords = [17.1562, 83.3285];   // PFZ-03

  // Custom DivIcon for Start Point
  const startMarkerIcon = useMemo(() => L.divIcon({
    className: 'pfz-start-marker',
    html: `
      <div style="
        background-color: #1363DF;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(19,99,223,0.9);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  }), []);

  // Custom DivIcon for PFZ-03 Target Marker
  const pfzTargetMarkerIcon = useMemo(() => L.divIcon({
    className: 'pfz-target-marker',
    html: `
      <div style="
        background-color: #10B981;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 18px rgba(16,185,129,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="background-color: white; width: 8px; height: 8px; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  }), []);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
              PFZ-03
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              High Confidence
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            High Potential Fishing Zone
          </p>
        </div>

        {/* ACTION BUTTONS (ADD TO FAVORITES & NAVIGATE) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
              isFavorite
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-white border-[#E2E8F0] hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span>{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
          </button>

          <button
            onClick={() => navigate('/safe-routes')}
            className="flex items-center gap-2 bg-[#1363DF] hover:bg-[#0D4EB3] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 rotate-45" />
            <span>Navigate</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: MAP, ABOUT & SPECIES METRICS (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* SATELLITE MAP DISPLAY */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden">
            <div className="h-[440px] md:h-[480px] relative w-full">
              <MapContainer
                center={[17.02, 82.30]}
                zoom={8}
                scrollWheelZoom={false}
                className="w-full h-full z-10"
              >
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics"
                />

                {/* DISTANCE LINE FROM DEPARTURE TO PFZ-03 */}
                <Polyline
                  positions={[startCoords, pfzCoords]}
                  pathOptions={{
                    color: '#3B82F6',
                    weight: 3,
                    dashArray: '6,6'
                  }}
                />

                {/* START MARKER */}
                <Marker position={startCoords} icon={startMarkerIcon}>
                  <Popup>
                    <div className="p-1 font-sans text-xs">
                      <div className="font-bold text-[#1363DF]">Current Vessel Position</div>
                      <div className="text-slate-600">Kakinada Anchorage</div>
                    </div>
                  </Popup>
                </Marker>

                {/* PFZ-03 TARGET MARKER */}
                <Marker position={pfzCoords} icon={pfzTargetMarkerIcon}>
                  <Popup>
                    <div className="p-1 font-sans text-xs">
                      <div className="font-bold text-emerald-600">PFZ-03 Target Zone</div>
                      <div className="text-slate-600">92% Chlorophyll Confidence</div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* DISTANCE BADGE OVERLAY ON MAP LINE */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[400] bg-slate-950/85 backdrop-blur-md border border-slate-700 text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                18.4 km
              </div>

              {/* TARGET PFZ-03 BADGE OVERLAY ON MAP */}
              <div className="absolute top-28 right-36 z-[400] bg-[#0A2239]/90 border border-emerald-500/60 text-white p-2 rounded-xl text-center shadow-lg">
                <p className="font-bold text-xs text-white">PFZ-03</p>
                <p className="font-mono text-xs font-extrabold text-emerald-400">92%</p>
              </div>

              {/* SCALE INDICATOR AT BOTTOM RIGHT */}
              <div className="absolute bottom-4 right-4 z-[400] bg-slate-950/85 backdrop-blur-md border border-slate-800 text-white px-3 py-1.5 rounded-lg font-mono text-[11px] shadow-md">
                20 km
              </div>
            </div>
          </div>

          {/* ABOUT PFZ-03 & BEST TIME TO FISH (2 CARDS ROW) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* ABOUT PFZ-03 */}
            <div className="md:col-span-8 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs space-y-2">
              <h3 className="font-bold text-xs text-[#0F172A]">
                About PFZ-03
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                This PFZ has high productivity potential based on oceanographic and biological parameters. It is a highly recommended zone for fishing operations.
              </p>
            </div>

            {/* BEST TIME TO FISH */}
            <div className="md:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Best Time to Fish</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Sun className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-mono font-bold text-sm text-[#0F172A]">04:00 AM – 09:00 AM</p>
                  <p className="text-[10px] text-slate-400 font-medium">Today</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM 4 METRIC CARDS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* HISTORICAL CATCH */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Historical Catch</span>
              </div>
              <p className="font-bold text-sm text-emerald-600 pt-1">High</p>
              <p className="text-[10px] text-slate-400 font-mono">(Last 30 days)</p>
            </div>

            {/* SEASONALITY */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Seasonality</span>
              </div>
              <p className="font-bold text-sm text-[#0F172A] pt-1">Jun - Sep</p>
              <p className="text-[10px] text-[#1363DF] font-semibold">Peak Season</p>
            </div>

            {/* MAIN SPECIES */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Fish className="w-4 h-4 text-blue-500" />
                <span>Main Species</span>
              </div>
              <p className="font-bold text-xs text-[#0F172A] pt-1 leading-snug">
                Tuna, Mackerel, Sardine
              </p>
            </div>

            {/* RECOMMENDED GEAR */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Anchor className="w-4 h-4 text-indigo-600" />
                <span>Recommended Gear</span>
              </div>
              <p className="font-bold text-xs text-[#0F172A] pt-1 leading-snug">
                Drift Net, Gill Net, Longline
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CURRENT CONDITIONS & PFZ INFORMATION (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* CARD 1: CURRENT CONDITIONS (2x3 GRID) */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-3">
            <h2 className="font-bold text-sm text-[#0F172A]">
              Current Conditions
            </h2>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* SST */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>SST</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">28.4 °C</p>
                <span className="text-[10px] font-semibold text-emerald-600 block">Normal</span>
              </div>

              {/* CHLOROPHYLL */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Chlorophyll</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">2.8 mg/m³</p>
                <span className="text-[10px] font-semibold text-emerald-600 block">High</span>
              </div>

              {/* WIND SPEED */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Wind className="w-4 h-4 text-sky-500" />
                  <span>Wind Speed</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">14 kt NE</p>
                <span className="text-[10px] font-semibold text-amber-600 block">Moderate</span>
              </div>

              {/* WAVE HEIGHT */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Waves className="w-4 h-4 text-sky-600" />
                  <span>Wave Height</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">1.2 m</p>
                <span className="text-[10px] font-semibold text-amber-600 block">Moderate</span>
              </div>

              {/* CURRENTS */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <RefreshCw className="w-4 h-4 text-indigo-500" />
                  <span>Currents</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">0.6 m/s NE</p>
                <span className="text-[10px] font-semibold text-amber-600 block">Moderate</span>
              </div>

              {/* VISIBILITY */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Eye className="w-4 h-4 text-emerald-500" />
                  <span>Visibility</span>
                </div>
                <p className="font-mono font-bold text-sm text-[#0F172A]">10 km</p>
                <span className="text-[10px] font-semibold text-emerald-600 block">Good</span>
              </div>
            </div>
          </div>

          {/* CARD 2: PFZ INFORMATION */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-3">
            <h3 className="font-bold text-xs text-[#0F172A]">
              PFZ Information
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Confidence Score</span>
                <span className="font-bold text-emerald-600">92%</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Distance from you</span>
                <span className="font-bold text-slate-800">18.4 km NE</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Latitude</span>
                <span className="font-bold text-slate-800">17.1562° N</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Longitude</span>
                <span className="font-bold text-slate-800">83.3285° E</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Depth</span>
                <span className="font-bold text-slate-800">65 m</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Size</span>
                <span className="font-bold text-slate-800">4.2 km²</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Valid Until</span>
                <span className="font-bold text-slate-800">10 Sep 2026, 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Last Updated</span>
                <span className="font-bold text-slate-800">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* CARD 3: DATA SOURCES */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-3">
            <h3 className="font-bold text-xs text-[#0F172A]">
              Data Sources
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">PFZ Data</span>
                <span className="font-medium text-slate-700">2h ago</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Ocean Data</span>
                <span className="font-medium text-slate-700">1h ago</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Weather Data</span>
                <span className="font-medium text-slate-700">15m ago</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 pt-1.5">
                <span className="text-slate-500">Marine Advisory</span>
                <span className="font-medium text-slate-700">5m ago</span>
              </div>
            </div>
          </div>

          {/* CARD 4: VALIDATED SOURCES BANNER */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium text-[11px]">
              All data is validated and updated from trusted sources.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
