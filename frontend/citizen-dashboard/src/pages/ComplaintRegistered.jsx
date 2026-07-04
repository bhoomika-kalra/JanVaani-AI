import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Globe, Copy, AlertCircle, MapPin, Percent, Info, Search, Home, ChevronRight, MessageSquare, ClipboardCheck, Bell, Activity, BrainCircuit, Languages, FilePlus2, PlaySquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const ComplaintRegistered = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900 pb-[120px] flex flex-col relative overflow-x-hidden">
      
      {/* 1. Top Bar */}
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
          <div className="flex items-center gap-1 mt-0.5">
            <CheckCircle2 size={12} className="text-green-500" />
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Registered</span>
          </div>
        </div>
        <div className="w-10"></div> {/* Placeholder for centering */}
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* 1. Success Header */}
        <section className="text-center mb-10 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-200 mb-6 relative">
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
            <CheckCircle2 size={40} className="text-green-500 relative z-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            Complaint Registered Successfully
          </h1>
          <p className="text-[15px] text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Thank you. Your complaint has been successfully registered by JanVaani AI and will be reviewed shortly.
          </p>
        </section>

        {/* 2. Complaint ID Hero Card */}
        <section className="mb-8">
          <div className="bg-blue-600 rounded-[24px] p-8 shadow-md text-center relative overflow-hidden text-white">
            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 bg-blue-500/50 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-400/50">
                <CheckCircle2 size={14} className="text-blue-200" />
                SMS Confirmation Sent
              </span>
              
              <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-2">Complaint ID</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full">
                <div className="text-3xl sm:text-4xl font-black tracking-widest text-white">
                  JV-2026-001245
                </div>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white text-blue-700 hover:bg-slate-50'}`}
                >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>
              
              <p className="text-sm text-blue-200 font-medium flex items-center justify-center gap-2 max-w-sm mx-auto text-center leading-relaxed">
                <Info size={16} className="shrink-0 text-blue-300" /> Your Complaint ID has also been sent to your registered mobile number via SMS.
              </p>
            </div>
          </div>
        </section>

        {/* 3. AI Summary */}
        <section className="mb-8">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-6">AI Summary</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <AlertCircle size={20} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</p>
                  <p className="text-[15px] font-bold text-slate-900">Water Supply</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MapPin size={20} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location</p>
                  <p className="text-[15px] font-bold text-slate-900">Rampura</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <Activity size={20} className="text-orange-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-orange-600/70 tracking-wider">Priority</p>
                  <p className="text-[15px] font-bold text-orange-600">High</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-green-50/50 p-4 rounded-xl border border-green-100">
                <Percent size={20} className="text-green-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-green-600/70 tracking-wider">Confidence</p>
                  <p className="text-[15px] font-bold text-green-600">92%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <Languages size={20} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Language</p>
                  <p className="text-[15px] font-bold text-slate-900">English</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MessageSquare size={20} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nearby Complaints</p>
                  <p className="text-[15px] font-bold text-slate-900">3 Found</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Complaint Journey */}
        <section className="mb-8">
          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-8">Complaint Journey</h3>
            
            <div className="relative space-y-8">
              {/* Vertical line */}
              <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-slate-100"></div>
              
              {/* Active Stage */}
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                    <FilePlus2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-[15px] font-bold text-blue-700">Complaint Submitted</p>
                  <p className="text-[12px] font-bold text-blue-500 uppercase tracking-wider mt-1">Active Stage</p>
                </div>
              </div>

              {/* Inactive Stages */}
              <div className="relative flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                    <Search size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-[15px] font-bold text-slate-500">Under Review</p>
              </div>

              <div className="relative flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                    <BrainCircuit size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-[15px] font-bold text-slate-500">AI Recommended</p>
              </div>

              <div className="relative flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-[15px] font-bold text-slate-500">Approved</p>
              </div>

              <div className="relative flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                    <PlaySquare size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-[15px] font-bold text-slate-500">Work Started</p>
              </div>

              <div className="relative flex items-center gap-4 opacity-50">
                <div className="w-12 h-12 bg-white flex items-center justify-center z-10 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-slate-500" />
                  </div>
                </div>
                <p className="text-[15px] font-bold text-slate-500">Completed</p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. What Happens Next */}
        <section className="mb-10">
          <h3 className="text-sm font-bold text-slate-900 tracking-wide mb-4 px-2">What Happens Next</h3>
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Officials will review your complaint.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">AI will compare similar complaints nearby.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Department verification.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">SMS updates.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Track progress anytime.</p>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* 6. Bottom Action Buttons */}
      <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 p-4 pb-safe z-50">
        <div className="max-w-3xl mx-auto flex gap-3">
          <button 
            onClick={() => navigate('/citizen')}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} /> Return Home
          </button>
          
          <button 
            onClick={() => navigate('/track-complaint')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
          >
            Track My Complaint <ChevronRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ComplaintRegistered;
