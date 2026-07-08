import React, { useState, useRef } from 'react';
import { ArrowLeft, Navigation, RotateCcw, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapWrapper from '../components/maps/MapWrapper';
import ComplaintMarker from '../components/maps/ComplaintMarker';
import UserLocationMarker from '../components/maps/UserLocationMarker';
import LocationPicker from '../components/maps/LocationPicker';

const KOTA_CENTER = [25.18, 75.83];

const DUMMY_COMPLAINTS = [
  { id: 1, position: [25.182, 75.835], data: { title: 'Water Leakage', category: 'Water Supply', status: 'Pending', priority: 'High', location: 'Talwandi' } },
  { id: 2, position: [25.175, 75.828], data: { title: 'Road Damage', category: 'Infrastructure', status: 'Under Review', priority: 'Medium', location: 'Vigyan Nagar' } },
  { id: 3, position: [25.188, 75.840], data: { title: 'Garbage Dump', category: 'Sanitation', status: 'Pending', priority: 'High', location: 'Dadabari' } },
  { id: 4, position: [25.170, 75.820], data: { title: 'Street Light Fault', category: 'Electricity', status: 'Resolved', priority: 'Low', location: 'Mahaveer Nagar' } },
  { id: 5, position: [25.195, 75.850], data: { title: 'Drain Blockage', category: 'Sanitation', status: 'Pending', priority: 'High', location: 'Kunadi' } },
];

const MapTestPage = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setErrorMsg('');
        },
        (error) => {
          setErrorMsg('Location permission denied.');
          setTimeout(() => setErrorMsg(''), 3000);
        }
      );
    } else {
      setErrorMsg('Geolocation is not supported by your browser.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const handleResetToKota = () => {
    // We don't have direct map ref here, but we can clear picked/user locations
    // To fly the map, we'd typically need a ref to the map instance.
    // Let's rely on LocationPicker / UserLocationMarker logic or just reload the map component key if needed.
    // For simplicity, we just clear states to demonstrate logic.
    setUserLocation(null);
    setPickedLocation(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-[120px] flex flex-col">
      <header className="bg-white sticky top-0 z-40 pt-4 pb-4 px-6 border-b border-slate-200 flex items-center shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200 mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-lg text-slate-900 tracking-tight">Map Foundation Test</h1>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex flex-col">
        
        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button 
            onClick={handleGetCurrentLocation}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <Navigation size={18} /> Use Current Location
          </button>
          <button 
            onClick={handleResetToKota}
            className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
          >
            <RotateCcw size={18} /> Reset Markers
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-slate-800 text-white px-4 py-3 rounded-lg text-sm font-medium shadow-md animate-[fadeIn_0.3s_ease-out]">
            {errorMsg}
          </div>
        )}

        {/* Map Container */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-6 relative z-10 flex-grow min-h-[400px] max-h-[60vh] overflow-hidden">
          <MapWrapper center={KOTA_CENTER} zoom={13}>
            {DUMMY_COMPLAINTS.map(complaint => (
              <ComplaintMarker key={complaint.id} position={complaint.position} data={complaint.data} />
            ))}
            <UserLocationMarker position={userLocation} />
            <LocationPicker position={pickedLocation} onLocationSelect={setPickedLocation} />
          </MapWrapper>
        </div>

        {/* Selected Coordinates Display */}
        {pickedLocation && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-blue-600" />
              Selected Location
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Latitude</p>
                <p className="text-lg font-bold text-slate-900 font-mono">{pickedLocation[0].toFixed(5)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Longitude</p>
                <p className="text-lg font-bold text-slate-900 font-mono">{pickedLocation[1].toFixed(5)}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MapTestPage;
