import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, PhoneOff, CheckCircle2, Sparkles, BrainCircuit, Volume2, Globe, Clock, Percent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [captionText, setCaptionText] = useState("");

  const typeText = (fullText, delay = 100) => {
    setCaptionText("");
    if (!fullText) return null;
    const words = fullText.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      if (i < words.length) {
        setCaptionText(prev => prev + (i === 0 ? "" : " ") + (words[i] || ""));
        i++;
      } else {
        clearInterval(interval);
      }
    }, delay);
    return interval;
  };

  const cycle = [
    {
      stateTitle: "सुन रहा हूँ...",
      icon: <Mic size={24} className="text-blue-400 animate-pulse" />,
      speaker: "citizen",
      fullText: "हमारे गाँव रामपुरा में पानी की बहुत कमी है।",
      delay: 3500,
      progress: 20,
      summary: { lang: true, cat: false, loc: false, fam: false, photo: false, conf: false }
    },
    {
      stateTitle: "समझ रहा हूँ...",
      icon: <Sparkles size={24} className="text-indigo-400 animate-spin-slow" />,
      speaker: "system",
      fullText: "",
      delay: 2500,
      progress: 40,
      summary: { lang: true, cat: true, loc: false, fam: false, photo: false, conf: false }
    },
    {
      stateTitle: "जानकारी निकाल रहा हूँ...",
      icon: <BrainCircuit size={24} className="text-purple-400 animate-pulse" />,
      speaker: "system",
      fullText: "",
      delay: 2500,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "उत्तर दे रहा हूँ...",
      icon: <Volume2 size={24} className="text-green-400 animate-bounce" />,
      speaker: "ai",
      fullText: "मैंने आपकी समस्या समझ ली है। कितने परिवार प्रभावित हैं?",
      delay: 4500,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "सुन रहा हूँ...",
      icon: <Mic size={24} className="text-blue-400 animate-pulse" />,
      speaker: "citizen",
      fullText: "करीब 50 परिवार।",
      delay: 3000,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "समझ रहा हूँ...",
      icon: <Sparkles size={24} className="text-indigo-400 animate-spin-slow" />,
      speaker: "system",
      fullText: "",
      delay: 2000,
      progress: 80,
      summary: { lang: true, cat: true, loc: true, fam: true, photo: false, conf: true }
    },
    {
      stateTitle: "उत्तर दे रहा हूँ...",
      icon: <Volume2 size={24} className="text-green-400 animate-bounce" />,
      speaker: "ai",
      fullText: "धन्यवाद। आप चाहें तो कॉल समाप्त करके फोटो अपलोड कर सकते हैं।",
      delay: 5000,
      progress: 80,
      summary: { lang: true, cat: true, loc: true, fam: true, photo: false, conf: true }
    }
  ];

  useEffect(() => {
    let intervalId;
    
    if (phase < cycle.length) {
      const current = cycle[phase];
      
      if (current.fullText) {
        intervalId = typeText(current.fullText, current.speaker === 'citizen' ? 200 : 150);
      } else {
        setCaptionText("");
      }

      const timer = setTimeout(() => {
        if (phase < cycle.length - 1) {
          setPhase(prev => prev + 1);
        } else {
          navigate('/call-completed');
        }
      }, current.delay);
      
      return () => {
        clearTimeout(timer);
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [phase]);

  const current = cycle[phase];

  return (
    <div className="min-h-[100dvh] bg-[#0B1120] font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/40 via-[#0B1120] to-[#0B1120] pointer-events-none"></div>

      {/* 1. Top App Bar */}
      <header className="w-full pt-4 pb-2 px-6 z-50 flex items-center justify-between">
        <button 
          onClick={() => navigate('/citizen')}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-bold text-lg text-white tracking-tight">JanVaani AI</span>
          <div className="flex items-center gap-2 mt-1 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-[11px] text-green-400 font-bold uppercase tracking-widest">Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <Globe size={16} className="text-slate-300" />
          <span className="text-xs font-bold text-slate-200">हिन्दी (Hindi)</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative z-10 py-6">
        
        {/* Dynamic Status (Above Orb) */}
        <div className="h-12 flex items-center justify-center mb-8 transition-opacity duration-300">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg text-white">
            {current.icon}
            <span className="text-base font-medium tracking-wide">{current.stateTitle}</span>
          </div>
        </div>

        {/* Voice Orb Area */}
        <div className="relative flex items-center justify-center mb-12 w-full h-[30vh] min-h-[200px] max-h-[400px]">
          
          {/* Animated Waveform (Behind Orb) */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-30 z-0">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 md:w-3 rounded-full animate-pulse ${current.speaker === 'ai' ? 'bg-green-400' : 'bg-blue-400'}`}
                style={{
                  height: `${Math.max(20, Math.random() * 100)}%`,
                  animationDuration: `${0.4 + Math.random()}s`,
                  animationDelay: `${Math.random()}s`,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate'
                }}
              ></div>
            ))}
          </div>

          {/* Animated Ripple Circles */}
          <div className={`absolute inset-[-10%] rounded-full transition-all duration-1000 ${current.speaker === 'ai' ? 'bg-green-500/20 scale-125 animate-pulse' : current.speaker === 'citizen' ? 'bg-blue-500/20 scale-[1.35] animate-ping' : 'bg-white/5 scale-100'}`} style={{ animationDuration: '2.5s' }}></div>
          <div className={`absolute inset-[5%] rounded-full transition-all duration-1000 ${current.speaker === 'ai' ? 'bg-green-400/30 scale-110 animate-pulse' : current.speaker === 'citizen' ? 'bg-blue-400/30 scale-110 animate-ping' : 'bg-white/10 scale-100'}`} style={{ animationDuration: '1.5s', animationDelay: '0.2s' }}></div>
          
          {/* Core Orb */}
          <div className={`relative w-[40vw] h-[40vw] max-w-[240px] max-h-[240px] sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full shadow-[0_0_80px_rgba(0,0,0,0.6)] flex items-center justify-center z-10 transition-colors duration-1000 ${current.speaker === 'ai' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400 to-emerald-600' : current.speaker === 'citizen' ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-indigo-600' : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-500 to-slate-700'}`}>
            <Mic size={56} className="text-white lg:scale-125 transition-transform" strokeWidth={1.5} />
          </div>
        </div>

        {/* Live Captions */}
        <div className="h-32 flex flex-col items-center justify-start w-full text-center px-4 mb-8">
          <p className="text-3xl sm:text-4xl font-medium text-white leading-tight">
            {captionText || ""}
            {(current.speaker === 'ai' || current.speaker === 'citizen') ? (
              <span className="inline-block w-2.5 h-8 bg-white/60 ml-2 animate-pulse align-middle rounded-full"></span>
            ) : null}
          </p>
        </div>

        {/* Live Summary Card */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-all duration-700">
          
          {/* Top Title & Progress */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={16} className="text-blue-400" />
              लाइव सारांश (Live Summary)
            </h3>
            <span className="text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-full">
              {current.progress}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-1000 ease-out"
              style={{ width: `${current.progress}%` }}
            ></div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            
            <div className="flex items-center gap-3">
              {current.summary.lang ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0"/>}
              <span className={`text-base font-semibold ${current.summary.lang ? 'text-white' : 'text-slate-400'}`}>भाषा</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.cat ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0"/>}
              <span className={`text-base font-semibold ${current.summary.cat ? 'text-white' : 'text-slate-400'}`}>समस्या श्रेणी</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.loc ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0"/>}
              <span className={`text-base font-semibold ${current.summary.loc ? 'text-white' : 'text-slate-400'}`}>प्रभावित क्षेत्र</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.fam ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0 animate-pulse"/>}
              <span className={`text-base font-semibold ${current.summary.fam ? 'text-white' : 'text-slate-400'}`}>प्रभावित परिवार</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.conf ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0 animate-pulse"/>}
              <span className={`text-base font-semibold ${current.summary.conf ? 'text-white' : 'text-slate-400'}`}>AI Confidence</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.photo ? <CheckCircle2 size={20} className="text-green-400 shrink-0"/> : <Clock size={20} className="text-slate-500 shrink-0 animate-pulse"/>}
              <span className={`text-base font-semibold ${current.summary.photo ? 'text-white' : 'text-slate-400'}`}>फोटो प्रमाण</span>
            </div>

          </div>
        </div>

      </main>

      {/* Bottom Action Area (Only ONE action) */}
      <div className="w-full pb-10 pt-6 px-6 z-50 flex justify-center bg-gradient-to-t from-[#0B1120] to-transparent">
        <button 
          onClick={() => navigate('/call-completed')}
          className="flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full transition-transform hover:scale-105 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
            <PhoneOff size={32} />
          </div>
          <span className="text-red-400 font-bold text-sm tracking-wide">कॉल समाप्त करें</span>
        </button>
      </div>

    </div>
  );
};

export default VoiceAssistant;
