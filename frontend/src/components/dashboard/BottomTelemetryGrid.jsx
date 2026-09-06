import React from 'react';
import { Wind, Waves, Thermometer, Leaf, Compass, Eye, AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BottomTelemetryGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      {/* 1. WIND CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Wind className="w-4 h-4 text-[#00B4D8]" />
          <span>Wind</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            14 <span className="text-xs font-semibold text-slate-400">kt NE</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-amber-400 mt-1">
            Moderate
          </div>
        </div>
      </div>

      {/* 2. WAVES CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Waves className="w-4 h-4 text-[#00B4D8]" />
          <span>Waves</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            1.2 <span className="text-xs font-semibold text-slate-400">m</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-amber-400 mt-1">
            Moderate
          </div>
        </div>
      </div>

      {/* 3. SST CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Thermometer className="w-4 h-4 text-rose-400" />
          <span>SST</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            28.4 <span className="text-xs font-semibold text-slate-400">°C</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-emerald-400 mt-1">
            Normal
          </div>
        </div>
      </div>

      {/* 4. CHLOROPHYLL CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Chlorophyll</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            2.8 <span className="text-xs font-semibold text-slate-400">mg/m³</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-emerald-400 mt-1">
            High
          </div>
        </div>
      </div>

      {/* 5. CURRENT CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Compass className="w-4 h-4 text-[#00B4D8]" />
          <span>Current</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            0.6 <span className="text-xs font-semibold text-slate-400">m/s NE</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-amber-400 mt-1">
            Moderate
          </div>
        </div>
      </div>

      {/* 6. VISIBILITY CARD */}
      <div className="bg-[#04111D] rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between shadow-md hover:border-slate-700 transition-all">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <Eye className="w-4 h-4 text-amber-400" />
          <span>Visibility</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-mono font-extrabold text-white tracking-tight">
            10 <span className="text-xs font-semibold text-slate-400">km</span>
          </div>
          <div className="text-[11px] font-mono font-bold text-emerald-400 mt-1">
            Good
          </div>
        </div>
      </div>

      {/* 7. ACTIVE ALERTS CARD */}
      <div 
        onClick={() => navigate('/alerts')}
        className="bg-[#0A2239] rounded-xl border border-rose-500/30 p-3.5 flex flex-col justify-between shadow-md hover:border-rose-500/60 transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Active Alerts</span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-2xl font-mono font-extrabold text-rose-500 leading-none">
            2
          </div>
          <div className="text-[11px] font-mono font-semibold text-[#00B4D8] group-hover:underline flex items-center gap-0.5">
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
