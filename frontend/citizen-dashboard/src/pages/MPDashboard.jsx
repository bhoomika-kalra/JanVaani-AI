import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, User, LayoutDashboard, BrainCircuit, AlertTriangle, CheckCircle2, Users, MapPin, Activity, FileText, ChevronRight, Share2, Download, TrendingUp, ThumbsUp, Layers, CheckSquare, Settings, ArrowRight, ShieldAlert, Cpu, Network, Clock, BarChart3, PieChart, Droplets, Car, Zap, Trash2, Heart, Filter, FileSpreadsheet, Eye, MessageSquare, ListFilter, HelpCircle, Mail, Plus } from 'lucide-react';

const MPDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Executive Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  // Dummy State for filters & selections
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [dateFilter, setDateFilter] = useState('This Month');
  const [complaintCategoryFilter, setComplaintCategoryFilter] = useState('All');

  // Trigger Toast
  const triggerAction = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setActiveModal(null);
    setTimeout(() => setShowToast(false), 3000);
  };

  const sidebarLinks = [
    { name: 'Executive Overview', icon: <LayoutDashboard size={18} /> },
    { name: 'AI Insights', icon: <BrainCircuit size={18} /> },
    { name: 'Complaints', icon: <AlertTriangle size={18} /> },
    { name: 'Analytics', icon: <Activity size={18} /> },
    { name: 'Projects', icon: <Layers size={18} /> },
    { name: 'Reports', icon: <FileText size={18} /> },
    { name: 'Citizen Feedback', icon: <Users size={18} /> },
  ];

  // Dummy Data
  const regionData = {
    totalComplaints: 1248,
    activeIssues: 342,
    aiRecommended: 12,
    highPriority: 45,
    completedWorks: 890,
    citizenParticipation: '8.4k',
    wards: [
      { name: 'Ward 14 (Downtown)', count: 145, trend: '+12%' },
      { name: 'Ward 22 (North Hub)', count: 98, trend: '-5%' },
      { name: 'Ward 08 (East Side)', count: 210, trend: '+24%' },
      { name: 'Ward 19 (West End)', count: 65, trend: '-2%' },
    ]
  };

  const aiQueue = [
    { id: 'AI-774', title: 'Severe Waterlogging', ward: 'Ward 14', category: 'Drainage', priority: 98, estBudget: '₹4.5L', status: 'Pending Review' },
    { id: 'AI-775', title: 'Hostel Safety Audit', ward: 'Ward 22', category: 'Security', priority: 95, estBudget: '₹2.1L', status: 'Pending Review' },
    { id: 'AI-776', title: 'Chambal Bridge Repair', ward: 'Ward 08', category: 'Infrastructure', priority: 92, estBudget: '₹12.5L', status: 'Approved' },
    { id: 'AI-777', title: 'Power Cuts (48hr+)', ward: 'Ward 19', category: 'Electricity', priority: 89, estBudget: '₹1.0L', status: 'Assigned' },
    { id: 'AI-778', title: 'Toxic Waste Dump', ward: 'Ward 03', category: 'Sanitation', priority: 85, estBudget: '₹8.0L', status: 'Pending Review' },
  ];

  const complaintsList = [
    { id: 'CMP-2024-8901', citizen: 'Rahul S.', ward: 'Ward 14', category: 'Water', severity: 'High', status: 'Open', date: 'Oct 12', dept: 'Jal Board' },
    { id: 'CMP-2024-8902', citizen: 'Priya M.', ward: 'Ward 22', category: 'Roads', severity: 'Critical', status: 'In Progress', date: 'Oct 11', dept: 'PWD' },
    { id: 'CMP-2024-8903', citizen: 'Amit K.', ward: 'Ward 08', category: 'Electricity', severity: 'Medium', status: 'Resolved', date: 'Oct 10', dept: 'Power Dept' },
    { id: 'CMP-2024-8904', citizen: 'Sneha R.', ward: 'Ward 19', category: 'Sanitation', severity: 'High', status: 'Open', date: 'Oct 09', dept: 'Municipal Corp' },
    { id: 'CMP-2024-8905', citizen: 'Vikram B.', ward: 'Ward 03', category: 'Security', severity: 'Low', status: 'Open', date: 'Oct 08', dept: 'Police' },
    { id: 'CMP-2024-8906', citizen: 'Anita D.', ward: 'Ward 14', category: 'Water', severity: 'Medium', status: 'Resolved', date: 'Oct 07', dept: 'Jal Board' },
    { id: 'CMP-2024-8907', citizen: 'Rajesh P.', ward: 'Ward 22', category: 'Roads', severity: 'High', status: 'Open', date: 'Oct 06', dept: 'PWD' },
    { id: 'CMP-2024-8908', citizen: 'Sunita L.', ward: 'Ward 08', category: 'Electricity', severity: 'Critical', status: 'In Progress', date: 'Oct 05', dept: 'Power Dept' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      
      {/* Global Toast */}
      {showToast && (
        <div className="fixed top-24 right-6 z-[100] bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="font-bold text-sm">{toastMsg}</span>
        </div>
      )}

      {/* ------------------------------------------------ */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------ */}
      <aside className="bg-white border-r border-slate-200 flex-shrink-0 sticky top-0 h-screen z-40 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-2 rounded-lg text-white shadow-md mr-3">
            <BrainCircuit size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-900 leading-tight">JanVaani <span className="text-blue-600">AI</span></span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Executive Command</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => setActiveNav(link.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeNav === link.name ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span className={`${activeNav === link.name ? 'text-blue-600' : 'text-slate-400'}`}>{link.icon}</span>
              {link.name}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100 space-y-1">
          <button 
            onClick={() => setActiveNav('Settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeNav === 'Settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className={`${activeNav === 'Settings' ? 'text-blue-600' : 'text-slate-400'}`}><Settings size={18}/></span> Settings
          </button>
          <button 
            onClick={() => setActiveNav('Help & Support')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeNav === 'Help & Support' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className={`${activeNav === 'Help & Support' ? 'text-blue-600' : 'text-slate-400'}`}><HelpCircle size={18}/></span> Help & Support
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="min-w-0 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* TOP HEADER */}
        <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-30 border-b border-slate-200 shadow-sm h-20 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 group relative cursor-not-allowed">
              <MapPin size={16} className="text-slate-500" />
              <span className="text-sm font-black text-slate-800">Kota Constituency</span>
              <div className="absolute top-full left-0 mt-2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Dashboard restricted to assigned constituency
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer hover:text-slate-900"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search complaints, wards..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 font-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="h-8 w-px bg-slate-200"></div>
            
            <div className="relative group cursor-pointer" onClick={() => setActiveNav('Settings')}>
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-black text-slate-900">Om Birla</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Member of Parliament</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all">
                  OB
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------ */}
        {/* DYNAMIC MAIN CONTENT */}
        {/* ------------------------------------------------ */}
        <main className="p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500">
          
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{activeNav}</h1>
            <p className="text-slate-500 font-medium mt-2">
              {activeNav === 'Executive Overview' && 'A 30-second snapshot of your constituency.'}
              {activeNav === 'AI Insights' && 'Deep-dive AI reasoning and root cause analysis.'}
              {activeNav === 'Complaints' && 'Comprehensive citizen complaint management.'}
              {activeNav === 'Analytics' && 'Data visualization and trend forecasting.'}
              {activeNav === 'Projects' && 'Execution workflow and project tracking.'}
              {activeNav === 'Reports' && 'Exportable reports and performance summaries.'}
              {activeNav === 'Citizen Feedback' && 'Live community sentiment and engagement.'}
              {activeNav === 'Settings' && 'Manage your account and preferences.'}
              {activeNav === 'Help & Support' && 'Get assistance with the JanVaani platform.'}
            </p>
          </div>

          {/* ==============================================
              TAB: EXECUTIVE OVERVIEW
              ============================================== */}
          {activeNav === 'Executive Overview' && (
            <div className="space-y-8">
              {/* KPI CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { label: 'Total Complaints', value: regionData.totalComplaints, icon: <FileText size={20}/>, color: 'blue' },
                  { label: 'Active Issues', value: regionData.activeIssues, icon: <AlertTriangle size={20}/>, color: 'orange' },
                  { label: 'AI Recommended', value: regionData.aiRecommended, icon: <BrainCircuit size={20}/>, color: 'blue' },
                  { label: 'High Priority', value: regionData.highPriority, icon: <ShieldAlert size={20}/>, color: 'red' },
                  { label: 'Completed Works', value: regionData.completedWorks, icon: <CheckCircle2 size={20}/>, color: 'emerald' },
                  { label: 'Citizen Engagement', value: regionData.citizenParticipation, icon: <Users size={20}/>, color: 'slate' },
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${kpi.color}-50 text-${kpi.color}-600 group-hover:scale-110 transition-transform`}>
                      {kpi.icon}
                    </div>
                    <div>
                      <span className="block text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 block">{kpi.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AI Recommendation of the Day */}
                <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BrainCircuit size={120} />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="inline-flex items-center gap-2 bg-blue-500/30 px-3 py-1.5 rounded-lg text-blue-200 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-400/30">
                      <Cpu size={14}/> Recommendation of the Day
                    </div>
                    <h3 className="text-2xl font-black mb-2">Severe Waterlogging in Ward 14</h3>
                    <p className="text-blue-200 text-sm font-medium mb-6 line-clamp-2">AI predicts catastrophic road damage if not resolved before upcoming monsoon. Immediate drainage clearance required.</p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">AI Confidence</span>
                        <span className="text-xl font-black text-white">98.5%</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Est. Budget</span>
                        <span className="text-xl font-black text-white">₹4.5L</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setActiveNav('AI Insights')} className="relative z-10 w-full bg-white text-blue-900 py-4 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                    View AI Reasoning <ArrowRight size={16}/>
                  </button>
                </div>

                {/* Top 5 Queue */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <ShieldAlert size={20} className="text-red-500"/> Top Priority Queue
                    </h3>
                    <button onClick={() => setActiveNav('Projects')} className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      Open Projects <ArrowRight size={16}/>
                    </button>
                  </div>
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Issue</th>
                          <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">Location</th>
                          <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">AI Priority</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {aiQueue.slice(0, 5).map((issue) => (
                          <tr key={issue.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="py-4">
                              <span className="font-extrabold text-slate-900 block text-sm">{issue.title}</span>
                              <span className="text-xs text-slate-500 font-medium">{issue.category}</span>
                            </td>
                            <td className="py-4">
                              <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">{issue.ward}</span>
                            </td>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-full bg-slate-100 rounded-full h-2 max-w-[100px]">
                                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${issue.priority}%` }}></div>
                                </div>
                                <span className="font-black text-slate-900 text-sm">{issue.priority}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Mini Map */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button onClick={() => setActiveNav('AI Insights')} className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-32 group">
                    <BrainCircuit size={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span className="font-bold text-left text-lg">View AI Insights</span>
                  </button>
                  <button onClick={() => setActiveNav('Reports')} className="bg-white hover:bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-32 text-slate-800 group">
                    <FileText size={24} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <span className="font-bold text-left text-lg">Generate Report</span>
                  </button>
                  <button onClick={() => setActiveNav('Citizen Feedback')} className="bg-white hover:bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-32 text-slate-800 group">
                    <Users size={24} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                    <span className="font-bold text-left text-lg">Citizen Sentiment</span>
                  </button>
                </div>
                
                <div className="bg-slate-200 rounded-3xl relative overflow-hidden flex flex-col justify-between h-32 group border border-slate-300">
                  <div className="absolute inset-0 bg-map-pattern opacity-30 mix-blend-multiply"></div>
                  <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2"><MapPin size={14}/> Live Heatmap</span>
                    <button className="text-sm font-bold bg-white text-slate-900 px-4 py-2 rounded-xl shadow-sm w-fit group-hover:bg-slate-900 group-hover:text-white transition-colors">Expand Map</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ==============================================
              TAB: AI INSIGHTS
              ============================================== */}
          {activeNav === 'AI Insights' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col min-h-[600px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-100 pb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg text-blue-700 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100">
                    <BrainCircuit size={14}/> AI Explainability Panel
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Severe Waterlogging in Ward 14</h2>
                  <p className="text-slate-500 font-medium mt-2">Analyzed from 342 individual complaints across 3 platforms.</p>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Priority Score</span>
                  <span className="text-4xl font-black">98</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 flex-1">
                <div className="lg:col-span-2 space-y-12">
                  
                  {/* Root Cause & Clustering */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Network size={16}/> Root Cause</h4>
                      <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        Historical data indicates the primary drainage arterial under MG Road has collapsed. Recent urban construction (Project ID: 882) likely weakened the structural integrity.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Layers size={16}/> Complaint Clustering</h4>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Twitter Mentions</span><span className="font-black text-slate-900">124</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">JanVaani App</span><span className="font-black text-slate-900">89</span></div>
                        <div className="flex justify-between items-center text-sm"><span className="font-bold text-slate-700">Helpline Calls</span><span className="font-black text-slate-900">129</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Prediction */}
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><TrendingUp size={16}/> Trend Prediction</h4>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border border-red-100">
                      <p className="text-red-900 font-bold mb-3">Critical Alert: Monsoon arriving in 14 days.</p>
                      <p className="text-red-700/80 text-sm font-medium">If unresolved, waterlogging will cascade to neighboring Ward 15, affecting approx 4,500 daily commuters and stalling main market logistics.</p>
                    </div>
                  </div>

                </div>

                {/* Right Action Panel */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">AI Recommendation</h4>
                  
                  <div className="space-y-6 flex-1">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Dept</span>
                      <span className="text-base font-black text-slate-900">Public Works (PWD)</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Budget Limit</span>
                      <span className="text-base font-black text-slate-900">₹4.5L - ₹5.2L</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Similar Historical Case</span>
                      <span className="text-sm font-bold text-blue-600 underline cursor-pointer">View 2021 MG Road Repair</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button onClick={() => triggerAction("Approved and sent to PWD")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                      Approve Recommendation
                    </button>
                    <button className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-4 rounded-xl shadow-sm transition-all text-sm">
                      Flag for Manual Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB: COMPLAINTS
              ============================================== */}
          {activeNav === 'Complaints' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-sm px-2">
                  <Filter size={16}/> Filters:
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Water</option>
                  <option>Roads</option>
                  <option>Electricity</option>
                </select>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Statuses</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Severity</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">ID</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Citizen</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Location</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Severity</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {complaintsList.map((comp) => (
                        <tr key={comp.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-black text-slate-900">{comp.id}</td>
                          <td className="px-6 py-4 text-sm font-bold text-slate-700">{comp.citizen}</td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{comp.ward}</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-600">{comp.category}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${
                              comp.severity === 'Critical' ? 'bg-red-50 text-red-700 border border-red-100' :
                              comp.severity === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                              comp.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                              'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {comp.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold ${
                              comp.status === 'Open' ? 'text-blue-600' :
                              comp.status === 'In Progress' ? 'text-orange-500' :
                              'text-emerald-600'
                            }`}>
                              {comp.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 w-full">
                              Details <ChevronRight size={14}/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB: ANALYTICS
              ============================================== */}
          {activeNav === 'Analytics' && (
            <div className="space-y-6">
              <div className="flex justify-end mb-6">
                <button className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 shadow-sm">
                  <Download size={16}/> Export Analytics Data
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col w-full min-h-[300px]">
                  <h3 className="text-base font-extrabold text-slate-900 mb-6 flex items-center gap-2"><PieChart size={18} className="text-slate-400"/> Category Distribution</h3>
                  <div className="space-y-5 flex-1 flex flex-col justify-center">
                    {[
                      { name: 'Water', value: 32, color: 'bg-blue-500', icon: <Droplets size={14}/> },
                      { name: 'Roads', value: 24, color: 'bg-slate-700', icon: <Car size={14}/> },
                      { name: 'Electricity', value: 18, color: 'bg-yellow-500', icon: <Zap size={14}/> },
                      { name: 'Sanitation', value: 14, color: 'bg-emerald-500', icon: <Trash2 size={14}/> },
                      { name: 'Healthcare', value: 12, color: 'bg-red-400', icon: <Heart size={14}/> },
                    ].map((cat) => (
                      <div key={cat.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">{cat.icon} {cat.name}</span>
                          <span className="text-xs font-black text-slate-900">{cat.value}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                          <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col w-full min-h-[300px]">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2"><TrendingUp size={18} className="text-slate-400"/> Volume Trend</h3>
                    <span className="text-[12px] font-bold bg-green-50 text-green-700 px-3 py-1 rounded-md border border-green-100">+24% Overall</span>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-4 relative border-b border-slate-100 pb-2">
                    <div className="absolute top-1/4 w-full border-t border-slate-100 border-dashed"></div>
                    <div className="absolute top-2/4 w-full border-t border-slate-100 border-dashed"></div>
                    <div className="absolute top-3/4 w-full border-t border-slate-100 border-dashed"></div>
                    
                    {[
                      { month: 'Jan', val: 30 }, { month: 'Feb', val: 45 }, { month: 'Mar', val: 40 },
                      { month: 'Apr', val: 65 }, { month: 'May', val: 80 }, { month: 'Jun', val: 95 }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-3 w-full relative z-10 h-full justify-end">
                        <div className="w-full bg-slate-100 rounded-t-md relative max-w-[60px]" style={{ height: `${item.val}%` }}>
                          <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-md shadow-sm transition-all" style={{ height: `${item.val}%` }}></div>
                        </div>
                        <span className="text-[12px] font-bold text-slate-500">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col w-full min-h-[300px]">
                  <h3 className="text-base font-extrabold text-slate-900 mb-6 flex items-center gap-2 shrink-0"><BarChart3 size={18} className="text-slate-400"/> Ward Distribution</h3>
                  <div className="overflow-y-auto pr-1 space-y-4 flex-1 scrollbar-hide">
                    {regionData.wards.map((ward, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <div>
                          <span className="block text-sm font-bold text-slate-800 mb-1">{ward.name}</span>
                          <span className={`text-xs font-bold ${ward.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                            {ward.trend} this week
                          </span>
                        </div>
                        <span className="text-base font-black text-slate-900 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">{ward.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Resolution Time placeholder */}
                 <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[250px] text-center">
                    <Clock size={32} className="text-slate-300 mb-4"/>
                    <h3 className="text-lg font-black text-slate-900">Resolution Time Analytics</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2">Chart data visualizing average time to resolve complaints across departments.</p>
                 </div>
                 {/* Dept Performance placeholder */}
                 <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[250px] text-center">
                    <Building size={32} className="text-slate-300 mb-4"/>
                    <h3 className="text-lg font-black text-slate-900">Department Performance</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2">Bar chart showing completion rates and SLAs for PWD, Jal Board, etc.</p>
                 </div>
              </div>
            </div>
          )}

          {/* ==============================================
              TAB: PROJECTS
              ============================================== */}
          {activeNav === 'Projects' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              
              <div className="mb-12 border-b border-slate-100 pb-8">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><Layers size={20} className="text-slate-400"/> AI Priority Execution Queue</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiQueue.slice(0,3).map((proj, idx) => (
                     <div key={idx} className={`p-6 rounded-2xl border ${idx === 0 ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-500' : 'bg-white border-slate-200'} cursor-pointer hover:border-blue-300 transition-colors`}>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{proj.id}</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-slate-100 text-slate-700`}>{proj.status}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-lg mb-1 leading-tight">{proj.title}</h4>
                        <span className="text-xs font-bold text-slate-500">{proj.ward}</span>
                     </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                <div className="flex flex-col min-h-full">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-8 flex items-center gap-2"><CheckSquare size={20} className="text-slate-400"/> Active Project Workflow</h3>
                  <div className="space-y-10 relative before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-[2px] before:bg-slate-100 pl-1">
                    {[
                      { title: "AI Recommended", active: true, done: true, time: "Oct 12, 10:00 AM" },
                      { title: "Executive Review", active: true, done: false, time: "Pending Action" },
                      { title: "Department Assigned", active: false, done: false, time: "Awaiting approval" },
                      { title: "Work Commenced", active: false, done: false, time: "Not started" },
                      { title: "Project Completed", active: false, done: false, time: "Pending" }
                    ].map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-6">
                        <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-[6px] border-white shadow-sm ${step.done ? 'bg-blue-600' : step.active ? 'bg-blue-100 border-blue-200' : 'bg-slate-200'}`}>
                          {step.done && <CheckCircle2 size={14} className="text-white"/>}
                        </div>
                        <div className="flex flex-col pt-1 w-full max-w-sm">
                          <span className={`font-extrabold text-base ${step.active || step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</span>
                          {step.time && (
                            <span className={`inline-block mt-2 text-xs font-bold w-fit ${step.time === 'Pending Action' ? 'text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded-md' : 'text-slate-500'}`}>{step.time}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between bg-slate-50 p-8 rounded-3xl border border-slate-100 min-h-[400px]">
                  <div className="mb-8">
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest mb-4">Required Action</div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-3">Authorize Resolution Action</h3>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed">Assign this issue to the relevant department to authorize funding and begin ground repairs immediately.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Est. Budget</span>
                      <span className="text-xl font-black text-slate-900">High Priority</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Timeline</span>
                      <span className="text-xl font-black text-slate-900">15-30 Days</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    <button onClick={() => triggerAction("Approved and sent to Dept")} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2 hover:-translate-y-0.5">
                      Approve & Disburse Funds <ArrowRight size={20}/>
                    </button>
                    <div className="grid grid-cols-1">
                      <button onClick={() => triggerAction("Flagged for Further Review")} className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold py-4 rounded-xl transition-colors shadow-sm text-sm">Flag for Review</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==============================================
              TAB: REPORTS
              ============================================== */}
          {activeNav === 'Reports' && (
            <div className="space-y-6">
               <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl mb-6">
                    <FileSpreadsheet size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-4">Report Generation Engine</h2>
                  <p className="text-slate-500 font-medium max-w-lg mb-10">Generate, download, and share comprehensive executive reports for your constituency. Data is compiled in real-time.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                     <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-3">
                        <Download size={18}/> Download Full PDF Report
                     </button>
                     <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-3">
                        <FileSpreadsheet size={18}/> Export as Excel (CSV)
                     </button>
                     <button className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold py-4 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3">
                        <Mail size={18} className="text-slate-400"/> Email to Secretariat
                     </button>
                     <button className="bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold py-4 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3">
                        <Plus size={18} className="text-slate-400"/> Custom AI Summary
                     </button>
                  </div>
               </div>

               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                 <h3 className="text-lg font-black text-slate-900 mb-6">Recent Reports Archive</h3>
                 <div className="space-y-3">
                   {[
                     { name: 'Q3 Constituency Performance Report', date: 'Oct 01, 2024' },
                     { name: 'September AI Resolution Summary', date: 'Sep 30, 2024' },
                     { name: 'Ward 14 Infrastructure Audit', date: 'Sep 15, 2024' },
                     { name: 'Monsoon Preparedness Tracker', date: 'Aug 20, 2024' }
                   ].map((rep, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer group">
                       <div className="flex items-center gap-4">
                         <div className="bg-slate-100 p-2 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors"><FileText size={16}/></div>
                         <div>
                           <span className="block font-bold text-slate-900">{rep.name}</span>
                           <span className="text-xs font-medium text-slate-500">{rep.date}</span>
                         </div>
                       </div>
                       <button className="text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Download</button>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}

          {/* ==============================================
              TAB: CITIZEN FEEDBACK
              ============================================== */}
          {activeNav === 'Citizen Feedback' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                 <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><MessageSquare size={20} className="text-slate-400"/> Live Feedback Stream</h3>
                   <div className="space-y-6">
                     {[
                       { name: "Rahul Sharma", ward: "Ward 14", text: "The new streetlights in our area are working perfectly! Thanks to the fast action.", sentiment: "positive", time: "10 mins ago" },
                       { name: "Priya Patel", ward: "Ward 22", text: "Still waiting for the garbage truck. It's been 3 days since the last pickup.", sentiment: "negative", time: "45 mins ago" },
                       { name: "Amit Kumar", ward: "Ward 08", text: "Road repair on Main St is causing massive traffic jams. Need traffic police.", sentiment: "neutral", time: "2 hours ago" },
                     ].map((feed, idx) => (
                       <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                         <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                           {feed.name.charAt(0)}
                         </div>
                         <div className="flex-1">
                           <div className="flex justify-between items-start mb-1">
                             <div>
                               <span className="font-bold text-slate-900 mr-2">{feed.name}</span>
                               <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{feed.ward}</span>
                             </div>
                             <span className="text-xs font-medium text-slate-400">{feed.time}</span>
                           </div>
                           <p className="text-sm text-slate-700 leading-relaxed">{feed.text}</p>
                           <div className="mt-3 inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border" style={{
                             borderColor: feed.sentiment === 'positive' ? '#bbf7d0' : feed.sentiment === 'negative' ? '#fecaca' : '#e2e8f0',
                             backgroundColor: feed.sentiment === 'positive' ? '#f0fdf4' : feed.sentiment === 'negative' ? '#fef2f2' : '#f8fafc',
                             color: feed.sentiment === 'positive' ? '#166534' : feed.sentiment === 'negative' ? '#991b1b' : '#475569',
                           }}>
                             AI Sentiment: {feed.sentiment}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <div className="bg-gradient-to-b from-blue-900 to-slate-900 p-8 rounded-3xl shadow-lg text-white">
                    <h3 className="text-lg font-black mb-6 flex items-center gap-2"><Cpu size={20} className="text-blue-300"/> AI Sentiment Analysis</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-green-400">Positive / Satisfied</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-green-400 h-2 rounded-full" style={{width: '68%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-red-400">Negative / Frustrated</span>
                          <span>22%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-red-400 h-2 rounded-full" style={{width: '22%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-400">Neutral / Inquiries</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-slate-400 h-2 rounded-full" style={{width: '10%'}}></div></div>
                      </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-black text-slate-900 mb-6">Trending Issues</h3>
                   <div className="space-y-4">
                     {['#Waterlogging', '#Streetlights', '#GarbageCollection', '#Potholes'].map((tag, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                         <span className="font-bold text-blue-600">{tag}</span>
                         <span className="text-xs font-black text-slate-500 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{120 - i*20} mentions</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>
          )}

          {/* ==============================================
              TAB: SETTINGS & HELP
              ============================================== */}
          {activeNav === 'Settings' && (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Account Settings</h2>
              
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-slate-100">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                  OB
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Om Birla</h3>
                  <p className="text-slate-500 font-medium">Member of Parliament • Kota Constituency</p>
                  <button className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">Edit Profile Details</button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 mb-4">Notification Preferences</h3>
                {[
                  { title: "Critical AI Alerts", desc: "Get notified immediately for high priority issues" },
                  { title: "Daily Executive Summary", desc: "Receive a morning digest of constituency health" },
                  { title: "Citizen Feedback Spikes", desc: "Alerts when a specific issue starts trending locally" }
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                      <span className="block font-bold text-slate-900">{pref.title}</span>
                      <span className="text-xs font-medium text-slate-500">{pref.desc}</span>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'Help & Support' && (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm max-w-3xl">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Help & Support</h2>
              <p className="text-slate-500 font-medium mb-10">Need assistance with the JanVaani Executive Command Center?</p>
              
              <div className="space-y-4 mb-10">
                {[
                  "How does the AI determine issue priority?",
                  "How do I authorize funds for a department?",
                  "Can I export the live heatmap data?",
                  "How to manage team access and permissions?"
                ].map((faq, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="font-bold text-slate-800">{faq}</span>
                    <ChevronRight size={18} className="text-slate-400" />
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-black text-blue-900 mb-1">Still need help?</h4>
                  <p className="text-sm font-medium text-blue-700">Contact the dedicated JanVaani government support team.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

// Add a dummy Building icon since it was used in analytics placeholder
const Building = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
  </svg>
);

export default MPDashboard;
