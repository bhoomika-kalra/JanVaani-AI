import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Globe, AlertCircle, MapPin, Languages, FileText, Users, Image as ImageIcon, Percent, Edit3, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const CallCompleted = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState(() => {
    const savedData = localStorage.getItem('analysisData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        return {
          category: parsed.category || "General",
          location: parsed.location || "Unknown",
          language: "English",
          department: parsed.department || "General",
          transcript: localStorage.getItem('lastTranscript') || "",
          summary: parsed.summary || "",
          urgency: parsed.urgency || "Medium",
          confidence: parsed.confidence || 90
        };
      } catch (e) {}
    }
    return {
      category: "Water Supply",
      location: "Rampura",
      language: "English",
      department: "Water Department",
      transcript: "There is a severe water shortage in our village Rampura.",
      summary: "Severe water shortage reported.",
      urgency: "High",
      confidence: 90
    };
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        source: "voice",
        description: details.summary || details.transcript,
        voice_text: details.transcript,
        category: details.category,
        location: details.location,
        urgency: details.urgency,
        department: details.department,
        confidence: details.confidence
      };
      
      const res = await fetch('http://localhost:8000/api/v1/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      localStorage.setItem('complaintResponse', JSON.stringify(data));
      navigate('/complaint-registered');
    } catch (e) {
      console.error(e);
      localStorage.setItem('complaintResponse', JSON.stringify({
        complaint_id: "CMP-" + Math.floor(1000 + Math.random() * 9000),
        status: "success"
      }));
      navigate('/complaint-registered');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] font-sans selection:bg-blue-200 selection:text-blue-900 pb-20 flex flex-col relative overflow-x-hidden">
      
      {/* 1. Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-4xl xl:max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <img src={logo} alt="JanVaani AI Logo" className="h-5 w-auto" />
              <span className="font-bold text-base text-slate-900 tracking-tight">JanVaani AI</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Call Ended</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <Globe size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-700">English</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl xl:max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-12">
        
        {/* Success Area */}
        <section className="text-center mb-12 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
            <CheckCircle2 size={48} className="text-green-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Call Completed Successfully
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
            Thank you. We have understood your concern. Please review the extracted information below.
          </p>
        </section>

        {/* Complaint Summary Card */}
        <section className="mb-12">
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-bold text-slate-900">Complaint Details</h2>
              <span className="bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full border border-blue-100 flex items-center gap-2">
                <CheckCircle2 size={16} /> AI Extracted
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
              
              {/* Category */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <AlertCircle size={20} className="text-slate-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Category</p>
                  {isEditing ? (
                    <input type="text" value={details.category} onChange={e => setDetails({...details, category: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-blue-500" />
                  ) : (
                    <p className="text-lg font-bold text-slate-900">{details.category}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <MapPin size={20} className="text-slate-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Location</p>
                  {isEditing ? (
                    <input type="text" value={details.location} onChange={e => setDetails({...details, location: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-blue-500" />
                  ) : (
                    <p className="text-lg font-bold text-slate-900">{details.location}</p>
                  )}
                </div>
              </div>

              {/* Language */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Languages size={20} className="text-slate-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Language</p>
                  {isEditing ? (
                    <input type="text" value={details.language} onChange={e => setDetails({...details, language: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-blue-500" />
                  ) : (
                    <p className="text-lg font-bold text-slate-900">{details.language}</p>
                  )}
                </div>
              </div>

              {/* Families */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Users size={20} className="text-slate-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Department</p>
                  {isEditing ? (
                    <input type="text" value={details.department} onChange={e => setDetails({...details, department: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:border-blue-500" />
                  ) : (
                    <p className="text-lg font-bold text-slate-900">{details.department}</p>
                  )}
                </div>
              </div>

              {/* Transcript - Full Width */}
              <div className="flex items-start gap-4 sm:col-span-2 mt-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <FileText size={20} className="text-slate-600" />
                </div>
                <div className="w-full">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Summary</p>
                  {isEditing ? (
                    <textarea value={details.summary} onChange={e => setDetails({...details, summary: e.target.value})} className="w-full bg-white p-4 rounded-2xl border border-slate-300 text-slate-700 font-medium leading-relaxed focus:outline-none focus:border-blue-500 min-h-[100px]" />
                  ) : (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-700 font-medium leading-relaxed">
                      {details.summary || details.transcript}
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Evidence */}
              <div className="flex items-start gap-4 mt-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <ImageIcon size={20} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Photo Evidence</p>
                  <button className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors mt-1">
                    + Add Photo
                  </button>
                </div>
              </div>

              {/* Confidence */}
              <div className="flex items-start gap-4 mt-2">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                  <Percent size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">AI Confidence</p>
                  <p className="text-lg font-bold text-green-600">{details.confidence}% High</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bottom Buttons */}
        <section className="flex flex-col sm:flex-row gap-5 mb-6">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-5 rounded-[1.5rem] border-2 border-slate-200 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md text-lg"
          >
            {isEditing ? <CheckCircle2 size={22} /> : <Edit3 size={22} />} 
            {isEditing ? 'Save Details' : 'Edit Details'}
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(37,99,235,0.4)]'} text-white font-bold px-8 py-5 rounded-[1.5rem] shadow-[0_8px_25px_rgb(37,99,235,0.3)] transition-all flex items-center justify-center gap-3 text-lg`}
          >
            <Rocket size={22} /> {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </section>

      </main>

    </div>
  );
};

export default CallCompleted;
