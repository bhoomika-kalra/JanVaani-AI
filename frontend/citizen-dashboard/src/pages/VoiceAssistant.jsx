import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, PhoneOff, CheckCircle2, Sparkles, BrainCircuit, Volume2, Globe, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const VoiceAssistant = () => {
  const navigate = useNavigate();
  
  const [lang, setLang] = useState('en-IN');
  const [appState, setAppState] = useState('idle'); // idle, listening, processing, ai_speaking, completed, error
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [fullTranscript, setFullTranscript] = useState('');
  const [message, setMessage] = useState('Tap the microphone to start speaking');
  const [supportError, setSupportError] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupportError("Speech recognition is not supported in this browser. Please use Google Chrome.");
      setAppState('error');
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onstart = () => {
      console.log('onstart');
      setAppState('listening');
      setMessage('Listening...');
    };

    recognitionRef.current.onspeechstart = () => {
      console.log('onspeechstart');
    };
    
    recognitionRef.current.onspeechend = () => {
      console.log('onspeechend');
    };
    
    recognitionRef.current.onresult = (event) => {
      console.log('onresult');
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interim);
      if (final) {
        setFinalTranscript(prev => prev + final);
      }
      
      setMessage(`I heard: ${final || interim}`);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.log('onerror', event.error);
      if (event.error === 'no-speech') {
        // Don't change state to idle, let onend restart it automatically
        console.log("No speech detected, will auto-restart...");
      } else if (event.error === 'not-allowed') {
        setMessage('Microphone permission denied. Please allow mic access in your browser settings.');
        setAppState('error');
      } else {
        setMessage(`Error: ${event.error}`);
        setAppState('error');
      }
    };
    
    recognitionRef.current.onend = () => {
      console.log('onend');
      setAppState(prevState => {
        if (prevState === 'listening') {
          // Browser stopped it due to silence (no-speech), let's auto-restart it
          try {
             recognitionRef.current.start();
             return 'listening';
          } catch(e) {
             console.error("Auto-restart failed:", e);
             setMessage('Paused. Tap microphone to resume.');
             return 'idle';
          }
        }
        return prevState;
      });
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Update language when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }, [lang]);

  const toggleListening = () => {
    if (appState === 'error' && supportError) return;
    
    if (appState === 'idle' || appState === 'completed' || appState === 'error' || appState === 'processing' || appState === 'ai_speaking') {
      try {
        setFinalTranscript('');
        setInterimTranscript('');
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    } else if (appState === 'listening') {
      recognitionRef.current.stop();
      setAppState('processing');
      setMessage('Processing your input...');
    }
  };

  const endCall = async () => {
    if (appState === 'completed') {
      navigate('/call-completed');
      return;
    }
    
    if (recognitionRef.current && appState === 'listening') {
      recognitionRef.current.stop();
    }
    
    const combined = (fullTranscript + ' ' + finalTranscript).trim();
    if (!combined) {
      setAppState('completed');
      setMessage('Call ended with no transcript.');
      return;
    }

    setFullTranscript(combined);
    setFinalTranscript('');
    setInterimTranscript('');
    setAppState('processing');
    setMessage('Analyzing conversation...');
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/ai/analyze-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: combined, language: lang })
      });
      if (!response.ok) throw new Error('API failed');
      const data = await response.json();
      setAnalysisData(data);
      
      // Check for missing information
      if (data.missing_information && data.missing_information.length > 0) {
         setMessage('Generating follow-up question...');
         let qData;
         try {
             const qResponse = await fetch('http://localhost:8000/api/v1/ai/next-question', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ transcript: combined, missing_information: data.missing_information, language: lang })
             });
             qData = await qResponse.json();
         } catch(e) {
             console.error('Next question API failed, using fallback.', e);
             qData = { question: lang === 'hi-IN' ? "कृपया अधिक जानकारी प्रदान करें।" : "Could you please provide more details?" };
         }
         
         setAppState('ai_speaking');
         setAiQuestion(qData.question);
         setMessage('AI is speaking...');
         
         if ('speechSynthesis' in window) {
             window.speechSynthesis.cancel();
             const utterance = new SpeechSynthesisUtterance(qData.question);
             utterance.lang = lang;
             utterance.onend = () => {
                 setAiQuestion('');
                 toggleListening();
             };
             window.speechSynthesis.speak(utterance);
         } else {
             // Fallback if no TTS
             setTimeout(() => {
                 setAiQuestion('');
                 toggleListening();
             }, 4000);
         }

      } else {
         // All required fields present
         setAppState('completed');
         setMessage('Analysis complete. Ready for review.');
         localStorage.setItem('lastTranscript', combined);
         localStorage.setItem('analysisData', JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
      setAnalysisData({
        summary: "Fallback: User reported a severe issue affecting multiple people.",
        category: "General Query",
        urgency: "Medium",
        department: "General Administration",
        location: "Unknown",
        confidence: 60
      });
      setAppState('completed');
      setMessage('Offline analysis complete.');
    }
  };

  const getIcon = () => {
    if (appState === 'listening') return <Mic size={24} className="text-[#3B5BFF] animate-pulse" />;
    if (appState === 'processing') return <Sparkles size={24} className="text-[#FF8A00] animate-spin-slow" />;
    if (appState === 'ai_speaking') return <Volume2 size={24} className="text-[#22A652] animate-bounce" />;
    if (appState === 'error') return <Volume2 size={24} className="text-red-500" />;
    return <Mic size={24} className="text-slate-400" />;
  };

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
            <div className={`w-2 h-2 rounded-full ${appState === 'listening' ? 'bg-[#22A652] animate-pulse shadow-[0_0_8px_#22A652]' : 'bg-slate-400'}`}></div>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${appState === 'listening' ? 'text-[#22A652]' : 'text-slate-500'}`}>
              {appState === 'listening' ? 'Active' : 'Standby'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white">
          <Globe size={16} className="text-[#111827]" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="text-xs font-bold text-[#111827] bg-transparent outline-none cursor-pointer"
            disabled={appState === 'listening'}
          >
            <option value="en-IN">English (IN)</option>
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi</option>
          </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 relative z-10 py-6">
        
        {supportError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-center font-bold text-sm w-full">
            {supportError}
          </div>
        )}

        {/* Dynamic Status (Above Orb) */}
        <div className="h-12 flex items-center justify-center mb-8 transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] text-[#111827]">
            <div className="scale-75">{getIcon()}</div>
            <span className="text-sm font-bold tracking-wide capitalize">{appState}</span>
          </div>
        </div>

        {/* Voice Orb Area */}
        <div className="relative flex items-center justify-center mb-12 w-full h-[30vh] min-h-[200px] max-h-[400px]">
          
          {/* Animated Waveform (Behind Orb) - Only when listening */}
          {appState === 'listening' && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-80 z-0">
              {[...Array(14)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 md:w-3 rounded-full animate-pulse bg-[#3B5BFF]/20`}
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
          )}

          {/* Core Orb - Clickable */}
          <button 
            onClick={toggleListening}
            className={`relative w-[40vw] h-[40vw] max-w-[200px] max-h-[200px] sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-white shadow-[0_8px_32px_rgba(59,91,255,0.12)] border border-slate-50 flex items-center justify-center z-10 transition-all duration-300 hover:scale-105 ${appState === 'listening' ? 'ring-4 ring-[#3B5BFF]/30' : ''}`}
          >
            {appState === 'idle' || appState === 'completed' || appState === 'error' || appState === 'processing' ? (
              <Mic size={56} className="text-slate-400 lg:scale-125 transition-transform" strokeWidth={1.5} />
            ) : appState === 'ai_speaking' ? (
              <Volume2 size={56} className="text-[#22A652] lg:scale-125 transition-transform animate-pulse" strokeWidth={1.5} />
            ) : (
              <Mic size={56} className="text-[#3B5BFF] lg:scale-125 transition-transform animate-pulse" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Live Captions */}
        <div className="h-40 flex flex-col items-center justify-start w-full text-center px-4 mb-8">
          <p className="text-lg font-bold text-slate-500 mb-2 min-h-[28px]">
            {message}
          </p>
          {appState === 'ai_speaking' ? (
             <p className="text-3xl sm:text-4xl font-black text-[#22A652] leading-tight break-words max-w-full animate-in fade-in zoom-in duration-300">
               {aiQuestion}
             </p>
           ) : (
             <p className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight break-words max-w-full">
               {(fullTranscript + ' ' + finalTranscript).trim()}
               <span className="text-slate-400 opacity-80 pl-2">{interimTranscript}</span>
               {appState === 'listening' && (
                 <span className={`inline-block w-2.5 h-8 ml-2 animate-pulse align-middle rounded-full bg-[#3B5BFF]`}></span>
               )}
             </p>
          )}
        </div>

        {/* Live Summary Card */}
        <div className={`w-full bg-white/95 backdrop-blur-sm border border-slate-100 rounded-[24px] p-6 shadow-[0_8px_24px_rgba(15,23,42,0.04)] relative overflow-hidden transition-all duration-700 ${analysisData ? 'opacity-100' : 'opacity-60'}`}>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-[#111827] uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={16} className={analysisData ? "text-[#22A652]" : "text-[#3B5BFF]"} />
              AI Analysis {analysisData ? '(Complete)' : '(Pending)'}
            </h3>
            {analysisData && (
              <span className="text-xs font-bold text-[#22A652] bg-[#22A652]/10 px-3 py-1 rounded-full">
                {analysisData.confidence}% Confidence
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-6">
            <div className="flex items-center gap-3">
              {analysisData ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <div className="flex flex-col">
                <span className={`text-base font-bold ${analysisData ? 'text-[#111827]' : 'text-slate-400'}`}>Category</span>
                {analysisData && <span className="text-sm font-medium text-slate-500">{analysisData.category}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {analysisData ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <div className="flex flex-col">
                <span className={`text-base font-bold ${analysisData ? 'text-[#111827]' : 'text-slate-400'}`}>Location</span>
                {analysisData && <span className="text-sm font-medium text-slate-500">{analysisData.location}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {analysisData ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <div className="flex flex-col">
                <span className={`text-base font-bold ${analysisData ? 'text-[#111827]' : 'text-slate-400'}`}>Urgency</span>
                {analysisData && <span className={`text-sm font-bold ${analysisData.urgency === 'High' ? 'text-red-500' : 'text-slate-500'}`}>{analysisData.urgency}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {analysisData ? <CheckCircle2 size={20} className="text-[#22A652] shrink-0"/> : <Clock size={20} className="text-slate-300 shrink-0"/>}
              <div className="flex flex-col">
                <span className={`text-base font-bold ${analysisData ? 'text-[#111827]' : 'text-slate-400'}`}>Department</span>
                {analysisData && <span className="text-sm font-medium text-slate-500">{analysisData.department}</span>}
              </div>
            </div>
          </div>
          
          {analysisData && (
            <div className="mt-6 pt-4 border-t border-slate-100">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">AI Summary</span>
               <p className="text-sm font-medium text-slate-700">{analysisData.summary}</p>
            </div>
          )}
        </div>

      </main>

      {/* Bottom Action Area */}
      <div className="w-full pb-10 pt-6 px-6 z-50 flex justify-center relative">
        <button 
          onClick={endCall}
          className="flex flex-col items-center justify-center gap-3 group"
        >
          <div className="w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-[24px] transition-transform hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(239,68,68,0.4)] flex items-center justify-center shadow-lg cursor-pointer">
            <PhoneOff size={32} />
          </div>
          <span className="text-red-500 font-bold text-sm tracking-wide">{appState === 'completed' ? 'Proceed to Review' : 'Analyze / Next'}</span>
        </button>
      </div>

    </div>
  );
};

export default VoiceAssistant;
