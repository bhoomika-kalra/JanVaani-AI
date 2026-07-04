import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, PhoneOff, CheckCircle2, Sparkles, BrainCircuit, Volume2, Globe, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

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
      stateTitle: "Listening...",
      icon: <Mic size={24} className="text-[#3B5BFF] animate-pulse" />,
      speaker: "citizen",
      fullText: "There is a severe water shortage in our village Rampura.",
      delay: 3500,
      progress: 20,
      summary: { lang: true, cat: false, loc: false, fam: false, photo: false, conf: false }
    },
    {
      stateTitle: "Understanding...",
      icon: <Sparkles size={24} className="text-[#FF8A00] animate-spin-slow" />,
      speaker: "system",
      fullText: "",
      delay: 2500,
      progress: 40,
      summary: { lang: true, cat: true, loc: false, fam: false, photo: false, conf: false }
    },
    {
      stateTitle: "Extracting information...",
      icon: <BrainCircuit size={24} className="text-[#3B5BFF] animate-pulse" />,
      speaker: "system",
      fullText: "",
      delay: 2500,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "Responding...",
      icon: <Volume2 size={24} className="text-[#22A652] animate-bounce" />,
      speaker: "ai",
      fullText: "I have understood your problem. How many families are affected?",
      delay: 4500,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "Listening...",
      icon: <Mic size={24} className="text-[#3B5BFF] animate-pulse" />,
      speaker: "citizen",
      fullText: "Around 50 families.",
      delay: 3000,
      progress: 60,
      summary: { lang: true, cat: true, loc: true, fam: false, photo: false, conf: true }
    },
    {
      stateTitle: "Understanding...",
      icon: <Sparkles size={24} className="text-[#FF8A00] animate-spin-slow" />,
      speaker: "system",
      fullText: "",
      delay: 2000,
      progress: 80,
      summary: { lang: true, cat: true, loc: true, fam: true, photo: false, conf: true }
    },
    {
      stateTitle: "Responding...",
      icon: <Volume2 size={24} className="text-[#22A652] animate-bounce" />,
      speaker: "ai",
      fullText: "Thank you. You may end the call and upload a photo if you wish.",
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
    <div className="min-h-[100dvh] bg-white font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col relative overflow-x-hidden">

      {/* 1. Top App Bar */}
      <header className="w-full pt-4 pb-2 px-6 z-50 flex items-center justify-between relative">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 text-[#111827] hover:bg-white transition-colors backdrop-blur-md shadow-sm border border-white"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="JanVaani AI Logo" className="h-5 w-auto" />
            <span className="font-black text-lg text-[#111827] tracking-tight">JanVaani AI</span>
          </div>
          <div className="flex items-center gap-2 mt-1 bg-white/80 px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-white">
            <div className="w-2 h-2 rounded-full bg-[#22A652] animate-pulse shadow-[0_0_8px_#22A652]"></div>
            <span className="text-[11px] text-[#22A652] font-bold uppercase tracking-widest">Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white">
          <Globe size={16} className="text-[#111827]" />
          <span className="text-xs font-bold text-[#111827]">English</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative z-10 py-6">
        
        {/* Dynamic Status (Above Orb) */}
        <div className="h-12 flex items-center justify-center mb-8 transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-[#111827]">
            <div className="scale-75">{current.icon}</div>
            <span className="text-sm font-bold tracking-wide">{current.stateTitle}</span>
          </div>
        </div>

        {/* Voice Orb Area */}
        <div className="relative flex items-center justify-center mb-12 w-full h-[30vh] min-h-[200px] max-h-[400px]">
          
          {/* Animated Waveform (Behind Orb) */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-80 z-0">
            {[...Array(14)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 md:w-3 rounded-full animate-pulse ${current.speaker === 'ai' ? 'bg-[#22A652]/20' : 'bg-[#3B5BFF]/20'}`}
                style={{
                  height: `${Math.max(30, Math.random() * 120)}%`,
                  animationDuration: `${0.4 + Math.random()}s`,
                  animationDelay: `${Math.random()}s`,
                  animationIterationCount: 'infinite',
                  animationDirection: 'alternate'
                }}
              ></div>
            ))}
          </div>

          {/* Core Orb */}
          <div className="relative w-[40vw] h-[40vw] max-w-[200px] max-h-[200px] sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white shadow-[0_8px_32px_rgba(59,91,255,0.12)] border border-slate-50 flex items-center justify-center z-10 transition-all duration-1000">
            <Mic size={56} className="text-[#3B5BFF] lg:scale-125 transition-transform" strokeWidth={1.5} />
          </div>
        </div>

        {/* Live Captions */}
        <div className="h-32 flex flex-col items-center justify-start w-full text-center px-4 mb-8">
          <p className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight">
            {captionText || ""}
            {(current.speaker === 'ai' || current.speaker === 'citizen') ? (
              <span className={`inline-block w-2.5 h-8 ml-2 animate-pulse align-middle rounded-full ${current.speaker === 'ai' ? 'bg-[#22A652]' : 'bg-[#3B5BFF]'}`}></span>
            ) : null}
          </p>
        </div>

        {/* Live Summary Card */}
        <div className="w-full bg-white/95 backdrop-blur-sm border border-white/80 rounded-[24px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] relative overflow-hidden transition-all duration-700">
          
          {/* Top Title & Progress */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={16} className="text-[#3B5BFF]" />
              Live Summary
            </h3>
            <span className="text-sm font-bold text-[#3B5BFF] bg-[#3B5BFF]/10 px-3 py-1 rounded-full">
              {current.progress}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3B5BFF] to-[#22A652] transition-all duration-1000 ease-out"
              style={{ width: `${current.progress}%` }}
            ></div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            
            <div className="flex items-center gap-3">
              {current.summary.lang ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <span className={`text-base font-bold ${current.summary.lang ? 'text-[#111827]' : 'text-slate-400'}`}>Language</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.cat ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <span className={`text-base font-bold ${current.summary.cat ? 'text-[#111827]' : 'text-slate-400'}`}>Category</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.loc ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <span className={`text-base font-bold ${current.summary.loc ? 'text-[#111827]' : 'text-slate-400'}`}>Location</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.fam ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0 animate-pulse"/>}
              <span className={`text-base font-bold ${current.summary.fam ? 'text-[#111827]' : 'text-slate-400'}`}>Families Affected</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.conf ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0 animate-pulse"/>}
              <span className={`text-base font-bold ${current.summary.conf ? 'text-[#111827]' : 'text-slate-400'}`}>AI Confidence</span>
            </div>

            <div className="flex items-center gap-3">
              {current.summary.photo ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0 animate-pulse"/>}
              <span className={`text-base font-bold ${current.summary.photo ? 'text-[#111827]' : 'text-slate-400'}`}>Photo Proof</span>
            </div>

          </div>
        </div>

      </main>

      {/* Bottom Action Area (Only ONE action) */}
      <div className="w-full pb-10 pt-6 px-6 z-50 flex justify-center relative">
        <button 
          onClick={() => navigate('/call-completed')}
          className="flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-[24px] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(239,68,68,0.4)] flex items-center justify-center shadow-lg cursor-pointer">
            <PhoneOff size={32} />
          </div>
          <span className="text-red-500 font-bold text-sm tracking-wide">End Call</span>
        </button>
      </div>

    </div>
  );
};

export default VoiceAssistant;
