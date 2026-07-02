import React from 'react';
import { MessageSquare, AlertCircle, TrendingUp } from 'lucide-react';

const ProblemSection = () => (
  <section className="py-24 bg-slate-50 w-full">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">The Challenge</h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Overwhelming data, <br className="hidden md:block" />
          unclear priorities.
        </h3>
        <p className="text-xl text-slate-500 leading-relaxed font-light">
          Governments struggle to identify which development work should be prioritized first due to overwhelming and unstructured data scattered across platforms.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 duration-300 flex flex-col h-full">
          <div className="bg-red-50/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-red-100 shrink-0">
            <MessageSquare className="text-red-500" size={24} strokeWidth={2} />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Scattered Complaints</h4>
          <p className="text-slate-500 leading-relaxed font-light text-lg flex-grow">
            Requests arrive via letters, WhatsApp, grievance portals, and meetings, making comprehensive tracking nearly impossible.
          </p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 duration-300 flex flex-col h-full">
          <div className="bg-orange-50/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-orange-100 shrink-0">
            <AlertCircle className="text-orange-500" size={24} strokeWidth={2} />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Duplicate Requests</h4>
          <p className="text-slate-500 leading-relaxed font-light text-lg flex-grow">
            Hundreds of citizens report the exact same broken road, creating unmanageable noise instead of actionable data.
          </p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 duration-300 flex flex-col h-full">
          <div className="bg-yellow-50/80 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-yellow-100 shrink-0">
            <TrendingUp className="text-yellow-600" size={24} strokeWidth={2} />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Unclear Priorities</h4>
          <p className="text-slate-500 leading-relaxed font-light text-lg flex-grow">
            Without automated analytics, it's difficult for MPs to decide which project will create the highest social impact.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
