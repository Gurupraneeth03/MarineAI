import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wind, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Eye, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Bell, 
  User, 
  Sun, 
  Moon, 
  Compass, 
  Cloud,
  Sunset,
  Sunrise,
  Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WeatherPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('weather');

  const hourlyData = [
    { time: 'NOW', temp: '28°', wind: '14 kt NE', condition: 'sun-cloud' },
    { time: '11 AM', temp: '29°', wind: '15 kt NE', condition: 'sun-cloud' },
    { time: '12 PM', temp: '30°', wind: '16 kt NE', condition: 'sun-cloud' },
    { time: '1 PM', temp: '30°', wind: '16 kt NE', condition: 'sun-cloud' },
    { time: '2 PM', temp: '29°', wind: '15 kt NE', condition: 'cloud' },
    { time: '3 PM', temp: '28°', wind: '14 kt NE', condition: 'rain' },
    { time: '4 PM', temp: '28°', wind: '13 kt NE', condition: 'rain' },
    { time: '5 PM', temp: '27°', wind: '12 kt NE', condition: 'cloud' },
    { time: '6 PM', temp: '27°', wind: '11 kt NE', condition: 'cloud' },
    { time: '7 PM', temp: '26°', wind: '11 kt NE', condition: 'night' },
  ];

  const weeklyData = [
    { day: 'Tue, 20 May', temp: '26° / 30°', wind: '14 kt NE', precip: '10 %', icon: 'sun-cloud' },
    { day: 'Wed, 21 May', temp: '26° / 31°', wind: '16 kt NE', precip: '10 %', icon: 'sun' },
    { day: 'Thu, 22 May', temp: '25° / 29°', wind: '18 kt NE', precip: '40 %', icon: 'rain' },
    { day: 'Fri, 23 May', temp: '25° / 28°', wind: '17 kt NE', precip: '60 %', icon: 'rain' },
    { day: 'Sat, 24 May', temp: '25° / 28°', wind: '16 kt NE', precip: '50 %', icon: 'rain' },
    { day: 'Sun, 25 May', temp: '26° / 30°', wind: '14 kt NE', precip: '20 %', icon: 'sun-cloud' },
    { day: 'Mon, 26 May', temp: '26° / 31°', wind: '13 kt NE', precip: '10 %', icon: 'sun' },
  ];

  const renderWeatherIcon = (type) => {
    switch (type) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-sky-500" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 text-slate-400" />;
      case 'night':
        return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'sun-cloud':
      default:
        return (
          <div className="relative w-6 h-6">
            <Sun className="w-4 h-4 text-amber-500 absolute top-0 left-0" />
            <Cloud className="w-5 h-5 text-slate-400 absolute bottom-0 right-0" />
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 text-[#0F172A] pb-8">
      {/* PAGE TITLE & FILTERS ROW */}
      <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
              Weather & Ocean Forecast
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#1363DF]" />
              <span className="font-mono font-medium text-slate-700">16.9241° N, 80.1985° E</span>
              <span>•</span>
              <span>Bay of Bengal, India</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* WEATHER / OCEAN TAB TOGGLE */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center text-xs font-semibold">
              <button
                onClick={() => setActiveTab('weather')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'weather'
                    ? 'bg-[#1363DF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Weather
              </button>
              <button
                onClick={() => setActiveTab('ocean')}
                className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'ocean'
                    ? 'bg-[#1363DF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ocean
              </button>
            </div>

            {/* DATE PICKER */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 shadow-xs cursor-pointer hover:border-slate-300">
              <span>Today, 20 May 2025</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* 6 TOP TELEMETRY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* WIND SPEED */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Wind className="w-4 h-4 text-[#1363DF]" />
              <span>Wind Speed</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                14 <span className="text-xs font-normal text-slate-500">kt</span>
              </div>
              <div className="text-xs font-mono text-slate-500">NE</div>
              <div className="text-xs font-bold text-amber-500 mt-1">Moderate</div>
            </div>
          </div>

          {/* WIND GUSTS */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Wind className="w-4 h-4 text-[#1363DF]" />
              <span>Wind Gusts</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                20 <span className="text-xs font-normal text-slate-500">kt</span>
              </div>
              <div className="text-xs font-mono text-slate-500">NE</div>
              <div className="text-xs font-bold text-amber-500 mt-1">Moderate</div>
            </div>
          </div>

          {/* TEMPERATURE */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>Temperature</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                28.4 <span className="text-xs font-normal text-slate-500">°C</span>
              </div>
              <div className="text-xs font-bold text-emerald-500 mt-3">Normal</div>
            </div>
          </div>

          {/* HUMIDITY */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Droplets className="w-4 h-4 text-[#1363DF]" />
              <span>Humidity</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                74 <span className="text-xs font-normal text-slate-500">%</span>
              </div>
              <div className="text-xs font-bold text-amber-500 mt-3">High</div>
            </div>
          </div>

          {/* PRECIPITATION */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <CloudRain className="w-4 h-4 text-sky-500" />
              <span>Precipitation</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                10 <span className="text-xs font-normal text-slate-500">%</span>
              </div>
              <div className="text-xs font-bold text-emerald-500 mt-3">Low</div>
            </div>
          </div>

          {/* VISIBILITY */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Eye className="w-4 h-4 text-emerald-500" />
              <span>Visibility</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                10 <span className="text-xs font-normal text-slate-500">km</span>
              </div>
              <div className="text-xs font-bold text-emerald-500 mt-3">Good</div>
            </div>
          </div>
        </div>
      </div>

      {/* HOURLY FORECAST SLIDER */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono">
          Hourly Forecast
        </h2>

        <div className="relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {hourlyData.map((hour, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-[90px] bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-center space-y-2 flex flex-col items-center justify-between"
              >
                <span className="text-xs font-mono font-bold text-slate-600">{hour.time}</span>
                {renderWeatherIcon(hour.condition)}
                <span className="text-base font-extrabold font-mono text-[#0F172A]">{hour.temp}</span>
                <span className="text-[11px] font-mono text-slate-500">{hour.wind}</span>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BOTTOM 2-COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: DETAILED CONDITIONS */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono">
            Detailed Conditions
          </h2>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Gauge className="w-4 h-4 text-slate-400" />
                <span>Air Pressure</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">1012 hPa</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sunrise className="w-4 h-4 text-amber-500" />
                <span>Sunrise</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">05:28 AM</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Cloud className="w-4 h-4 text-slate-400" />
                <span>Cloud Cover</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">40 %</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sunset className="w-4 h-4 text-amber-600" />
                <span>Sunset</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">06:12 PM</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Droplets className="w-4 h-4 text-sky-500" />
                <span>Dew Point</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">23 °C</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Moon Phase</span>
              </div>
              <span className="text-xs font-bold text-[#0F172A]">Waning Gibbous</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>UV Index</span>
              </div>
              <span className="text-xs font-bold font-mono text-[#0F172A]">6 (High)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Compass className="w-4 h-4 text-[#1363DF]" />
                <span>Tide</span>
              </div>
              <span className="text-xs font-bold text-emerald-600">Rising</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 7-DAY FORECAST */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider font-mono">
            7-Day Forecast
          </h2>

          <div className="divide-y divide-slate-100 pt-1">
            {weeklyData.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="w-32 font-semibold text-slate-700">{item.day}</div>
                <div className="w-10 flex justify-center">
                  {renderWeatherIcon(item.icon)}
                </div>
                <div className="w-24 font-mono font-bold text-[#0F172A] text-right">{item.temp}</div>
                <div className="w-28 font-mono text-slate-500 text-right flex items-center justify-end gap-1">
                  <Wind className="w-3 h-3 text-slate-400" />
                  <span>{item.wind}</span>
                </div>
                <div className="w-16 font-mono text-sky-600 text-right font-medium">{item.precip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
