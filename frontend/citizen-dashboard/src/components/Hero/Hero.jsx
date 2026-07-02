import React from 'react';
import { Mic, Activity, BarChart3, Database } from 'lucide-react';

const Hero = ({ onNavigateCitizen, onNavigateMP }) => (
  <section id="home" className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 bg-white overflow-hidden w-full">
    {/* Subtle Background Gradients */}
    <div className="absolute top-0 inset-x-0 h-full w-full pointer-events-none opacity-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-100/60 to-transparent blur-3xl rounded-full"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-green-50/50 to-transparent blur-3xl rounded-full"></div>
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-50/50 to-transparent blur-3xl rounded-full"></div>
    </div>

    <div className="relative max-w-7xl mx-auto text-center z-10 w-full flex flex-col items-center justify-center flex-grow">
      {/* Badge */}
      <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-full text-sm font-medium text-slate-600 mb-8 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span>Google Build With AI Project</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1] max-w-4xl mx-auto">
        Where Every Voice <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Shapes Development</span>
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl text-slate-500 mb-10 leading-relaxed max-w-3xl mx-auto font-light tracking-wide px-4">
        An AI-powered constituency decision support system that transforms scattered citizen voices into data-driven development priorities.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 w-full px-4 sm:w-auto">
        <button 
          onClick={onNavigateCitizen}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all shadow-[0_8px_30px_rgb(37,99,235,0.24)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.4)] flex items-center justify-center gap-2 group hover:-translate-y-0.5 duration-300 w-full sm:w-auto"
        >
          <Mic size={20} className="group-hover:scale-110 transition-transform" />
          Start as Citizen
        </button>
        <button 
          onClick={onNavigateMP}
          className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-3.5 rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-300 w-full sm:w-auto"
        >
          <Activity size={20} className="text-slate-500" />
          View MP Dashboard
        </button>
      </div>

      {/* Conceptual UI Mockup / Visualization */}
      <div className="relative mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/50 bg-white/50 backdrop-blur-md p-2 shadow-2xl shadow-blue-900/5 mt-auto">
        <div className="rounded-xl border border-slate-100 bg-white overflow-hidden shadow-sm">
          {/* Mockup Header */}
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Intelligence Engine</div>
          </div>
          
          {/* Mockup Body - Workflow Diagram */}
          <div className="p-6 sm:p-8 md:p-12 bg-white overflow-x-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 relative min-w-[600px] md:min-w-0">
              
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-100 via-indigo-100 to-green-100 -z-0 -translate-y-1/2"></div>
              
              {/* Node 1 */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm text-blue-600 mb-3 ring-4 ring-white">
                  <Mic size={24} />
                </div>
                <div className="text-sm font-semibold text-slate-800">Citizen Voice</div>
                <div className="text-xs text-slate-500 mt-1">Multi-modal Input</div>
              </div>

              <div className="md:hidden w-[2px] h-6 bg-slate-100"></div>

              {/* Node 2 */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-sm text-indigo-600 mb-3 ring-4 ring-white">
                  <Database size={24} />
                </div>
                <div className="text-sm font-semibold text-slate-800">AI Engine</div>
                <div className="text-xs text-slate-500 mt-1">Priority Scoring</div>
              </div>

              <div className="md:hidden w-[2px] h-6 bg-slate-100"></div>

              {/* Node 3 */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm text-orange-600 mb-3 ring-4 ring-white">
                  <BarChart3 size={24} />
                </div>
                <div className="text-sm font-semibold text-slate-800">MP Decision</div>
                <div className="text-xs text-slate-500 mt-1">Data-driven Action</div>
              </div>
              
              <div className="md:hidden w-[2px] h-6 bg-slate-100"></div>

              {/* Node 4 */}
              <div className="relative z-10 flex flex-col items-center bg-white px-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center shadow-sm text-green-600 mb-3 ring-4 ring-white">
                  <Activity size={24} />
                </div>
                <div className="text-sm font-semibold text-slate-800">Public Impact</div>
                <div className="text-xs text-slate-500 mt-1">Real Transparency</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
