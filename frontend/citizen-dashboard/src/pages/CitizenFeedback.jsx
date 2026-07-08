import React, { useState } from 'react';
import { ArrowLeft, Upload, Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';

const CitizenFeedback = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [complaintId, setComplaintId] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    // In a real app, we would POST to /api/v1/feedback here
    setStep(2); // Success state
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col relative pb-[120px]">
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
          <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
            <MessageSquare size={10} /> Feedback
          </span>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {step === 1 ? (
          <section className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-slate-200">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Share Feedback</h1>
            <p className="text-sm font-medium text-slate-500 mb-8">Tell us whether the completed work actually solved your issue.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Select Completed Complaint</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold outline-none focus:border-blue-500 transition-colors"
                  value={complaintId}
                  onChange={e => setComplaintId(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="JV-2026-000892">Potholes on Link Road (Resolved)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">Was your issue resolved?</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {['Yes, resolved', 'Partially resolved', 'Not resolved'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setSatisfaction(opt)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${satisfaction === opt ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {satisfaction === 'Not resolved' && (
                  <p className="mt-3 text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg inline-block border border-red-100">
                    This complaint will be flagged for verification by the MP's office.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Rate the service</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                      <Star size={32} className={`transition-colors ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Comment</label>
                <textarea 
                  placeholder="Tell us what happened..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Upload Photo Proof (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-3">
                    <Upload size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">Tap to upload a photo</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!complaintId || !satisfaction || !rating}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-[24px] p-10 shadow-sm border border-slate-200 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100 mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">Thank you for your feedback!</h2>
            <p className="text-slate-500 font-medium mb-8">Your response will help improve public services.</p>
            <button onClick={() => navigate('/citizen')} className="bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-colors hover:bg-slate-800">
              Return to Dashboard
            </button>
          </section>
        )}

      </main>
    </div>
  );
};

export default CitizenFeedback;
