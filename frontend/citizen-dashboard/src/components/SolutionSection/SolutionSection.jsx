import React from 'react';
import { Mic, BarChart3, Map, ShieldCheck, Zap } from 'lucide-react';

const SolutionSection = () => (
  <section className="py-24 bg-white relative overflow-hidden w-full">
    <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Content */}
        <div className="lg:w-1/2 w-full">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold mb-6">
            <Zap size={16} className="fill-blue-600" />
            <span>Intelligent Core</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            The AI-Powered <br className="hidden sm:block"/> Decision Engine
          </h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light">
            JanVaani AI isn't just a grievance portal. It's an intelligent decision support system that listens, understands, and recommends the highest-impact development projects.
          </p>
          
          <ul className="space-y-8">
            <li className="flex items-start group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-green-50/80 rounded-2xl flex items-center justify-center border border-green-100 group-hover:scale-110 group-hover:bg-green-100 transition-all duration-300">
                  <Mic size={20} className="text-green-600" />
                </div>
              </div>
              <div className="ml-5">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Multi-Modal Input</h4>
                <p className="text-slate-500 font-light leading-relaxed text-base sm:text-lg">Citizens can report issues simply by speaking naturally, sending text, or uploading photos and videos.</p>
              </div>
            </li>
            <li className="flex items-start group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-blue-50/80 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                  <BarChart3 size={20} className="text-blue-600" />
                </div>
              </div>
              <div className="ml-5">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Intelligent Analysis</h4>
                <p className="text-slate-500 font-light leading-relaxed text-base sm:text-lg">Our AI automatically categorizes complaints, detects duplicates, clusters issues, and scores them.</p>
              </div>
            </li>
            <li className="flex items-start group">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-orange-50/80 rounded-2xl flex items-center justify-center border border-orange-100 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
                  <Map size={20} className="text-orange-500" />
                </div>
              </div>
              <div className="ml-5">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Data-Driven Development</h4>
                <p className="text-slate-500 font-light leading-relaxed text-base sm:text-lg">MPs receive mapped hotspots and ranked recommendations to allocate funds where they matter most.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Right Content - Visual Mockup */}
        <div className="lg:w-1/2 w-full relative mt-12 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-transparent blur-3xl -z-10 rounded-full scale-110"></div>
          
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 relative hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-shadow duration-500 w-full max-w-lg mx-auto lg:max-w-none">
            {/* Tag */}
            <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-2 px-5 sm:py-2.5 sm:px-6 rounded-full shadow-lg transform rotate-3 flex items-center gap-2 text-sm sm:text-base">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              AI Priority: High
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              {/* Card Header */}
              <div className="flex items-center space-x-4 sm:space-x-5 border-b border-slate-100 pb-5 sm:pb-6">
                <div className="bg-slate-50 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-slate-100 flex items-center justify-center text-2xl shadow-sm shrink-0">
                  🛣️
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Fix Main Road Potholes</h4>
                  <p className="text-sm sm:text-base text-slate-500 mt-1 flex items-center gap-1.5">
                    <Map size={16} className="shrink-0"/> Sector 4, City Center
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100/50 transition-colors hover:bg-slate-100/50">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Citizen Reports</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">243</p>
                    <span className="text-xs sm:text-sm font-medium text-green-500">+12%</span>
                  </div>
                </div>
                <div className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-100/50 transition-colors hover:bg-blue-50">
                  <p className="text-[10px] sm:text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">Priority Score</p>
                  <p className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight">92<span className="text-xl sm:text-2xl text-blue-400">/100</span></p>
                </div>
              </div>
              
              {/* Explainability Box */}
              <div className="bg-green-50/50 p-4 sm:p-5 rounded-2xl border border-green-100/60 mt-4 sm:mt-6 relative overflow-hidden group cursor-default">
                <div className="absolute inset-0 bg-green-100/0 group-hover:bg-green-100/20 transition-colors"></div>
                <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                  <div className="bg-green-100 p-2 rounded-xl text-green-600 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-green-900 mb-1">AI Explanation</h5>
                    <p className="text-xs sm:text-sm text-green-800/80 leading-relaxed">
                      High priority due to proximity to City Hospital and 243 identical reports from verified local residents within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SolutionSection;
