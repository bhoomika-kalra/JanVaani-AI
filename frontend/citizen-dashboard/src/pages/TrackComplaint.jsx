import React, { useState } from 'react';
import { ArrowLeft, Search, Clock, CheckCircle2, ChevronDown, ChevronUp, MapPin, BrainCircuit, Mic, Image as ImageIcon, ThumbsUp, Home, RefreshCw, Calendar, User, Flag, MessageSquare, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

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
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col relative pb-[120px]">
      
      {/* 1. Header App Bar */}
      <header className="bg-white sticky top-0 z-50 pt-4 pb-4 px-6 border-b border-slate-200 flex items-center justify-between shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-800 transition-colors border border-slate-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="JanVaani AI Logo" className="h-6 w-auto" />
            <span className="font-bold text-lg text-slate-900 tracking-tight leading-tight">JanVaani AI</span>
          </div>
          <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest flex items-center gap-1">
            <Search size={10} /> Track
          </span>
        </div>
        <div className="w-10"></div> {/* Placeholder for centering */}
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* 2. Hero Card */}
        <section className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-200 flex flex-col items-center text-center relative overflow-hidden">
          
          <span className="bg-blue-50 px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 tracking-wider mb-4 border border-blue-100">
            JV-2026-001245
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
            Water Supply Complaint
          </h1>

          <div className="bg-orange-50 border border-orange-200 px-5 py-2 rounded-full flex items-center gap-2 mb-6">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </div>
            <span className="text-[11px] font-bold text-orange-700 uppercase tracking-widest">Under Review</span>
          </div>

          <p className="text-slate-500 font-medium mb-8 leading-relaxed max-w-sm text-sm">
            The concerned department is currently reviewing your complaint details.
          </p>

          <div className="w-full max-w-sm bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-1/3"></div>
          </div>
        </section>

        {/* 3. Timeline */}
        <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-8">Timeline</h3>
          
          <div className="relative space-y-8">
            {/* The vertical line */}
            <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-slate-100"></div>
            
            {/* Completed */}
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center border-2 border-green-500">
                  <CheckCircle2 size={16} className="text-green-500" strokeWidth={3} />
                </div>
              </div>
              <div className="pt-2.5">
                <p className="text-[15px] font-bold text-slate-900">Complaint Submitted</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Today • 10:45 AM</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  Successfully registered on portal.
                </p>
              </div>
            </div>

            {/* Active */}
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center border-2 border-orange-400">
                  <Clock size={16} className="text-orange-500" />
                </div>
              </div>
              <div className="pt-2.5">
                <p className="text-[15px] font-bold text-slate-900">Under Review</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Today • 11:10 AM</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  Assigned to local nodal officer.
                </p>
              </div>
            </div>

            {/* Pending Steps */}
            <div className="relative flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
              </div>
              <p className="text-[15px] font-bold text-slate-400 pt-0.5">AI Recommendation</p>
            </div>

            <div className="relative flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
              </div>
              <p className="text-[15px] font-bold text-slate-400 pt-0.5">Department Approval</p>
            </div>

            <div className="relative flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
              </div>
              <p className="text-[15px] font-bold text-slate-400 pt-0.5">Work Started</p>
            </div>

            <div className="relative flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                <div className="w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
              </div>
              <p className="text-[15px] font-bold text-slate-400 pt-0.5">Completed</p>
            </div>

          </div>
        </section>

        {/* 4. AI Insight */}
        <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full pointer-events-none -mt-4 -mr-4"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
              <BrainCircuit size={20} className="text-blue-600" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">AI Insight</h3>
          </div>

          <p className="text-blue-900 font-semibold mb-6 text-sm">
            143 similar complaints detected nearby.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Priority Score</p>
              <p className="text-2xl font-black text-slate-900">92<span className="text-xs font-semibold text-slate-400">/100</span></p>
            </div>
            <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Community Support</p>
              <p className="text-2xl font-black text-slate-900">243<span className="text-xs font-semibold text-slate-400 ml-1">Citizens</span></p>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
            <p className="text-[13px] text-blue-700 font-medium leading-relaxed italic">
              "Recommended for high priority because similar complaints have increased rapidly in this grid."
            </p>
          </div>
        </section>

        {/* 5. Expected Resolution */}
        <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-8">Expected Resolution</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-bold text-slate-700">Review</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">2 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[80%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200 shrink-0">
                <User size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-bold text-slate-700">Department Visit</span>
                  <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">5 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[40%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shrink-0">
                <Flag size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-bold text-blue-700">Expected Completion</span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">12 Days</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full w-[15%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>



      </main>

      {/* 7. Bottom Sticky Bar */}
      <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 p-4 pb-safe z-50">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button 
            onClick={() => navigate('/citizen')}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} /> Return Home
          </button>
          
          <button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

    </div>
  );
};

export default TrackComplaint;
