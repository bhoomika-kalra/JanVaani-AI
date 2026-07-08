import React, { useState, useEffect } from 'react';
import {
  MessageSquare, MapPin, ChevronDown, Bell, Mic, Camera,
  AlertTriangle, ClipboardList, ArrowRight, Droplets, Zap,
  Activity, ShieldAlert, CheckCircle2, FolderOpen, Users,
  MoreHorizontal, X, Crosshair, Map, ThumbsUp, Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import MapWrapper from '../components/maps/MapWrapper';
import ComplaintMarker from '../components/maps/ComplaintMarker';
import UserLocationMarker from '../components/maps/UserLocationMarker';
import { getCitizenLocation, getNearbyCommunityIssues } from '../services/mapService';

const CitizenHome = () => {
  const navigate = useNavigate();

  // Location State
  const [userLocation, setUserLocation] = useState('Udaipur');
  const [userState, setUserState] = useState('Rajasthan');
  const [showLocationPermission, setShowLocationPermission] = useState(true);
  const [mapLocation, setMapLocation] = useState([25.18, 75.83]);
  const [nearbyIssues, setNearbyIssues] = useState([]);

  useEffect(() => {
    const fetchMapData = async () => {
      const location = await getCitizenLocation();
      setMapLocation(location);
      const issues = await getNearbyCommunityIssues(location);
      setNearbyIssues(issues);
    };
    fetchMapData();
  }, []);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState({ state: '', city: '', pincode: '' });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  useEffect(() => {
    // Read from localStorage
    const savedProfile = localStorage.getItem('janvaani_citizen_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        if (parsed.villageCity) setUserLocation(parsed.villageCity);
        if (parsed.state) setUserState(parsed.state);
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const handleOpenLocationModal = () => {
    setTempLocation({ state: userState, city: userLocation, pincode: '' });
    setIsLocationModalOpen(true);
  };

  const handleSaveLocation = () => {
    if (tempLocation.city) setUserLocation(tempLocation.city);
    if (tempLocation.state) setUserState(tempLocation.state);
    setIsLocationModalOpen(false);
  };

  const handleUseCurrentLocation = () => {
    setIsDetectingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            // Use free reverse geocoding API
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            
            const city = data.address.city || data.address.town || data.address.village || data.address.county || "Unknown City";
            const state = data.address.state || "Unknown State";
            
            setTempLocation({ state: state, city: city, pincode: data.address.postcode || '' });
            setIsDetectingLocation(false);
          } catch (error) {
            console.error("Error fetching location details", error);
            setToastMsg("Could not detect exact city. Please enter manually.");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            setIsDetectingLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setToastMsg("Location access denied or unavailable.");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          setIsDetectingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setToastMsg("Geolocation is not supported by your browser.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setIsDetectingLocation(false);
    }
  };

  const [issuesState, setIssuesState] = useState([
    {
      id: 1,
      title: "Severe Waterlogging on Main Road",
      location: userLocation,
      category: "Water",
      icon: <Droplets size={16} className="text-white" />,
      iconBg: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&q=80",
      support: 243,
      status: "IN PROGRESS",
      statusColor: "text-blue-600 bg-white",
      aiPriority: 88,
      distance: "0.8 km",
      isSupported: false
    },
    {
      id: 2,
      title: "Transformer Sparking Repeatedly",
      location: userLocation,
      category: "Electricity",
      icon: <Zap size={16} className="text-white" />,
      iconBg: "bg-orange-500",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=500&q=80",
      support: 189,
      status: "ASSIGNED",
      statusColor: "text-orange-500 bg-white",
      aiPriority: 95,
      distance: "1.2 km",
      isSupported: false
    },
    {
      id: 3,
      title: "Garbage Dump Overflowing",
      location: userLocation,
      category: "Sanitation",
      icon: <ShieldAlert size={16} className="text-white" />,
      iconBg: "bg-red-500",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80",
      support: 156,
      status: "OPEN",
      statusColor: "text-red-500 bg-white",
      aiPriority: 85,
      distance: "2.5 km",
      isSupported: false
    },
  ]);

  const handleSupport = (id) => {
    setIssuesState(prev => prev.map(issue => {
      if (issue.id === id) {
        if (!issue.isSupported) {
          setShowToast(true);
          setToastMsg("Thanks for your support! Upvote registered.");
          setTimeout(() => setShowToast(false), 3000);
          return { ...issue, support: issue.support + 1, isSupported: true };
        }
      }
      return issue;
    }));
  };

  const categories = [
    { name: "All", icon: null },
    { name: "Water", icon: <Droplets size={14} /> },
    { name: "Roads", icon: <MapPin size={14} /> },
    { name: "Electricity", icon: <Zap size={14} /> },
    { name: "Healthcare", icon: <Activity size={14} /> },
    { name: "Sanitation", icon: <ShieldAlert size={14} /> },
  ];

  const recentUpdates = [
    { id: 1, title: "Water pipeline approved", date: "2 hours ago", dept: "Water Department", status: "APPROVED", color: "green" },
    { id: 2, title: "Road Repair completed", date: "5 hours ago", dept: "PWD", status: "COMPLETED", color: "green" },
    { id: 3, title: "Street lights installed", date: "1 day ago", dept: "Power Board", status: "COMPLETED", color: "blue" },
  ];

  const filteredIssues = activeCategory === 'All' ? issuesState : issuesState.filter(issue => issue.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-16 flex justify-center relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="font-semibold text-sm">{toastMsg}</span>
        </div>
      )}

      <div className="w-full max-w-[1700px] bg-[#FAFAFA] min-h-screen shadow-sm flex flex-col">

        {/* TOP NAVBAR */}
        <header className="w-full bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="JanVaani AI Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl tracking-tight text-slate-900">JanVaani AI</span>
          </div>

          <div className="flex items-center gap-6">
            <div
              onClick={handleOpenLocationModal}
              className="flex items-center gap-1.5 text-blue-600 cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <MapPin size={16} />
              <span className="text-sm font-semibold">{userLocation}{userState ? `, ${userState}` : ''}</span>
              <ChevronDown size={16} />
            </div>
            <button className="text-slate-600 hover:text-slate-900 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <div onClick={() => navigate('/profile')} className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm cursor-pointer shadow-sm hover:opacity-90">
              C
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row flex-1">

          {/* ========================================== */}
          {/* LEFT / MAIN COLUMN */}
          {/* ========================================== */}
          <div className="flex-1 p-6 lg:p-10 border-r border-slate-200 bg-white">

            {/* HERO SECTION */}
            <div className="flex flex-col xl:flex-row gap-8 items-center mb-10">

              <div className="xl:w-1/3">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-[1.15] mb-4">
                  Welcome Back,<br />Citizen! <span className="text-3xl"></span>
                </h1>
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                  Your voice helps build a better and stronger community.
                </p>
              </div>

              <div className="xl:w-2/3 grid grid-cols-2 md:grid-cols-5 gap-4 w-full">

                {/* Action Card 1: Speak to AI */}
                <div onClick={() => navigate('/voice-assistant')} className="bg-white border-2 border-blue-500 rounded-[1.25rem] p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(99,102,241,0.08)] cursor-pointer hover:-translate-y-1 transition-transform group">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                    <Mic size={24} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-[15px] mb-1">Speak to AI</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Report by voice</p>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Action Card 2: Report Issue */}
                <div onClick={() => navigate('/submit-complaint')} className="bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:-translate-y-1 hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                    <Camera size={24} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-[15px] mb-1">Report Issue</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Submit with photo</p>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Action Card 3: Emergency Alerts */}
                <div onClick={() => navigate('/emergency-alerts')} className="bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:-translate-y-1 hover:border-orange-300 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-[15px] mb-1">Emergency Alerts</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Important notices</p>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Action Card 4: My Complaints */}
                <div onClick={() => navigate('/my-complaints')} className="bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:-translate-y-1 hover:border-green-300 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                    <ClipboardList size={24} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-[15px] mb-1">My Complaints</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Track your complaints</p>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Action Card 5: Share Feedback */}
                <div onClick={() => navigate('/citizen-feedback')} className="bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:-translate-y-1 hover:border-purple-300 hover:shadow-md transition-all group md:col-span-1 col-span-2">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare size={24} />
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 text-[15px] mb-1">Share Feedback</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Rate resolved issues</p>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CATEGORY PILLS */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide border-b border-slate-100">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${activeCategory === cat.name ? 'bg-blue-500 text-white border-blue-500 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  {cat.icon && <span className={activeCategory === cat.name ? 'text-white' : 'text-slate-400'}>{cat.icon}</span>}
                  {cat.name}
                </button>
              ))}
              <button 
                onClick={() => {
                  setToastMsg("More categories coming soon!");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 3000);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              >
                <MoreHorizontal size={14} /> More
              </button>
            </div>

            {/* COMMUNITY ISSUES */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    Community Issues Near You
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-1 ml-10 font-medium">Showing issues near <span className="text-blue-600">{userLocation}</span></p>
                </div>
                <button onClick={handleOpenLocationModal} className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50">
                  <Crosshair size={14} /> Change Location
                </button>
              </div>

              {/* Map Preview */}
              <div className="bg-white p-2 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-200 mb-8 overflow-hidden">
                <div style={{ height: '300px', width: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
                  <MapWrapper center={mapLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <UserLocationMarker position={mapLocation} />
                    {nearbyIssues.map(issue => (
                      <ComplaintMarker 
                        key={issue.id}
                        position={[issue.latitude, issue.longitude]} 
                        color={issue.priority_score > 90 ? 'red' : issue.priority_score > 60 ? 'orange' : 'green'} 
                        data={{ title: issue.title, category: issue.category, status: issue.status, priority: issue.priority_score > 90 ? 'High' : issue.priority_score > 60 ? 'Medium' : 'Low', location: issue.city_or_village, support: issue.supporters }} 
                        onViewDetails={() => navigate('/track-complaint')}
                      />
                    ))}
                  </MapWrapper>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow flex flex-col">

                    {/* IMAGE HEADER */}
                    <div className="relative h-44 w-full">
                      <img src={issue.image} alt={issue.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                      {/* Overlays */}
                      <span className={`absolute top-4 left-4 ${issue.statusColor} text-[10px] font-bold px-2.5 py-1 rounded shadow-sm tracking-wide`}>
                        {issue.status}
                      </span>

                      <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1 shadow-sm tracking-wide">
                        AI SCORE <span className="text-sm font-black leading-none ml-1">{issue.aiPriority}</span>
                      </span>

                      {/* Overlapping Icon */}
                      <div className={`absolute -bottom-5 left-5 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${issue.iconBg}`}>
                        {issue.icon}
                      </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="pt-8 px-6 pb-6 flex flex-col flex-1">
                      <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-4">{issue.title}</h3>

                      <div className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <MapPin size={14} /> {userLocation}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <Activity size={14} /> {issue.distance} from you
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-6 mt-auto">
                        <Users size={16} /> {issue.support} citizens support this
                      </div>

                      {/* BUTTONS */}
                      <div className="grid grid-cols-1 gap-3">
                        <button 
                          onClick={() => handleSupport(issue.id)}
                          className={`${issue.isSupported ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2`}
                        >
                          {issue.isSupported ? <CheckCircle2 size={14} /> : <ThumbsUp size={14} />} {issue.isSupported ? 'Supported' : 'Support'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center flex justify-center">
                <button onClick={() => setShowMapModal(true)} className="text-sm font-semibold text-slate-600 flex items-center gap-2 hover:text-blue-600 transition-colors">
                  View All Nearby Issues <ChevronDown size={16} className="-rotate-90" />
                </button>
              </div>
            </div>

          </div>

          {/* ========================================== */}
          {/* RIGHT SIDEBAR COLUMN */}
          {/* ========================================== */}
          <div className="lg:w-[400px] p-6 lg:p-10 bg-[#FAFAFA] flex flex-col gap-10">

            {/* OVERVIEW */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[17px] font-bold text-slate-900">Overview</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white p-5 rounded-[1.25rem] border border-slate-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <ClipboardList size={20} />
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-slate-900 leading-none mb-1">245</span>
                    <span className="text-[11px] font-medium text-slate-500">Active issues</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[1.25rem] border border-slate-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-slate-900 leading-none mb-1">180</span>
                    <span className="text-[11px] font-medium text-slate-500">Resolved</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[1.25rem] border border-slate-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <FolderOpen size={20} />
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-slate-900 leading-none mb-1">24</span>
                    <span className="text-[11px] font-medium text-slate-500">Ongoing Projects</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[1.25rem] border border-slate-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-500 flex items-center justify-center shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <span className="block text-xl font-bold text-slate-900 leading-none mb-1">12.5K</span>
                    <span className="text-[11px] font-medium text-slate-500">Citizens Helped</span>
                  </div>
                </div>

              </div>
            </section>

            {/* LIVE UPDATES */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[17px] font-bold text-slate-900">Live Updates</h2>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm">
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-slate-100 pl-1">

                  {recentUpdates.map((update, idx) => (
                    <div key={update.id} className="relative flex items-start gap-5">
                      <div className={`relative z-10 shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white ${update.color === 'green' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
                        {update.color === 'green' ? <CheckCircle2 size={10} /> : <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                      </div>
                      <div className="flex flex-col pt-0.5 w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-[13px] text-slate-900 pr-2">{update.title}</h4>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${update.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{update.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-slate-400">{update.date}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[11px] font-medium text-slate-400">{update.dept}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={() => {
                      setToastMsg("Full Live Updates feed coming soon!");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 3000);
                    }}
                    className="text-[13px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                  >
                    See All Updates <ChevronDown size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>
            </section>

            {/* YOUR ACTIVITY */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[17px] font-bold text-slate-900">Your Activity</h2>
              </div>

              <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-blue-50/50 rounded-l-[100px] -mr-8"></div>

                <div className="grid grid-cols-4 gap-4 relative z-10 text-center">

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <Mic size={14} />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-900 leading-none">4</span>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 block">Reported</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-900 leading-none">3</span>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 block">Resolved</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                      <Users size={14} />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-900 leading-none">12</span>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 block">Supported</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <Award size={14} />
                    </div>
                    <div>
                      <span className="block text-xl font-bold text-slate-900 leading-none">850</span>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 block">Civic Score</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        </div>

      </div>

      {/* Change Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsLocationModalOpen(false)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2"><MapPin className="text-blue-600" /> Change Location</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-5">

              <button onClick={handleUseCurrentLocation} disabled={isDetectingLocation} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isDetectingLocation ? (
                  <span className="flex items-center gap-2"><Crosshair size={18} className="animate-spin" /> Detecting Location...</span>
                ) : (
                  <span className="flex items-center gap-2"><Crosshair size={18} /> Use Current Location</span>
                )}
              </button>

              <div className="flex items-center gap-4">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">State</label>
                <input type="text" value={tempLocation.state} onChange={e => setTempLocation({ ...tempLocation, state: e.target.value })} placeholder="E.g. Rajasthan" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">City / Village</label>
                <input type="text" value={tempLocation.city} onChange={e => setTempLocation({ ...tempLocation, city: e.target.value })} placeholder="E.g. Udaipur" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 transition-colors" />
              </div>

            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsLocationModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveLocation} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Issues Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowMapModal(false)}></div>
          <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h3 className="font-black text-xl text-slate-900 flex items-center gap-2"><MapPin className="text-blue-600" /> Community Issues Map</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Live view of active complaints in your area.</p>
              </div>
              <button onClick={() => setShowMapModal(false)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 bg-slate-50 p-4 sm:p-6 relative">
               <iframe 
                  title="Community Issues Map"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=75.75,26.85,75.90,26.98&layer=mapnik&marker=26.91,75.82`}
                  style={{width: '100%', height: '100%', border: 0, borderRadius: '1rem'}}
                  className="bg-slate-200 shadow-inner"
               ></iframe>

               <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 pointer-events-none">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Map Legend</h4>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical</div>
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> High Priority</div>
                     <div className="flex items-center gap-2 text-sm font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Under Review</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CitizenHome;
