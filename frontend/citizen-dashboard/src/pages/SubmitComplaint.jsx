import React, { useState } from 'react';
import { ArrowLeft, MapPin, Mic, BrainCircuit, ThumbsUp, Camera, Video, X, Play, Square, Crosshair, ArrowRight, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ["Road", "Water", "Electricity", "Healthcare", "Education", "Sanitation", "Environment", "Other"];

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Water");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
    }
  };

  const handleSubmit = () => {
    navigate('/complaint-registered');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative pb-32">
      
      {/* Header */}
      <header className="bg-white/90 sticky top-0 z-50 pt-4 pb-3 px-4 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/citizen')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 tracking-tight leading-tight text-lg">New Complaint</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Category Selection */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">1. Select Category</h2>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-blue-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Complaint Description */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">2. Describe the Issue</h2>
          <div className="bg-white rounded-3xl p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., The main water pipeline has been leaking for 3 days..."
              className="w-full h-32 bg-transparent p-5 rounded-[1.3rem] outline-none text-slate-800 resize-none placeholder:text-slate-400"
            />
          </div>
        </section>

        {/* Voice Recording */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">Or Record Audio</h2>
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col items-center">
            
            {!hasRecorded ? (
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleRecord}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
                >
                  {isRecording ? <Square size={28} /> : <Mic size={32} />}
                </button>
                <p className={`mt-4 text-sm font-bold ${isRecording ? 'text-red-500' : 'text-slate-500'}`}>
                  {isRecording ? 'Recording (00:12)... Tap to Stop' : 'Tap to Record Voice'}
                </p>
              </div>
            ) : (
              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shrink-0">
                  <Play size={20} className="ml-1" />
                </button>
                <div className="flex-1">
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-blue-500 w-0"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>00:00</span>
                    <span>00:45</span>
                  </div>
                </div>
                <button onClick={() => setHasRecorded(false)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors shrink-0">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Media Upload */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">3. Attach Evidence</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded-md">Optional</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-blue-50/50 hover:bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl h-32 flex flex-col items-center justify-center gap-2 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera size={24} />
              </div>
              <span className="text-sm font-bold text-blue-700">Add Photos</span>
            </button>
            <button className="bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl h-32 flex flex-col items-center justify-center gap-2 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video size={24} />
              </div>
              <span className="text-sm font-bold text-slate-600">Add Video</span>
            </button>
          </div>
        </section>

        {/* Location */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">4. Exact Location</h2>
          <div className="bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-blue-400 transition-colors">
              <MapPin size={20} className="text-slate-400 mr-3 shrink-0" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search or enter area manually"
                className="w-full bg-transparent outline-none text-slate-800 text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
              <Crosshair size={18} /> Use GPS
            </button>
          </div>
        </section>

        {/* AI Insight Card */}
        <section className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm mt-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-bl-full pointer-events-none -mt-4 -mr-4"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-indigo-600">
              <BrainCircuit size={20} />
            </div>
            <h3 className="text-lg font-extrabold text-indigo-950 tracking-tight">AI Summary</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Category</span>
              <span className="text-sm font-bold text-indigo-950">{selectedCategory}</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Language</span>
              <span className="text-sm font-bold text-indigo-950">Hindi / English</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Priority</span>
              <span className="text-sm font-bold text-red-600">High</span>
            </div>
          </div>
        </section>
        
      </main>

      {/* Fixed Bottom Submit Bar */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 p-4 pb-safe z-50">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex">
          <button 
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold h-16 rounded-2xl shadow-[0_8px_20px_rgb(37,99,235,0.25)] transition-all flex items-center justify-center gap-2 text-lg"
          >
            Submit Complaint <ArrowRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SubmitComplaint;
