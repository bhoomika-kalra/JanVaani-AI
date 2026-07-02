import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, CheckCircle2, ChevronDown, ChevronUp, MapPin, BrainCircuit, Mic, Image as ImageIcon, ThumbsUp, Home, RefreshCw, Calendar, User, Flag, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrackComplaint = () => {
  const navigate = useNavigate();
  const [smsExpanded, setSmsExpanded] = useState(false);
  const [hasSupported, setHasSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(243);

  const handleSupport = () => {
    if (!hasSupported) {
      setHasSupported(true);
      setSupportCount(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative">
      
      {/* 1. Header App Bar */}
      <header className="bg-slate-50 sticky top-0 z-50 pt-4 pb-2 px-4 backdrop-blur-md bg-opacity-90 border-b border-slate-200/50">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/complaint-registered')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-800 shadow-sm transition-transform active:scale-95 border border-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 tracking-tight leading-tight">JanVaani AI</span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1">
              <Search size={10} /> Track
            </span>
          </div>
          <div className="w-10"></div> {/* Placeholder for centering */}
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-12 pt-6 pb-[180px] space-y-8">
        
        {/* 2. Large Hero Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle gradient background for premium feel */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-yellow-50 to-transparent pointer-events-none"></div>

          <span className="relative z-10 bg-slate-100 px-3 py-1 rounded-md text-xs font-bold text-slate-500 font-mono tracking-wider mb-4 border border-slate-200/50">
            JV-2026-001245
          </span>
          
          <h1 className="relative z-10 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
            Water Supply Complaint
          </h1>

          <div className="relative z-10 bg-white shadow-sm border border-yellow-200 px-5 py-2.5 rounded-full flex items-center gap-2.5 mb-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </div>
            <span className="text-sm font-bold text-yellow-700 uppercase tracking-widest">Under Review</span>
          </div>

          <p className="relative z-10 text-slate-600 font-medium mb-8 leading-relaxed max-w-sm">
            The concerned department is currently reviewing your complaint details.
          </p>

          <div className="relative z-10 w-full max-w-xs bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
            <div className="bg-yellow-400 h-full rounded-full w-1/3"></div>
          </div>
        </section>

        {/* 3. Beautiful Vertical Timeline (Not in a box) */}
        <section className="px-2 pt-6 pb-4">
          <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[31px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-200">
            
            {/* Completed */}
            <div className="relative flex items-start gap-5">
              <div className="absolute -left-8 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center z-10 mt-[-6px]">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-[0_4px_10px_rgb(34,197,94,0.3)]">
                  <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-green-700">Complaint Submitted</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={12} className="text-slate-400" />
                  <p className="text-xs font-medium text-slate-500">Today • 10:45 AM</p>
                </div>
                <p className="text-sm text-slate-600 mt-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100 inline-block">
                  Successfully registered on portal.
                </p>
              </div>
            </div>

            {/* Active */}
            <div className="relative flex items-start gap-5">
              <div className="absolute -left-8 w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center z-10 mt-[-6px]">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_4px_10px_rgb(250,204,21,0.4)] border-2 border-white">
                  <Clock size={16} className="text-white" />
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-yellow-700">Under Review</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className="text-slate-400" />
                  <p className="text-xs font-medium text-slate-500">Today • 11:10 AM</p>
                </div>
                <p className="text-sm text-slate-600 mt-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100 inline-block">
                  Assigned to local nodal officer.
                </p>
              </div>
            </div>

            {/* Pending Steps */}
            <div className="relative flex items-center gap-5 opacity-40 grayscale">
              <div className="absolute -left-8 w-12 h-12 flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
              </div>
              <p className="text-base font-bold text-slate-700">AI Recommendation</p>
            </div>

            <div className="relative flex items-center gap-5 opacity-40 grayscale">
              <div className="absolute -left-8 w-12 h-12 flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
              </div>
              <p className="text-base font-bold text-slate-700">Department Approval</p>
            </div>

            <div className="relative flex items-center gap-5 opacity-40 grayscale">
              <div className="absolute -left-8 w-12 h-12 flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
              </div>
              <p className="text-base font-bold text-slate-700">Work Started</p>
            </div>

            <div className="relative flex items-center gap-5 opacity-40 grayscale">
              <div className="absolute -left-8 w-12 h-12 flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm"></div>
              </div>
              <p className="text-base font-bold text-slate-700">Completed</p>
            </div>

          </div>
        </section>

        {/* 4. AI Insight */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full pointer-events-none -mt-4 -mr-4"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <BrainCircuit size={20} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">AI Insight</h3>
          </div>

          <p className="text-indigo-900 font-semibold mb-6">
            143 similar complaints detected nearby.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Priority Score</p>
              <p className="text-2xl font-black text-slate-900">92<span className="text-sm font-semibold text-slate-400">/100</span></p>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Community Support</p>
              <p className="text-2xl font-black text-slate-900">243<span className="text-sm font-semibold text-slate-400 ml-1">Citizens</span></p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <p className="text-sm text-indigo-800 font-medium leading-relaxed italic">
              "Recommended for high priority because similar complaints have increased rapidly in this grid."
            </p>
          </div>
        </section>

        {/* 5. Complaint Details */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Complaint Details</h3>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</span>
              <span className="text-sm font-bold text-slate-800">Water Supply</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Location</span>
              <span className="text-sm font-bold text-slate-800">Rampura Village</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Language</span>
              <span className="text-sm font-bold text-slate-800">Hindi</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted</span>
              <span className="text-sm font-bold text-slate-800">Today, 10:45 AM</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Complaint Summary</span>
              <p className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 leading-relaxed">
                Water shortage in Rampura. Need immediate intervention as 50 families are affected.
              </p>
            </div>
            <div className="col-span-2 flex gap-4 mt-2">
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 border border-indigo-100">
                <Mic size={16} />
                <span className="text-xs font-bold">Voice Available</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-slate-500 border border-slate-200">
                <ImageIcon size={16} />
                <span className="text-xs font-bold">No Photo</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Map */}
        <section className="bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col">
          <div className="w-full h-48 bg-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center">
            {/* Map Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Heatmap blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              <MapPin size={36} className="text-red-500 drop-shadow-md mb-2" />
              <div className="bg-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg border border-slate-100 text-slate-800">
                Rampura Village
              </div>
            </div>
          </div>
          
          <button className="w-full mt-2 bg-white hover:bg-slate-50 text-blue-600 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
            View Full Map
          </button>
        </section>

        {/* 7. Expected Resolution */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Expected Resolution</h3>
          
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-slate-800">Review</span>
                  <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">2 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[80%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                <User size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-slate-800">Department Visit</span>
                  <span className="text-sm font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">5 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[40%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                <Flag size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-bold text-slate-800">Expected Completion</span>
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-lg border border-blue-200/50">12 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SMS Updates (Accordion) */}
        <section className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <button 
            onClick={() => setSmsExpanded(!smsExpanded)}
            className="w-full flex items-center justify-between p-6 sm:p-8 active:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <MessageSquare size={14} />
              </div>
              <span className="font-bold text-slate-800">SMS Updates</span>
            </div>
            {smsExpanded ? <ChevronUp size={20} className="text-slate-400"/> : <ChevronDown size={20} className="text-slate-400"/>}
          </button>
          
          <div className={`px-6 sm:px-8 pb-8 transition-all duration-300 ${smsExpanded ? 'block' : 'hidden'}`}>
            <ul className="space-y-6 pt-2 border-t border-slate-50">
              <li className="flex items-center gap-4">
                <CheckCircle2 size={16} className="text-green-500" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800">Complaint Registered</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">10:45 AM</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <CheckCircle2 size={16} className="text-green-500" />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800">Under Review</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">11:10 AM</span>
                </div>
              </li>
              <li className="flex items-center gap-4 opacity-40 grayscale">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-800">Dept. Visit Pending</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Pending</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* 9. Community Support Premium CTA */}
        <section className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden mt-8 shadow-2xl mb-[120px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full blur-3xl pointer-events-none -mt-20 -mr-20"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
              <ThumbsUp size={28} className="text-blue-300" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {supportCount} Citizens Support This Issue
            </h2>
            
            <p className="text-slate-400 font-medium mb-8 leading-relaxed max-w-sm">
              Supporting this complaint increases its priority without creating duplicate reports in the system.
            </p>
            
            <button 
              onClick={handleSupport}
              disabled={hasSupported}
              className={`w-full font-bold py-5 px-8 rounded-2xl transition-all shadow-[0_8px_20px_rgb(37,99,235,0.3)] ${hasSupported ? 'bg-slate-700 text-slate-300 shadow-none cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95 text-white'}`}
            >
              {hasSupported ? 'Supported' : 'Support This Issue'}
            </button>
          </div>
        </section>

      </main>

      {/* 10. Bottom Sticky Bar */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 p-4 pb-safe z-50">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex gap-4">
          <button 
            onClick={() => navigate('/citizen')}
            className="flex-1 bg-slate-50 active:bg-slate-100 text-slate-800 font-bold h-[56px] rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} /> Return Home
          </button>
          
          <button 
            className="flex-1 bg-slate-900 active:bg-slate-800 text-white font-bold h-[56px] rounded-2xl shadow-[0_8px_20px_rgba(15,23,42,0.2)] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} /> Refresh
          </button>
        </div>
      </div>

    </div>
  );
};

export default TrackComplaint;
