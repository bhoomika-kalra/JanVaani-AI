import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => (
  <section className="py-24 bg-slate-900 relative overflow-hidden w-full">
    {/* Abstract Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl rounded-full transform -rotate-12"></div>
      <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-gradient-to-bl from-green-500/10 to-transparent blur-3xl rounded-full"></div>
    </div>

    <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
        Let every citizen voice <br className="hidden md:block" /> become action.
      </h2>
      <p className="text-lg sm:text-xl text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
        Join us in building the future of data-driven constituency development. Transparent, efficient, and AI-powered.
      </p>
      <button className="bg-white hover:bg-slate-50 text-slate-900 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto duration-300 group">
        Start Reporting <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </section>
);

export default CTA;
