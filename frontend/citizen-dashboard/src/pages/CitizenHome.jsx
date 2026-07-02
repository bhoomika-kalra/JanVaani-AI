import React, { useState } from 'react';
import { Mic, Search, MapPin, CheckCircle2, Users, LayoutDashboard, Clock, ChevronRight, Activity, Zap, Droplets, ShieldAlert, Award, PlusCircle, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CitizenHome = () => {
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState('');
  const [trackError, setTrackError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleTrackSubmit = () => {
    if (trackId.trim() === '') {
      setTrackError(true);
    } else {
      setTrackError(false);
      navigate('/track-complaint');
    }
  };

  const trendingIssues = [
    { id: 1, title: "Severe Waterlogging on Main Road", location: "Sector 4, MG Road", category: "Drainage", support: 243, status: "In Progress", statusColor: "text-blue-700 bg-blue-100", aiPriority: 98, distance: "0.8 km" },
    { id: 2, title: "Transformer Sparking Repeatedly", location: "Rampura Market", category: "Electricity", support: 189, status: "Assigned", statusColor: "text-orange-700 bg-orange-100", aiPriority: 95, distance: "1.2 km" },
    { id: 3, title: "Garbage Dump Overflowing", location: "Gandhi Nagar", category: "Sanitation", support: 156, status: "Open", statusColor: "text-red-700 bg-red-100", aiPriority: 85, distance: "2.5 km" },
  ];

  const categories = [
    { name: "All", icon: <LayoutDashboard size={14}/> },
    { name: "Water", icon: <Droplets size={14}/> },
    { name: "Roads", icon: <MapPin size={14}/> },
    { name: "Electricity", icon: <Zap size={14}/> },
    { name: "Healthcare", icon: <Activity size={14}/> },
    { name: "Sanitation", icon: <ShieldAlert size={14}/> },
  ];

  const recentUpdates = [
    { id: 1, title: "Water pipeline approved", date: "2 hours ago", dept: "Water Department", status: "Approved" },
    { id: 2, title: "Road Repair completed", date: "5 hours ago", dept: "PWD", status: "Completed" },
    { id: 3, title: "Street lights installed", date: "1 day ago", dept: "Power Board", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 pb-16 relative overflow-x-hidden">
      
      {/* ------------------------------------------------ */}
      {/* PAGE CONTAINER */}
      {/* ------------------------------------------------ */}
      <div className="w-full max-w-[1500px] mx-auto px-5 lg:px-8 py-8 lg:py-12">
        
        {/* DESKTOP GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* ======================================= */}
          {/* LEFT SIDE / MAIN COLUMN (approx 65%) */}
          {/* ======================================= */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* 1. WELCOME SECTION */}
            <section className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">Welcome back,<br/>Citizen 👋</h1>
                  <p className="text-sm lg:text-base font-bold text-slate-500">Your voice helps build a better constituency.</p>
                </div>
                <div 
                  onClick={() => navigate('/profile')}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border-2 border-white shadow-sm cursor-pointer hover:bg-slate-200 transition-colors shrink-0"
                >
                  <Users size={24} />
                </div>
              </div>

              {/* 4 PRIMARY ACTION BUTTONS (Hero Area) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                
                <div onClick={() => navigate('/voice-assistant')} className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-md text-white flex flex-col gap-4 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 relative">
                     <Mic size={28} className="text-white" />
                  </div>
                  <div>
                    <span className="block font-black text-xl mb-1">Speak to AI</span>
                    <span className="text-blue-100 text-sm font-medium">Report by voice</span>
                  </div>
                </div>

                <div onClick={() => navigate('/submit-complaint')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1 active:scale-95">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <PlusCircle size={28} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 text-xl mb-1">Report Issue</span>
                    <span className="text-slate-500 text-sm font-medium">Submit with text/photo</span>
                  </div>
                </div>

                <div onClick={() => navigate('/track-complaint')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:border-orange-300 transition-all hover:-translate-y-1 active:scale-95">
                  <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                    <Search size={28} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 text-xl mb-1">Track Complaint</span>
                    <span className="text-slate-500 text-sm font-medium">Check status</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-md hover:border-green-300 transition-all hover:-translate-y-1 active:scale-95">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 text-xl mb-1">Nearby Issues</span>
                    <span className="text-slate-500 text-sm font-medium">Support community</span>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. REPORT CATEGORIES */}
            <section>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
                {categories.map((cat, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap shadow-sm transition-all border ${activeCategory === cat.name ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    <span className={activeCategory === cat.name ? 'text-white' : 'text-slate-400'}>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </section>

            {/* 4. TRACK COMPLAINT */}
            <section>
              <div className="bg-slate-900 rounded-3xl p-6 lg:p-8 shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 md:max-w-[200px]">
                  <h3 className="text-xl lg:text-2xl font-black mb-1">Track Issue</h3>
                  <p className="text-slate-400 text-sm font-medium">Check real-time status</p>
                </div>

                <div className="relative z-10 flex-1 w-full flex flex-col gap-3">
                  <div className="flex gap-2 bg-slate-800 p-2 rounded-2xl border border-slate-700 focus-within:border-blue-500 transition-colors">
                    <input 
                      type="text"
                      placeholder="Enter ID (e.g. JV-124)"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      className="bg-transparent flex-1 px-4 py-2 text-sm font-bold placeholder:text-slate-500 focus:outline-none"
                    />
                    <button onClick={handleTrackSubmit} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl shadow-md transition-colors font-bold text-sm shrink-0">
                      Track
                    </button>
                  </div>
                  {trackError && <span className="text-red-400 text-xs font-bold pl-2">Please enter an ID.</span>}
                </div>
              </div>
            </section>

            {/* 6. COMMUNITY ISSUES */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Community Issues</h2>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View Map</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {trendingIssues.map((issue) => (
                  <div key={issue.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-5">
                      <div className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${issue.statusColor}`}>
                        {issue.status}
                      </div>
                      <div className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md border border-red-100">
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Priority</span>
                        <span className="text-sm font-black leading-none">{issue.aiPriority}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-snug mb-4">{issue.title}</h3>
                    
                    <div className="flex flex-col gap-2 text-xs font-bold text-slate-500 mb-6">
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-slate-400"/> {issue.location}</span>
                      <span className="flex items-center gap-2"><MapPin size={14} className="text-slate-400"/> {issue.distance} from you</span>
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                          <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">+{issue.support} Backed</span>
                      </div>

                      <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-slate-800 transition-colors shrink-0">
                        Support
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>


          {/* ======================================= */}
          {/* RIGHT SIDE / SIDEBAR (approx 35%) */}
          {/* ======================================= */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            
            {/* 5. CONSTITUENCY OVERVIEW */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Overview</h2>
              </div>
              <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <div className="w-14 h-14 rounded-full border-[4px] border-slate-100 flex items-center justify-center relative">
                       <svg className="w-14 h-14 absolute -rotate-90" viewBox="0 0 36 36"><path className="text-orange-500" strokeWidth="4" strokeDasharray="60, 100" strokeLinecap="round" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
                       <span className="text-sm font-black text-slate-900">245</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active</span>
                      <span className="text-base font-bold text-slate-700">Issues</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <div className="w-14 h-14 rounded-full border-[4px] border-slate-100 flex items-center justify-center relative">
                       <svg className="w-14 h-14 absolute -rotate-90" viewBox="0 0 36 36"><path className="text-green-500" strokeWidth="4" strokeDasharray="80, 100" strokeLinecap="round" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
                       <span className="text-sm font-black text-slate-900">180</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resolved</span>
                      <span className="text-base font-bold text-slate-700">Total</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <div className="w-14 h-14 rounded-full border-[4px] border-slate-100 flex items-center justify-center relative">
                       <svg className="w-14 h-14 absolute -rotate-90" viewBox="0 0 36 36"><path className="text-blue-500" strokeWidth="4" strokeDasharray="40, 100" strokeLinecap="round" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/></svg>
                       <span className="text-sm font-black text-slate-900">24</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ongoing</span>
                      <span className="text-base font-bold text-slate-700">Projects</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <div className="w-14 h-14 rounded-full border-[4px] border-slate-100 flex items-center justify-center relative bg-indigo-50 border-none">
                       <Users size={24} className="text-indigo-600"/>
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Helped</span>
                      <span className="text-base font-bold text-slate-700">12.5k Citizens</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. COMMUNITY UPDATES (TIMELINE) */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Live Updates</h2>
              </div>
              
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-8">
                <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[15px] before:h-full before:w-[2px] before:bg-slate-100 pl-1">
                  {recentUpdates.map((update, idx) => (
                    <div key={update.id} className="relative flex items-start gap-6">
                      <div className="relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-[4px] border-white shadow-sm bg-green-100 text-green-600">
                        <CheckCircle2 size={12} />
                      </div>
                      <div className="flex flex-col pt-0.5">
                        <h4 className="font-extrabold text-base text-slate-900 mb-1.5">{update.title}</h4>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{update.date}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{update.dept}</span>
                        </div>
                        <span className="inline-block bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-green-100 w-fit">{update.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. YOUR ACTIVITY */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Your Activity</h2>
              </div>
              <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-8 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-10">
                   <Award size={100}/>
                 </div>
                 <div className="relative z-10 grid grid-cols-2 gap-y-10">
                    <div>
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Reported</span>
                      <span className="text-4xl font-black">4</span>
                    </div>
                    <div>
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Resolved</span>
                      <span className="text-4xl font-black text-green-400">3</span>
                    </div>
                    <div>
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Supported</span>
                      <span className="text-4xl font-black">12</span>
                    </div>
                    <div>
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Civic Score</span>
                      <span className="text-4xl font-black text-blue-400">850</span>
                    </div>
                 </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CitizenHome;
