import React from 'react';
import { Mic, TrendingUp, Map, ShieldCheck, MessageSquare, BarChart3 } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Mic className="text-blue-600" size={24} strokeWidth={2.5} />,
      title: "Speak to JanVaani AI",
      desc: "Designed for all literacy levels. Tap the mic, speak naturally, and let the AI register the complaint with precision."
    },
    {
      icon: <TrendingUp className="text-orange-500" size={24} strokeWidth={2.5} />,
      title: "AI Priority Score",
      desc: "Issues are scored dynamically based on severity, population affected, and verified community support."
    },
    {
      icon: <Map className="text-green-600" size={24} strokeWidth={2.5} />,
      title: "Demand Hotspot Mapping",
      desc: "Visualize constituency needs on an interactive geospatial map to spot emerging infrastructure crises early."
    },
    {
      icon: <ShieldCheck className="text-indigo-600" size={24} strokeWidth={2.5} />,
      title: "Public Transparency",
      desc: "Complete public accountability with Before & After photos showing how citizen feedback drove real change."
    },
    {
      icon: <MessageSquare className="text-sky-600" size={24} strokeWidth={2.5} />,
      title: "Smart SMS Updates",
      desc: "Citizens receive automated, native-language SMS updates as their complaint moves through the government system."
    },
    {
      icon: <BarChart3 className="text-amber-500" size={24} strokeWidth={2.5} />,
      title: "AI Explainability Panel",
      desc: "Every AI recommendation includes transparent reasoning so government officials can fully trust the system."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 border-t border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything needed for impact.</h3>
          <p className="text-xl text-slate-500 font-light leading-relaxed">A complete suite of tools designed to turn unorganized citizen feedback into measurable public development.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] transition-all duration-500 group flex flex-col h-full">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50/50 transition-all duration-300 border border-slate-100/50 shrink-0">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">{feature.title}</h4>
              <p className="text-slate-500 font-light leading-relaxed text-base flex-grow">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
