import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Hexagon, 
  CheckCircle2, 
  PauseCircle, 
  AlertTriangle,
  Bell,
  Anchor,
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const INITIAL_GEOFENCES = [
  {
    id: 'geo-1',
    name: 'Restricted Area',
    description: 'High risk restricted zone',
    type: 'Restricted',
    status: 'Active',
    createdOn: 'May 19, 2025 09:30 AM',
    area: '120.5 km²',
    alerts: 1,
    coordinates: [
      [16.95, 82.38],
      [17.08, 82.55],
      [16.90, 82.65],
      [16.82, 82.48]
    ]
  },
  {
    id: 'geo-2',
    name: 'Safe Zone',
    description: 'Safe navigation area',
    type: 'Safe',
    status: 'Active',
    createdOn: 'May 18, 2025 03:15 PM',
    area: '98.3 km²',
    alerts: 0,
    coordinates: [
      [16.92, 82.68],
      [17.02, 82.82],
      [16.85, 82.90],
      [16.80, 82.72]
    ]
  },
  {
    id: 'geo-3',
    name: 'Port Area',
    description: 'Port operations zone',
    type: 'Port',
    status: 'Active',
    createdOn: 'May 17, 2025 11:20 AM',
    area: '75.6 km²',
    alerts: 0,
    coordinates: [
      [16.78, 82.35],
      [16.85, 82.45],
      [16.70, 82.50],
      [16.65, 82.38]
    ]
  },
  {
    id: 'geo-4',
    name: 'Fishing Zone',
    description: 'Designated fishing area',
    type: 'Fishing',
    status: 'Inactive',
    createdOn: 'May 16, 2025 08:45 AM',
    area: '60.2 km²',
    alerts: 0,
    isCircle: true,
    center: [16.92, 82.25],
    radius: 12000
  },
  {
    id: 'geo-5',
    name: 'Kakinada Anchorage Zone',
    description: 'Commercial vessel mooring perimeter',
    type: 'Port',
    status: 'Active',
    createdOn: 'May 14, 2025 02:10 PM',
    area: '42.1 km²',
    alerts: 0,
    coordinates: [[16.98, 82.28], [17.04, 82.35], [16.95, 82.40]]
  },
  {
    id: 'geo-6',
    name: 'Vizag Shipping Corridor',
    description: 'Deep sea merchant transit lane',
    type: 'Safe',
    status: 'Active',
    createdOn: 'May 12, 2025 10:00 AM',
    area: '154.0 km²',
    alerts: 0,
    coordinates: [[17.65, 83.25], [17.75, 83.45], [17.55, 83.50]]
  },
  {
    id: 'geo-7',
    name: 'Cyclone Warning Buffer #2',
    description: 'Extreme swell warning boundary',
    type: 'Restricted',
    status: 'Active',
    createdOn: 'May 10, 2025 04:45 PM',
    area: '210.8 km²',
    alerts: 1,
    coordinates: [[16.50, 82.80], [16.70, 83.10], [16.30, 83.15]]
  },
  {
    id: 'geo-8',
    name: 'PFZ Target Alpha Zone',
    description: 'Potential Fishing Zone recommendation boundary',
    type: 'Fishing',
    status: 'Active',
    createdOn: 'May 08, 2025 06:15 AM',
    area: '88.5 km²',
    alerts: 0,
    isCircle: true,
    center: [16.74, 82.49],
    radius: 15000
  },
  {
    id: 'geo-9',
    name: 'Godavari Estuarine Reserve',
    description: 'Protected mangrove marine breeding sanctuary',
    type: 'Restricted',
    status: 'Inactive',
    createdOn: 'May 05, 2025 01:30 PM',
    area: '115.2 km²',
    alerts: 0,
    coordinates: [[16.60, 82.20], [16.75, 82.30], [16.55, 82.35]]
  },
  {
    id: 'geo-10',
    name: 'Machilipatnam Trawl Zone',
    description: 'Artisanal gillnet and trawl corridor',
    type: 'Fishing',
    status: 'Active',
    createdOn: 'May 03, 2025 09:00 AM',
    area: '72.4 km²',
    alerts: 0,
    coordinates: [[16.15, 81.15], [16.25, 81.35], [16.05, 81.40]]
  },
  {
    id: 'geo-11',
    name: 'Offshore Rig Security Zone',
    description: '500m mandatory exclusion perimeter',
    type: 'Restricted',
    status: 'Active',
    createdOn: 'May 01, 2025 11:45 AM',
    area: '35.0 km²',
    alerts: 0,
    coordinates: [[16.85, 82.60], [16.90, 82.65], [16.82, 82.70]]
  },
  {
    id: 'geo-12',
    name: 'Coromandel Coastal Patrol Sector',
    description: 'Indian Coast Guard active monitoring grid',
    type: 'Safe',
    status: 'Active',
    createdOn: 'Apr 28, 2025 05:20 PM',
    area: '310.0 km²',
    alerts: 0,
    coordinates: [[15.80, 80.90], [16.10, 81.20], [15.70, 81.30]]
  },
  {
    id: 'geo-13',
    name: 'Hope Island Shallow Flats',
    description: 'Low depth sandbar caution area',
    type: 'Restricted',
    status: 'Inactive',
    createdOn: 'Apr 25, 2025 08:10 AM',
    area: '28.4 km²',
    alerts: 0,
    coordinates: [[16.90, 82.30], [16.94, 82.34], [16.88, 82.36]]
  },
  {
    id: 'geo-14',
    name: 'Pudimadaka Deep Fishing Zone',
    description: 'Tuna longline seasonal sector',
    type: 'Fishing',
    status: 'Active',
    createdOn: 'Apr 22, 2025 03:00 PM',
    area: '142.9 km²',
    alerts: 0,
    coordinates: [[17.40, 83.00], [17.55, 83.20], [17.35, 83.25]]
  },
  {
    id: 'geo-15',
    name: 'Gautami Mouth Port Entrance',
    description: 'Bar entrance navigation fairway',
    type: 'Port',
    status: 'Active',
    createdOn: 'Apr 20, 2025 10:15 AM',
    area: '18.6 km²',
    alerts: 0,
    coordinates: [[16.70, 82.38], [16.74, 82.42], [16.68, 82.44]]
  },
  {
    id: 'geo-16',
    name: 'Dredging Operations Sector B',
    description: 'Active seabed maintenance zone',
    type: 'Restricted',
    status: 'Inactive',
    createdOn: 'Apr 18, 2025 01:50 PM',
    area: '14.2 km²',
    alerts: 0,
    coordinates: [[17.00, 82.32], [17.04, 82.36], [16.98, 82.38]]
  },
  {
    id: 'geo-17',
    name: 'Bheemunipatnam Safe Lagoon',
    description: 'Sheltered storm refuge area',
    type: 'Safe',
    status: 'Active',
    createdOn: 'Apr 15, 2025 11:30 AM',
    area: '64.0 km²',
    alerts: 0,
    coordinates: [[17.88, 83.45], [17.95, 83.55], [17.82, 83.60]]
  },
  {
    id: 'geo-18',
    name: 'Narsapur Offshore Cluster',
    description: 'SST anomaly monitoring grid',
    type: 'Fishing',
    status: 'Active',
    createdOn: 'Apr 12, 2025 09:20 AM',
    area: '92.7 km²',
    alerts: 0,
    coordinates: [[16.20, 81.70], [16.35, 81.90], [16.10, 81.95]]
  }
];

export default function GeofencesPage() {
  const [geofences, setGeofences] = useState(INITIAL_GEOFENCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState(null);

  // New Geofence Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Restricted',
    status: 'Active',
    area: '50.0 km²'
  });

  // Calculate Summary Statistics
  const totalGeofences = geofences.length;
  const activeGeofences = geofences.filter(g => g.status === 'Active').length;
  const inactiveGeofences = geofences.filter(g => g.status === 'Inactive').length;
  const triggeredGeofences = geofences.filter(g => g.alerts > 0).length;

  // Filter Geofences
  const filteredGeofences = useMemo(() => {
    return geofences.filter((g) => {
      const matchesSearch = 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === 'All Status' ||
        (statusFilter === 'Triggered' ? g.alerts > 0 : g.status === statusFilter);

      const matchesType = 
        typeFilter === 'All Types' || g.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [geofences, searchQuery, statusFilter, typeFilter]);

  // Paginated Geofences
  const totalPages = Math.ceil(filteredGeofences.length / pageSize) || 1;
  const paginatedGeofences = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredGeofences.slice(start, start + pageSize);
  }, [filteredGeofences, currentPage]);

  // Handle Delete
  const handleDelete = (id) => {
    setGeofences(prev => prev.filter(g => g.id !== id));
  };

  // Handle Form Submit (Create / Edit)
  const handleSaveGeofence = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingGeofence) {
      setGeofences(prev => prev.map(g => g.id === editingGeofence.id ? {
        ...g,
        name: formData.name,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        area: formData.area
      } : g));
      setEditingGeofence(null);
    } else {
      const newGeo = {
        id: `geo-${Date.now()}`,
        name: formData.name,
        description: formData.description || 'Custom user boundary zone',
        type: formData.type,
        status: formData.status,
        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        area: formData.area,
        alerts: 0,
        coordinates: [
          [16.91, 82.35],
          [17.00, 82.48],
          [16.88, 82.55]
        ]
      };
      setGeofences(prev => [newGeo, ...prev]);
    }

    setIsCreateModalOpen(false);
    setFormData({ name: '', description: '', type: 'Restricted', status: 'Active', area: '50.0 km²' });
  };

  // Style helper for Type Badges
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Restricted':
        return 'bg-red-50 text-red-600 border border-red-200/60 font-medium';
      case 'Safe':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200/60 font-medium';
      case 'Port':
        return 'bg-amber-50 text-amber-600 border border-amber-200/60 font-medium';
      case 'Fishing':
        return 'bg-blue-50 text-blue-600 border border-blue-200/60 font-medium';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200 font-medium';
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-8">
      {/* PAGE HEADER WITH ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-2xl md:text-3xl text-[#0F172A] tracking-tight">
            Geofences
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Create, manage, and monitor geofenced areas.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingGeofence(null);
            setFormData({ name: '', description: '', type: 'Restricted', status: 'Active', area: '50.0 km²' });
            setIsCreateModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-[#1363DF] hover:bg-[#0D4EB3] text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create Geofence</span>
        </button>
      </div>

      {/* STAT CARDS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL GEOFENCES */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1363DF] flex items-center justify-center shrink-0 border border-blue-100">
              <Hexagon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Geofences</p>
              <p className="font-mono text-xl md:text-2xl font-bold text-[#0F172A] mt-0.5">{totalGeofences}</p>
            </div>
          </div>
        </div>

        {/* ACTIVE */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Active</p>
              <p className="font-mono text-xl md:text-2xl font-bold text-[#0F172A] mt-0.5">{activeGeofences}</p>
            </div>
          </div>
        </div>

        {/* INACTIVE */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <PauseCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Inactive</p>
              <p className="font-mono text-xl md:text-2xl font-bold text-[#0F172A] mt-0.5">{inactiveGeofences}</p>
            </div>
          </div>
        </div>

        {/* TRIGGERED */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Triggered</p>
              <p className="font-mono text-xl md:text-2xl font-bold text-[#0F172A] mt-0.5">{triggeredGeofences}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SATELLITE MAP OVERLAY DISPLAY */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card overflow-hidden">
        <div className="h-[340px] md:h-[380px] relative w-full">
          <MapContainer
            center={[16.92, 82.50]}
            zoom={9}
            scrollWheelZoom={false}
            className="w-full h-full z-10"
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics"
            />

            {/* RESTRICTED AREA POLYGON (RED) */}
            <Polygon
              positions={[
                [16.95, 82.38],
                [17.08, 82.55],
                [16.90, 82.65],
                [16.82, 82.48]
              ]}
              pathOptions={{
                color: '#EF4444',
                fillColor: '#EF4444',
                fillOpacity: 0.35,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <div className="font-bold text-red-600 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Restricted Area
                  </div>
                  <div className="text-slate-600 mt-1">High risk restricted zone</div>
                  <div className="font-mono text-[11px] mt-1 text-slate-500">Area: 120.5 km²</div>
                </div>
              </Popup>
            </Polygon>

            {/* SAFE ZONE POLYGON (GREEN) */}
            <Polygon
              positions={[
                [16.92, 82.68],
                [17.02, 82.82],
                [16.85, 82.90],
                [16.80, 82.72]
              ]}
              pathOptions={{
                color: '#10B981',
                fillColor: '#10B981',
                fillOpacity: 0.35,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <div className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Safe Zone
                  </div>
                  <div className="text-slate-600 mt-1">Safe navigation area</div>
                  <div className="font-mono text-[11px] mt-1 text-slate-500">Area: 98.3 km²</div>
                </div>
              </Popup>
            </Polygon>

            {/* PORT AREA POLYGON (ORANGE) */}
            <Polygon
              positions={[
                [16.78, 82.35],
                [16.85, 82.45],
                [16.70, 82.50],
                [16.65, 82.38]
              ]}
              pathOptions={{
                color: '#F59E0B',
                fillColor: '#F59E0B',
                fillOpacity: 0.35,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <div className="font-bold text-amber-600 flex items-center gap-1">
                    <Anchor className="w-3.5 h-3.5" /> Port Area
                  </div>
                  <div className="text-slate-600 mt-1">Port operations zone</div>
                  <div className="font-mono text-[11px] mt-1 text-slate-500">Area: 75.6 km²</div>
                </div>
              </Popup>
            </Polygon>

            {/* FISHING ZONE CIRCLE (BLUE) */}
            <Circle
              center={[16.92, 82.25]}
              radius={11000}
              pathOptions={{
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 0.3,
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1 font-sans text-xs">
                  <div className="font-bold text-blue-600 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Fishing Zone
                  </div>
                  <div className="text-slate-600 mt-1">Designated fishing area</div>
                  <div className="font-mono text-[11px] mt-1 text-slate-500">Area: 60.2 km²</div>
                </div>
              </Popup>
            </Circle>
          </MapContainer>

          {/* MAP SCALE INDICATOR OVERLAY */}
          <div className="absolute bottom-3 right-3 z-[400] flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-white text-[11px] font-mono shadow-md">
            <span>Scale: 20 km</span>
          </div>
        </div>
      </div>

      {/* GEOFENCES TABLE & SEARCH CONTROLS */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card p-5 space-y-4">
        {/* SEARCH & FILTERS ROW */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search geofences..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1363DF]"
            />
          </div>

          {/* DROPDOWN FILTERS */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Triggered">Triggered</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="All Types">All Types</option>
              <option value="Restricted">Restricted</option>
              <option value="Safe">Safe</option>
              <option value="Port">Port</option>
              <option value="Fishing">Fishing</option>
            </select>

            <button className="p-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-600 hover:text-slate-900 cursor-pointer">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Created On</th>
                <th className="py-3 px-4 font-semibold">Area</th>
                <th className="py-3 px-4 font-semibold">Alerts</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedGeofences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    No matching geofenced zones found.
                  </td>
                </tr>
              ) : (
                paginatedGeofences.map((geo) => (
                  <tr key={geo.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* NAME */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500 mt-0.5">
                          {geo.type === 'Restricted' && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                          {geo.type === 'Safe' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                          {geo.type === 'Port' && <Anchor className="w-3.5 h-3.5 text-amber-500" />}
                          {geo.type === 'Fishing' && <Compass className="w-3.5 h-3.5 text-blue-500" />}
                        </div>
                        <div>
                          <p className="font-bold text-[#0F172A]">{geo.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{geo.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* TYPE */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${getTypeBadgeStyle(geo.type)}`}>
                        {geo.type}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="py-3.5 px-4">
                      {geo.status === 'Active' ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/70">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* CREATED ON */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {geo.createdOn}
                    </td>

                    {/* AREA */}
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                      {geo.area}
                    </td>

                    {/* ALERTS */}
                    <td className="py-3.5 px-4">
                      {geo.alerts > 0 ? (
                        <div className="flex items-center gap-1 text-red-600 font-bold font-mono text-xs">
                          <Bell className="w-3.5 h-3.5 text-red-500" />
                          <span>{geo.alerts}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono">0</span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-400">
                        <button
                          onClick={() => {
                            setEditingGeofence(geo);
                            setFormData({
                              name: geo.name,
                              description: geo.description,
                              type: geo.type,
                              status: geo.status,
                              area: geo.area
                            });
                            setIsCreateModalOpen(true);
                          }}
                          className="p-1 hover:text-slate-700 transition-colors cursor-pointer"
                          title="Edit Geofence"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(geo.id)}
                          className="p-1 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Geofence"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1 hover:text-slate-700 transition-colors cursor-pointer">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-800">{filteredGeofences.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-semibold text-slate-800">{Math.min(currentPage * pageSize, filteredGeofences.length)}</span> of{' '}
            <span className="font-semibold text-slate-800">{filteredGeofences.length}</span> geofences
          </div>

          <div className="flex items-center gap-1 font-mono">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].slice(0, totalPages).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-semibold cursor-pointer ${
                  currentPage === p
                    ? 'bg-[#1363DF] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL FOR CREATE / EDIT GEOFENCE */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[1000] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-[#0F172A]">
                {editingGeofence ? 'Edit Geofenced Zone' : 'Create New Geofenced Zone'}
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGeofence} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Geofence Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Kakinada Coastal Buffer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#1363DF]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g., High risk restricted maritime sector"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#1363DF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Geofence Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Restricted">Restricted</option>
                    <option value="Safe">Safe</option>
                    <option value="Port">Port</option>
                    <option value="Fishing">Fishing</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Area Estimate (km²)</label>
                <input
                  type="text"
                  placeholder="e.g., 85.4 km²"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-[#1363DF] font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1363DF] hover:bg-[#0D4EB3] text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  {editingGeofence ? 'Update Zone' : 'Create Geofence'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
