import React from 'react';
import { Mic, Cpu, CheckCircle2, Hammer, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { icon: <Mic size={20}/>, title: "Citizen Voice", desc: "Citizen speaks or writes a complaint via app." },
    { icon: <Cpu size={20}/>, title: "AI Analysis", desc: "AI clusters and scores the issue dynamically." },
    { icon: <CheckCircle2 size={20}/>, title: "MP Decision", desc: "Data-driven approval of top priority projects." },
    { icon: <Hammer size={20}/>, title: "Development", desc: "Work begins with automated SMS updates." },
    { icon: <TrendingUp size={20}/>, title: "Public Impact", desc: "Results shown on public transparency dashboard." }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4">The Workflow</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">A seamless pipeline.</h3>
          <p className="text-xl text-slate-500 font-light">From the streets to the parliament, creating a transparent loop.</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start relative max-w-5xl mx-auto gap-12 md:gap-4">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-0"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/5 group">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-slate-400 mb-6 group-hover:border-blue-100 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                {step.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{step.title}</h4>
              <p className="text-sm text-slate-500 font-light leading-relaxed max-w-[150px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
