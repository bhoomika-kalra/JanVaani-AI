import React, { useState, useEffect } from 'react';
import { 
  FileText, BrainCircuit, Download, Share2, ArrowLeft, 
  TrendingUp, BarChart3, Droplets, Car, Zap, Trash2, Heart, 
  MapPin, ShieldAlert, CheckCircle2, Users, AlertTriangle, 
  Activity, Sparkles, Loader2, ThumbsUp, MessageSquare
} from 'lucide-react';

const AIReportModule = ({ mpSession, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/reports/monthly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (data.success && data.download_url) {
        window.open(`http://localhost:8000${data.download_url}`, '_blank');
      } else {
        alert('Failed to generate PDF on server.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'JanVaani AI Monthly Report',
        text: 'Check out the latest AI Monthly Constituency Report from JanVaani.',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Report link copied to clipboard!");
    }
  };

  const steps = [
    "Collecting constituency data...",
    "Generating AI insights...",
    "Building analytics...",
    "Preparing PDF...",
    "Finalizing report..."
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsReady(false);
    setGenerationStep(0);
    setShowPreview(false);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setIsReady(true);
      } else {
        setGenerationStep(step);
      }
    }, 1200);
  };

  // If we are in the main "Reports" view (before generating, or just after)
  if (!showPreview) {
    return (
      <div className="space-y-6">
        
        {/* Loading Overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center">
            <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 relative">
                <Loader2 size={40} className="animate-spin" />
                <Sparkles size={16} className="absolute top-2 right-2 text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">JanVaani AI</h3>
              <p className="text-sm font-bold text-slate-500 mb-8">{steps[generationStep]}</p>
              
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((generationStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Step {generationStep + 1} of {steps.length}
              </p>
            </div>
          </div>
        )}

        {/* Initial / Ready State */}
        <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center min-h-[500px]">
          
          {!isReady ? (
            <>
              <div className="bg-blue-50 text-blue-600 p-5 rounded-3xl mb-6 shadow-sm border border-blue-100">
                <BrainCircuit size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">AI Monthly Report Engine</h2>
              <p className="text-slate-500 font-medium max-w-lg mb-10 leading-relaxed">
                Generate a comprehensive, AI-powered executive report for your constituency. 
                Data is compiled in real-time, analyzing thousands of citizen interactions and complaints.
              </p>
              
              <button 
                onClick={handleGenerate} 
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-3 text-lg"
              >
                <Sparkles size={20}/> Generate AI Monthly Report
              </button>
            </>
          ) : (
            <>
              <div className="bg-green-50 text-green-600 p-5 rounded-3xl mb-6 shadow-sm border border-green-100 animate-in zoom-in-95">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Monthly Report Ready</h2>
              <p className="text-slate-500 font-medium max-w-lg mb-10 leading-relaxed">
                Your AI-generated executive report for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} has been successfully compiled.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
                <button 
                  onClick={() => setShowPreview(true)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                >
                  <FileText size={18}/> Preview Report
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18}/>}
                  {isDownloading ? 'Generating...' : 'Download PDF'}
                </button>
                <button 
                  onClick={handleShare}
                  className="bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-4 px-6 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                >
                  <Share2 size={18}/> Share Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // FULL PAGE PDF PREVIEW SCREEN
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 bg-slate-100 z-[200] overflow-y-auto overflow-x-hidden flex flex-col pb-20 animate-in slide-in-from-bottom-10">
      
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 px-8 flex justify-between items-center z-50 shadow-sm">
        <button onClick={() => setShowPreview(false)} className="flex items-center gap-2 text-slate-600 font-bold hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <ArrowLeft size={16}/> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-md disabled:opacity-70"
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16}/>}
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
          <button 
            onClick={handleShare}
            className="bg-blue-50 text-blue-700 border border-blue-200 px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-100 transition-colors shadow-sm"
          >
            <Share2 size={16}/> Share
          </button>
        </div>
      </div>

      {/* A4 Size Report Container */}
      <div className="w-full max-w-[1000px] bg-white mx-auto mt-8 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">J</div>
              <h1 className="text-2xl font-black tracking-tight">JanVaani AI</h1>
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tight text-white/90">Executive Monthly Report</h2>
            <p className="text-blue-300 font-bold tracking-widest uppercase text-xs">Constituency Status & Analytics</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-black text-white mb-1 uppercase tracking-widest">{mpSession?.constituency || 'Kota Constituency'}</p>
            <p className="text-2xl font-bold text-blue-200 mb-6">{mpSession?.name || 'Om Birla'}</p>
            <p className="text-xs font-bold text-slate-400 bg-black/20 px-4 py-2 rounded-lg border border-white/10 inline-block shadow-inner">
              {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} • Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="p-12 space-y-12">
          
          {/* Executive Summary */}
          <section>
             <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-2">
               <BrainCircuit className="text-blue-600" size={24}/>
               <h3 className="text-xl font-black text-slate-900">AI Executive Summary</h3>
             </div>
             <div className="bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-600 text-slate-700 font-medium leading-relaxed shadow-sm">
                <p className="mb-3"><strong className="text-slate-900">Overview:</strong> This month, <strong>1,248 complaints</strong> were received across the constituency, marking a 12% increase from last month.</p>
                <p className="mb-3"><strong className="text-slate-900">Critical Insight:</strong> Water infrastructure contributed to <strong>32%</strong> of all severe complaints, primarily concentrated in the northern wards.</p>
                <p><strong className="text-slate-900">AI Recommendation:</strong> Prioritize immediate drainage repairs in <strong>Ward 14</strong> before the upcoming monsoon season to prevent cascade flooding.</p>
             </div>
          </section>

          {/* Complaint Summary KPIs */}
          <section>
             <div className="grid grid-cols-5 gap-4">
               {[
                 { label: 'Total Complaints', val: '1,248', icon: <FileText size={18}/>, col: 'bg-slate-50 text-slate-800' },
                 { label: 'Active Issues', val: '342', icon: <Activity size={18}/>, col: 'bg-orange-50 text-orange-800 border border-orange-100' },
                 { label: 'Resolved', val: '890', icon: <CheckCircle2 size={18}/>, col: 'bg-green-50 text-green-800 border border-green-100' },
                 { label: 'High Priority', val: '45', icon: <ShieldAlert size={18}/>, col: 'bg-red-50 text-red-800 border border-red-100' },
                 { label: 'AI Recommended', val: '12', icon: <Sparkles size={18}/>, col: 'bg-blue-50 text-blue-800 border border-blue-100' },
               ].map((kpi, i) => (
                 <div key={i} className={`p-4 rounded-xl ${kpi.col} shadow-sm flex flex-col justify-between`}>
                   <div className="mb-4 opacity-70">{kpi.icon}</div>
                   <div>
                     <div className="text-2xl font-black mb-1">{kpi.val}</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">{kpi.label}</div>
                   </div>
                 </div>
               ))}
             </div>
          </section>

          {/* Charts Row */}
          <section className="grid grid-cols-2 gap-8">
            
            {/* Category Breakdown */}
            <div className="border border-slate-200 p-6 rounded-2xl shadow-sm">
               <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">Complaint Categories</h4>
               <div className="space-y-4">
                  {[
                    { name: 'Water', value: 32, color: 'bg-blue-500' },
                    { name: 'Roads', value: 24, color: 'bg-slate-700' },
                    { name: 'Electricity', value: 18, color: 'bg-yellow-500' },
                    { name: 'Sanitation', value: 14, color: 'bg-emerald-500' },
                    { name: 'Healthcare', value: 12, color: 'bg-red-400' },
                  ].map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-700">
                        <span>{cat.name}</span>
                        <span>{cat.value}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.value}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Monthly Trend */}
            <div className="border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col">
              <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">6-Month Trend</h4>
              <div className="flex-1 flex items-end justify-between gap-2 relative border-b border-slate-200 pb-2">
                 {[30, 45, 40, 65, 80, 95].map((val, idx) => {
                   const months = ['Jan','Feb','Mar','Apr','May','Jun'];
                   return (
                     <div key={idx} className="flex flex-col items-center w-full h-full justify-end relative group">
                        <div className="w-full bg-slate-100 relative rounded-t-sm overflow-hidden" style={{ height: '150px' }}>
                          <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm" style={{ height: `${val}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 mt-2">{months[idx]}</span>
                     </div>
                   );
                 })}
              </div>
            </div>

          </section>

          {/* Hotspot & Department */}
          <section className="grid grid-cols-2 gap-8">
            
            {/* Hotspot */}
            <div className="border border-slate-200 p-6 rounded-2xl shadow-sm bg-slate-50">
               <h4 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest flex items-center gap-2"><MapPin size={16} className="text-blue-600"/> Zone Analysis</h4>
               <div className="space-y-3">
                 <div className="bg-white p-3 rounded-lg border border-red-100 flex justify-between items-center shadow-sm">
                   <span className="font-bold text-red-700 text-sm">Critical: Ward 14</span>
                   <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-black">145 Issues</span>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-orange-100 flex justify-between items-center shadow-sm">
                   <span className="font-bold text-orange-700 text-sm">Moderate: Ward 08</span>
                   <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-black">89 Issues</span>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-green-100 flex justify-between items-center shadow-sm">
                   <span className="font-bold text-green-700 text-sm">Resolved: Ward 22</span>
                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-black">120 Closed</span>
                 </div>
               </div>
            </div>

            {/* Department Performance */}
            <div className="border border-slate-200 p-6 rounded-2xl shadow-sm">
               <h4 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-widest">Dept. Performance (SLA)</h4>
               <div className="space-y-4 text-sm font-bold">
                 {[
                   { d: 'PWD', val: 85 },
                   { d: 'Water Supply', val: 62 },
                   { d: 'Electricity', val: 92 },
                   { d: 'Sanitation', val: 78 }
                 ].map(dept => (
                   <div key={dept.d} className="flex items-center gap-3">
                     <span className="w-24 shrink-0 text-slate-700">{dept.d}</span>
                     <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full ${dept.val < 70 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{width: `${dept.val}%`}}></div>
                     </div>
                     <span className="w-10 text-right text-slate-900">{dept.val}%</span>
                   </div>
                 ))}
               </div>
            </div>

          </section>

          {/* AI Recommendations Table */}
          <section>
            <h4 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2"><Sparkles size={16} className="text-blue-600"/> Top AI Action Items</h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">
                  <tr>
                    <th className="p-4">Priority Issue</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Est. Budget</th>
                    <th className="p-4">Timeline</th>
                    <th className="p-4 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr className="bg-red-50/30">
                    <td className="p-4"><strong className="text-slate-900 block">Severe Waterlogging</strong>Ward 14</td>
                    <td className="p-4">PWD</td>
                    <td className="p-4 font-bold">₹4.5L</td>
                    <td className="p-4">15 Days</td>
                    <td className="p-4 text-right font-black text-red-600">98%</td>
                  </tr>
                  <tr>
                    <td className="p-4"><strong className="text-slate-900 block">Hostel Safety Lights</strong>Ward 22</td>
                    <td className="p-4">Electricity</td>
                    <td className="p-4 font-bold">₹2.1L</td>
                    <td className="p-4">7 Days</td>
                    <td className="p-4 text-right font-black text-orange-600">95%</td>
                  </tr>
                  <tr>
                    <td className="p-4"><strong className="text-slate-900 block">Chambal Bridge Repair</strong>Ward 08</td>
                    <td className="p-4">PWD</td>
                    <td className="p-4 font-bold">₹12.5L</td>
                    <td className="p-4">45 Days</td>
                    <td className="p-4 text-right font-black text-blue-600">92%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Financial & Citizen Engagement */}
          <section className="grid grid-cols-2 gap-8">
             
             {/* Budget */}
             <div>
               <h4 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest">Budget Estimates</h4>
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                   <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Approved</span>
                   <span className="text-xl font-black text-slate-900">₹12.5L</span>
                 </div>
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm">
                   <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Pending</span>
                   <span className="text-xl font-black text-orange-600">₹14.6L</span>
                 </div>
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm col-span-2 flex justify-between items-center">
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500">Projected AI Savings</span>
                   <span className="text-lg font-black text-green-600">+ ₹2.3L</span>
                 </div>
               </div>
             </div>

             {/* Engagement */}
             <div>
               <h4 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest">Citizen Engagement</h4>
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3">
                   <Users className="text-blue-500" size={20}/>
                   <div>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Supporters</span>
                     <span className="text-lg font-black text-slate-900">8.4k</span>
                   </div>
                 </div>
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3">
                   <MessageSquare className="text-purple-500" size={20}/>
                   <div>
                     <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Feedback</span>
                     <span className="text-lg font-black text-slate-900">1,204</span>
                   </div>
                 </div>
                 <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-sm col-span-2 flex justify-between items-center">
                   <span className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2"><ThumbsUp size={14}/> Avg Satisfaction</span>
                   <span className="text-lg font-black text-slate-900">86%</span>
                 </div>
               </div>
             </div>

          </section>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 text-center text-xs font-bold text-slate-400">
          <p className="mb-1 uppercase tracking-widest">Confidential Government Report</p>
          <p>Generated automatically by JanVaani AI Platform</p>
        </div>

      </div>
    </div>
  );
};

export default AIReportModule;
