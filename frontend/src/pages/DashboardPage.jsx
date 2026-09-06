import React from 'react';
import SpatialIntelligenceMap from '../components/dashboard/SpatialIntelligenceMap';
import MarineAICoPilot from '../components/dashboard/MarineAICoPilot';
import BottomTelemetryGrid from '../components/dashboard/BottomTelemetryGrid';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* TOP ROW: SPATIAL MAP (LEFT) & AI COPILOT ASSISTANT (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SPATIAL MAP (8 COLUMNS) */}
        <div className="lg:col-span-8">
          <SpatialIntelligenceMap />
        </div>

        {/* AI COPILOT ASSISTANT (4 COLUMNS) */}
        <div className="lg:col-span-4">
          <MarineAICoPilot
            onNavigateToRoute={() => navigate('/safe-routes')}
          />
        </div>
      </div>

      {/* BOTTOM ROW: TELEMETRY & ACTIVE ALERTS BLOCK (7 CARDS HORIZONTAL) */}
      <div className="w-full pt-1">
        <BottomTelemetryGrid />
      </div>
    </div>
  );
}
