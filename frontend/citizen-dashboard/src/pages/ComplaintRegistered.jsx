import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Globe, Copy, AlertCircle, MapPin, Percent, Info, Search, Home, ChevronRight, MessageSquare, ClipboardCheck, Bell, Activity, BrainCircuit, Languages, FilePlus2, PlaySquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComplaintRegistered = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] font-sans selection:bg-blue-200 selection:text-blue-900 pb-28 flex flex-col relative overflow-x-hidden">
      
      {/* 1. Top Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-3xl lg:max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/call-completed')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="font-bold text-base text-slate-900 tracking-tight">JanVaani AI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 size={10} className="text-green-500" />
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Complaint Registered</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Globe size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-700">हिन्दी</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-6 md:px-12 pt-10">
        
        {/* 1. Success Header */}
        <section className="text-center mb-10 flex flex-col items-center animate-[fadeIn_0.8s_ease-out]">
          <div className="relative mb-5">
            <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-20"></div>
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] border border-green-100 relative z-10">
              <CheckCircle2 size={40} className="text-green-500" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            शिकायत सफलतापूर्वक दर्ज हो गई
          </h1>
          <p className="text-base text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
            धन्यवाद। आपकी शिकायत जनवाणी AI द्वारा दर्ज कर ली गई है और जल्द ही समीक्षा की जाएगी।
          </p>
        </section>

        {/* 2. Complaint ID Hero Card */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 sm:p-10 shadow-[0_12px_40px_rgb(37,99,235,0.2)] text-center relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
                <CheckCircle2 size={14} className="text-green-300" />
                SMS Confirmation Sent
              </span>
              
              <p className="text-blue-100 font-medium uppercase tracking-widest text-sm mb-3 opacity-80">Complaint ID</p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full">
                <div className="text-3xl sm:text-4xl font-black tracking-widest text-white drop-shadow-md">
                  JV-2026-001245
                </div>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${copied ? 'bg-green-500 text-white' : 'bg-white text-blue-700 hover:bg-slate-50 hover:scale-105'}`}
                >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied' : 'Copy ID'}
                </button>
              </div>
              
              <p className="text-sm text-blue-100/90 font-medium flex items-center justify-center gap-2 max-w-sm mx-auto text-center leading-relaxed">
                <Info size={18} className="shrink-0" /> Your Complaint ID has also been sent to your registered mobile number via SMS.
              </p>
            </div>
          </div>
        </section>

        {/* 3. AI Summary (Compact) */}
        <section className="mb-8">
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-5">AI Summary</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <AlertCircle size={22} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Category</p>
                  <p className="text-sm font-bold text-slate-900">जल आपूर्ति</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <MapPin size={22} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Location</p>
                  <p className="text-sm font-bold text-slate-900">रामपुरा</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <Activity size={22} className="text-red-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Priority</p>
                  <p className="text-sm font-bold text-red-600">High</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <Percent size={22} className="text-green-500" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Confidence</p>
                  <p className="text-sm font-bold text-green-600">92%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <Languages size={22} className="text-blue-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Language</p>
                  <p className="text-sm font-bold text-slate-900">हिन्दी (Hindi)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <MessageSquare size={22} className="text-orange-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Nearby Complaints</p>
                  <p className="text-sm font-bold text-slate-900">3 Found</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Complaint Journey (Modern Vertical Timeline with Icons) */}
        <section className="mb-8">
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Complaint Journey</h3>
            
            <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[35px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
              
              {/* Active Stage */}
              <div className="relative flex items-center gap-6 group">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center shadow-md z-10">
                  <FilePlus2 size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-700">Complaint Submitted</p>
                  <p className="text-xs font-semibold text-blue-600/70 mt-0.5">Active Stage</p>
                </div>
              </div>

              {/* Inactive Stages */}
              <div className="relative flex items-center gap-6 opacity-40 grayscale">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <Search size={16} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-600">Under Review</p>
              </div>

              <div className="relative flex items-center gap-6 opacity-40 grayscale">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <BrainCircuit size={16} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-600">AI Recommended</p>
              </div>

              <div className="relative flex items-center gap-6 opacity-40 grayscale">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <CheckCircle2 size={16} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-600">Approved</p>
              </div>

              <div className="relative flex items-center gap-6 opacity-40 grayscale">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <PlaySquare size={16} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-600">Work Started</p>
              </div>

              <div className="relative flex items-center gap-6 opacity-40 grayscale">
                <div className="absolute -left-10 w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center z-10">
                  <CheckCircle2 size={16} className="text-slate-500" />
                </div>
                <p className="text-sm font-bold text-slate-600">Completed</p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. What Happens Next (Clean Checklist) */}
        <section className="mb-10">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">What Happens Next</h3>
          <div className="bg-slate-50 rounded-[1.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm">
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Officials will review your complaint.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">AI will compare similar complaints nearby.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Department verification.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">SMS updates.</p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 shadow-sm"><CheckCircle2 size={14} strokeWidth={3} /></div>
                <p className="text-sm font-semibold text-slate-700">Track progress anytime.</p>
              </li>
            </ul>
          </div>
        </section>

      </main>

      {/* 6. Bottom Action Buttons (Sticky) */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/60 p-4 pb-safe z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/citizen')}
            className="flex-1 order-2 sm:order-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2 shadow-sm h-14"
          >
            <Home size={20} /> Return Home
          </button>
          
          <button 
            onClick={() => navigate('/track-complaint')}
            className="flex-1 order-1 sm:order-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-[0_8px_25px_rgb(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 h-14"
          >
            Track My Complaint <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ComplaintRegistered;
