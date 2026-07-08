import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, User, LayoutDashboard, BrainCircuit, AlertTriangle, CheckCircle2, Users, MapPin, Activity, FileText, ChevronRight, Share2, Download, TrendingUp, ThumbsUp, Layers, CheckSquare, Settings, ArrowRight, ShieldAlert, Cpu, Network, Clock, BarChart3, PieChart, Droplets, Car, Zap, Trash2, Heart, Filter, FileSpreadsheet, Eye, MessageSquare, ListFilter, HelpCircle, Mail, Plus, X, Sparkles, Send, LogOut } from 'lucide-react';
import logo from '../assets/logo.svg';
import apiClient from '../services/apiClient';
import MapWrapper from '../components/maps/MapWrapper';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import AIReportModule from '../components/AIReportModule';
import { aiService } from '../services/aiService';
import { mpService } from '../services/mpService';
import { dashboardService } from '../services/dashboardService';
import { reportService } from '../services/reportService';
import { workflowService } from '../services/workflowService';
import { feedbackService } from '../services/feedbackService';

const getColoredIcon = (color) => {
  if (!color || color === 'blue') return new L.Icon.Default();
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

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

  // AI Features State
  const [morningBrief, setMorningBrief] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // AI Action Status
  const [aiActionStatus, setAiActionStatus] = useState('Pending');
  const [assignedDept, setAssignedDept] = useState("Public Works (PWD)");
  const [assignedBudget, setAssignedBudget] = useState("₹4.5L - ₹5.2L");
  
  const [aiExplainability, setAiExplainability] = useState(null);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  
  // Project Actions State
  const [projectStatus, setProjectStatus] = useState('Executive Review');
  const [projectActivity, setProjectActivity] = useState([
    { time: '10:32 AM', text: 'AI Recommendation Generated' }
  ]);
  const [activeProjectId, setActiveProjectId] = useState('AI-774');
  
  const [mpHotspots, setMpHotspots] = useState([]);
  
  const handleLogout = () => {
    localStorage.removeItem('janvaani_token');
    localStorage.removeItem('mp_session');
    localStorage.removeItem('mp_session_dummy');
    navigate('/');
  };

  useEffect(() => {
    const fetchMpProfile = async () => {
      try {
        const data = await mpService.getProfile();
        const profileData = {
          name: data.name || data.full_name,
          role: data.role === 'mp' ? 'Member of Parliament' : 'Official',
          constituency: data.constituency,
          district: data.district,
          state: data.state,
          email: data.email,
          mobile: data.mobile
        };
        setMpSession(profileData);
        setEditProfileForm(profileData);
        localStorage.setItem('mp_session', JSON.stringify(profileData));
      } catch (err) {
        console.error("Failed to fetch MP profile", err);
      }
    };
    fetchMpProfile();

    const fetchMpHotspots = async () => {
      const hotspots = await dashboardService.getHotspots();
      if (hotspots && hotspots.length > 0) setMpHotspots(hotspots);
    };
    fetchMpHotspots();

    const fetchDashboardData = async () => {
      try {
        const overview = await dashboardService.getOverview();
        if (overview) setRegionData(prev => ({ ...prev, ...overview }));
        
        const queue = await dashboardService.getPriorityQueue();
        if (queue && queue.length > 0) setAiQueue(queue);
      } catch (err) {
        console.error("Failed to load dashboard core data", err);
      }
    };
    fetchDashboardData();
    
    // Set up real-time polling (e.g. every 30 seconds)
    const interval = setInterval(() => {
      fetchMpHotspots();
      fetchDashboardData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const [mpSession, setMpSession] = useState(() => {
    const saved = localStorage.getItem('mp_session');
    return saved ? JSON.parse(saved) : {
      name: 'Om Birla',
      role: 'Member of Parliament',
      constituency: 'Kota Constituency',
      district: 'Kota',
      state: 'Rajasthan'
    };
  });

  const [editProfileForm, setEditProfileForm] = useState(mpSession);

  const [notificationPrefs, setNotificationPrefs] = useState({
    "Critical AI Alerts": true,
    "Daily Executive Summary": true,
    "Citizen Feedback Spikes": true
  });

  const [compCategory, setCompCategory] = useState('All Categories');
  const [compStatus, setCompStatus] = useState('All Statuses');
  const [compSort, setCompSort] = useState('Sort by: Newest');
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Citizen Feedback State
  const [feedbacks, setFeedbacks] = useState([
    { citizen_id: "Rahul Sharma", complaint_id: "Ward 14", comment: "The new streetlights in our area are working perfectly! Thanks to the fast action.", sentiment: "Positive", created_at: "10 mins ago" },
    { citizen_id: "Priya Patel", complaint_id: "Ward 22", comment: "Still waiting for the garbage truck. It's been 3 days since the last pickup.", sentiment: "Negative", created_at: "45 mins ago" },
    { citizen_id: "Amit Kumar", complaint_id: "Ward 08", comment: "Road repair on Main St is causing massive traffic jams. Need traffic police.", sentiment: "Neutral", created_at: "2 hours ago" },
  ]);
  const [feedbackSummary, setFeedbackSummary] = useState({ positive: 68, negative: 22, neutral: 10 });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await feedbackService.getFeedback();
        if (data && data.length > 0) {
          setFeedbacks(data.map(d => ({
            citizen_id: d.name || d.citizen_id || "Anonymous",
            complaint_id: d.location || d.complaint_id || "Unknown",
            comment: d.comment,
            sentiment: d.sentiment,
            created_at: d.created_at || "Just now",
            flagged: d.flagged_for_review
          })));
        }
        
        const sumData = await feedbackService.getFeedbackSummary();
        if (sumData) setFeedbackSummary(sumData);
      } catch (err) {
        console.error("Failed to fetch MP feedback", err);
      }
    };
    fetchFeedback();

    const fetchMorningBrief = async () => {
      try {
        const data = await aiService.getMPMorningBrief();
        setMorningBrief(data);
      } catch (err) {
        console.error("Failed to fetch morning brief", err);
        setMorningBrief({
          title: "Today's AI Constituency Brief",
          mp_name: mpSession.name,
          bullets: [
            "17 new complaints overnight",
            "Water complaints increased by 24%",
            "Ward 14 is becoming critical",
            "2 ongoing projects are delayed",
            "AI recommends approving Water Pipeline Phase II today"
          ],
          estimated_impact: "12,500 citizens",
          priority: "High"
        });
      }
    };
    fetchMorningBrief();

    const fetchAiInsights = async () => {
      try {
        const expl = await aiService.generateExplainability({ project_id: activeProjectId });
        setAiExplainability(expl);
        const rec = await aiService.generateRecommendation({ constituency: 'Kota' });
        setAiRecommendation(rec);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAiInsights();
  }, [activeProjectId]);

  const handleChatSubmit = async (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: 'user', text };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage("");
    setIsChatLoading(true);

    try {
      const data = await aiService.sendMPChatMessage(text, "Kota");
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply || data.answer }]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { sender: 'ai', text: "I can help with JanVaani AI constituency insights, complaints, reports, and development priorities." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Trigger Toast
  const triggerAction = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setActiveModal(null);
    setTimeout(() => setShowToast(false), 3000);
  };

  const downloadCSV = async () => {
    try {
      await reportService.downloadComplaintsCSV();
      triggerAction('Excel (CSV) downloaded successfully.');
    } catch (err) {
      triggerAction('Report download service is currently unavailable.');
    }
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
  const [regionData, setRegionData] = useState({
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
  });
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  const [aiQueue, setAiQueue] = useState([
    { id: 'AI-774', title: 'Severe Waterlogging', ward: 'Ward 14', category: 'Drainage', priority: 98, estBudget: '₹4.5L', status: 'Pending Review' },
    { id: 'AI-775', title: 'Hostel Safety Audit', ward: 'Ward 22', category: 'Security', priority: 95, estBudget: '₹2.1L', status: 'Pending Review' },
    { id: 'AI-776', title: 'Chambal Bridge Repair', ward: 'Ward 08', category: 'Infrastructure', priority: 92, estBudget: '₹12.5L', status: 'Approved' },
    { id: 'AI-777', title: 'Power Cuts (48hr+)', ward: 'Ward 19', category: 'Electricity', priority: 89, estBudget: '₹1.0L', status: 'Assigned' },
    { id: 'AI-778', title: 'Toxic Waste Dump', ward: 'Ward 03', category: 'Sanitation', priority: 85, estBudget: '₹8.0L', status: 'Pending Review' },
  ]);

  const [complaintsList, setComplaintsList] = useState([
    { id: 'CMP-2024-8901', citizen: 'Rahul S.', ward: 'Ward 14', category: 'Water', severity: 'High', status: 'Open', date: 'Oct 12', dept: 'Jal Board' },
    { id: 'CMP-2024-8902', citizen: 'Priya M.', ward: 'Ward 22', category: 'Roads', severity: 'Critical', status: 'In Progress', date: 'Oct 11', dept: 'PWD' },
    { id: 'CMP-2024-8903', citizen: 'Amit K.', ward: 'Ward 08', category: 'Electricity', severity: 'Medium', status: 'Resolved', date: 'Oct 10', dept: 'Power Dept' },
    { id: 'CMP-2024-8904', citizen: 'Sneha R.', ward: 'Ward 19', category: 'Sanitation', severity: 'High', status: 'Open', date: 'Oct 09', dept: 'Municipal Corp' },
    { id: 'CMP-2024-8905', citizen: 'Vikram B.', ward: 'Ward 03', category: 'Security', severity: 'Low', status: 'Open', date: 'Oct 08', dept: 'Police' },
    { id: 'CMP-2024-8906', citizen: 'Anita D.', ward: 'Ward 14', category: 'Water', severity: 'Medium', status: 'Resolved', date: 'Oct 07', dept: 'Jal Board' },
    { id: 'CMP-2024-8907', citizen: 'Rajesh P.', ward: 'Ward 22', category: 'Roads', severity: 'High', status: 'Open', date: 'Oct 06', dept: 'PWD' },
    { id: 'CMP-2024-8908', citizen: 'Sunita L.', ward: 'Ward 08', category: 'Electricity', severity: 'Critical', status: 'In Progress', date: 'Oct 05', dept: 'Power Dept' },
  ]);

  const activeProject = aiQueue.find(p => p.id === activeProjectId) || aiQueue[0];

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
          <img src={logo} alt="JanVaani AI Logo" className="h-10 w-10 mr-3" />
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
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-red-600 hover:bg-red-50 hover:text-red-700 mt-2 border border-red-100"
          >
            <span className="text-red-500"><LogOut size={18}/></span> Secure Logout
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
              onChange={(e) => {
                setDateFilter(e.target.value);
                triggerAction(`Dashboard data filtered by: ${e.target.value}`);
              }}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim() !== '') {
                    triggerAction(`Searching records for: "${searchQuery}"...`);
                  }
                }}
              />
            </div>
            
            <div className="h-8 w-px bg-slate-200"></div>
            
            <div className="relative group cursor-pointer" onClick={() => setActiveNav('Settings')}>
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-black text-slate-900">{mpSession.name}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{mpSession.role || 'Member of Parliament'}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all uppercase">
                  {mpSession.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
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
              
              {/* AI Morning Brief */}
              {morningBrief && (
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-8 rounded-3xl shadow-lg relative overflow-hidden mb-2 text-white group">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-1">Good Morning, {morningBrief.mp_name}</h2>
                    <p className="text-blue-200 font-bold mb-6 flex items-center gap-2"><Sparkles size={16}/> {morningBrief.title}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {morningBrief.bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-3 text-lg font-medium">
                          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
                          {b}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="bg-black/20 px-4 py-2 rounded-xl border border-white/10">
                        <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-0.5">Est. Impact</span>
                        <span className="text-lg font-black">{morningBrief.estimated_impact}</span>
                      </div>
                      <span className="bg-red-500/20 text-red-100 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold">
                        {morningBrief.priority} Priority
                      </span>
                      <span className="bg-blue-500/20 text-blue-100 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
                        AI Generated
                      </span>
                      <span className="bg-blue-500/20 text-blue-100 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
                        This Month
                      </span>
                    </div>

                    <button onClick={() => setActiveNav('Projects')} className="mt-8 bg-white text-indigo-900 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                      View Recommended Action
                    </button>
                  </div>
                </div>
              )}

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
                  <div className="relative z-10 flex-1">
                    <div className="inline-flex items-center gap-2 bg-blue-500/30 px-3 py-1.5 rounded-lg text-blue-200 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-400/30">
                      <Cpu size={14}/> Recommendation of the Day
                    </div>
                    <h3 className="text-2xl font-black mb-2">{aiRecommendation?.recommendedProject || 'Severe Waterlogging in Ward 14'}</h3>
                    <p className="text-blue-200 text-sm font-medium mb-6 line-clamp-2">{aiRecommendation?.reasoning || 'AI predicts catastrophic road damage if not resolved before upcoming monsoon. Immediate drainage clearance required.'}</p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Impact</span>
                        <span className="text-xl font-black text-white">{aiRecommendation?.estimatedImpact || 'High'}</span>
                      </div>
                      <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-1">Est. Budget Priority</span>
                        <span className="text-xl font-black text-white">{aiRecommendation?.budgetPriority || 'High'}</span>
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



            </div>
          )}

          {/* ==============================================
              TAB: AI INSIGHTS
              ============================================== */}
          {activeNav === 'AI Insights' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col min-h-[600px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-100 pb-8">
                <div>
                  <div className="flex gap-2 mb-3">
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg text-blue-700 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      <BrainCircuit size={14}/> AI Explainability Panel
                    </div>
                    {aiActionStatus !== 'Pending' && (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                        aiActionStatus === 'Approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                      }`}>
                        Status: {aiActionStatus}
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">{aiRecommendation?.recommendedProject || 'Severe Waterlogging in Ward 14'}</h2>
                  <p className="text-slate-500 font-medium mt-2">Analyzed from 342 individual complaints across 3 platforms.</p>
                </div>
                <div className="bg-slate-900 text-white p-4 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Priority Score</span>
                  <span className="text-4xl font-black">{aiExplainability?.priorityScore || 98}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 flex-1">
                <div className="lg:col-span-2 space-y-12">
                  
                  {/* Root Cause & Clustering */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Network size={16}/> Root Cause</h4>
                      <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        {aiExplainability?.mainReason || 'Historical data indicates the primary drainage arterial under MG Road has collapsed. Recent urban construction (Project ID: 882) likely weakened the structural integrity.'}
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
                      <span className="text-base font-black text-slate-900">{aiExplainability?.responsibleDepartment || 'Public Works (PWD)'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Action</span>
                      <span className="text-base font-black text-slate-900">{aiExplainability?.recommendedAction || 'Immediate drainage clearance'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Similar Historical Case</span>
                      <span className="text-sm font-bold text-blue-600 underline cursor-pointer">View 2021 MG Road Repair</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Workflow Status</h4>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold mb-6 bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">AI Recommended</span>
                    <ArrowRight size={14} className="text-slate-300"/>
                    <span className={`px-2 py-1 rounded ${aiActionStatus === 'Pending' ? 'text-slate-400' : 'text-blue-600 bg-blue-50'}`}>
                      {aiActionStatus === 'Manual Review' ? 'Manual Review' : 'Approved'}
                    </span>
                    {aiActionStatus === 'Approved' && (
                      <>
                        <ArrowRight size={14} className="text-slate-300"/>
                        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Department Assigned</span>
                      </>
                    )}
                  </div>
                  
                  {aiActionStatus === 'Pending' ? (
                    <div className="mt-2 space-y-3">
                      <button onClick={() => setActiveModal('ApproveRecommendation')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                        Approve Recommendation
                      </button>
                      <button onClick={() => setActiveModal('ManualReview')} className="w-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-4 rounded-xl shadow-sm transition-all text-sm">
                        Flag for Manual Review
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                       <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-100 text-center font-bold text-sm">
                         <CheckCircle2 size={18} className="inline mr-2" />
                         {aiActionStatus === 'Approved' ? 'Recommendation Approved & Assigned' : 'Sent for Field Verification'}
                       </div>
                    </div>
                  )}

                  {aiActionStatus !== 'Pending' && (
                    <div className="mt-6 border-t border-slate-100 pt-6">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Activity Log</h4>
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        {aiActionStatus === 'Approved' ? 'MP approved recommendation and assigned to PWD' : 'Sent for field verification'}
                      </div>
                    </div>
                  )}
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
                <select value={compCategory} onChange={e => setCompCategory(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Categories</option>
                  <option>Water</option>
                  <option>Roads</option>
                  <option>Electricity</option>
                  <option>Sanitation</option>
                  <option>Security</option>
                </select>
                <select value={compStatus} onChange={e => setCompStatus(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Statuses</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <select value={compSort} onChange={e => setCompSort(e.target.value)} className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                      {complaintsList.filter(comp => {
                        if (compCategory !== 'All Categories' && comp.category !== compCategory) return false;
                        if (compStatus !== 'All Statuses' && comp.status !== compStatus) return false;
                        return true;
                      }).sort((a, b) => {
                        if (compSort === 'Sort by: Severity') {
                           const severityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
                           return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
                        }
                        return b.id.localeCompare(a.id);
                      }).map((comp) => (
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
                            <button onClick={() => { setActiveComplaint(comp); setActiveModal('ComplaintDetails'); }} className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 w-full">
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
              
              {/* Interactive Heatmap Section */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2"><MapPin size={20} className="text-blue-600"/> Live AI Hotspot Map</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Real-time geographical analysis of complaints in Kota Constituency.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="bg-white border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50 shadow-sm">
                      <Download size={16}/> Export GIS Data
                    </button>
                  </div>
                </div>
                
                {/* Filters & Legend */}
                <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Water', 'Road', 'Electricity', 'Sanitation', 'Healthcare'].map((filter) => (
                      <button key={filter} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${filter === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        {filter}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical Zone</div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Monitor Zone</div>
                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> Resolved Zone</div>
                  </div>
                </div>

                {/* The Map */}
                <div style={{ height: '450px', width: '100%', position: 'relative', zIndex: 10 }}>
                  <MapWrapper center={[25.18, 75.83]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    {mpHotspots.map(hotspot => (
                      <Marker key={hotspot.id} position={[hotspot.latitude, hotspot.longitude]} icon={getColoredIcon(hotspot.color || (hotspot.priority_score > 90 ? 'red' : hotspot.priority_score > 60 ? 'orange' : 'green'))}>
                        <Popup className="custom-popup">
                          <div className="p-1 min-w-[220px]">
                            <h3 className="font-black text-slate-900 text-base mb-1">{hotspot.ward}</h3>
                            <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest border-b border-slate-100 pb-2">Zone Analysis</div>
                            <div className="space-y-2 mb-3">
                              <div className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Active Complaints</span><span className="font-bold text-slate-900">{hotspot.count || hotspot.supporters}</span></div>
                              <div className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Top Category</span><span className="font-bold text-slate-900">{hotspot.category || hotspot.topIssue}</span></div>
                              <div className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">AI Priority Score</span><span className="font-black text-red-500">{hotspot.priority_score}</span></div>
                              <div className="flex justify-between items-center text-sm"><span className="text-slate-600 font-medium">Citizens Affected</span><span className="font-bold text-slate-900">{hotspot.citizens_affected}</span></div>
                            </div>
                            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 shadow-sm">
                              Open Details <ChevronRight size={14}/>
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapWrapper>
                </div>
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
                     <div key={idx} onClick={() => setActiveProjectId(proj.id)} className={`p-6 rounded-2xl border ${proj.id === activeProjectId ? 'bg-blue-50 border-blue-200 shadow-sm ring-1 ring-blue-500' : 'bg-white border-slate-200'} cursor-pointer hover:border-blue-300 transition-colors`}>
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
                      { 
                        title: "Executive Review", 
                        active: projectStatus === 'Executive Review' || projectStatus === 'Manual Review', 
                        done: projectStatus === 'Work Commenced', 
                        time: projectStatus === 'Executive Review' ? "Pending Action" : (projectStatus === 'Manual Review' ? "Manual Verification" : "Approved") 
                      },
                      { 
                        title: "Department Assigned", 
                        active: projectStatus === 'Work Commenced', 
                        done: projectStatus === 'Work Commenced', 
                        time: projectStatus === 'Work Commenced' ? "Notified" : "Awaiting approval" 
                      },
                      { 
                        title: "Work Commenced", 
                        active: projectStatus === 'Work Commenced', 
                        done: false, 
                        time: projectStatus === 'Work Commenced' ? "Active" : "Not started" 
                      },
                      { title: "Project Completed", active: false, done: false, time: "Pending" }
                    ].map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-6">
                        <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-[6px] border-white shadow-sm ${step.done ? 'bg-blue-600' : step.active ? (projectStatus === 'Manual Review' && step.title === 'Executive Review' ? 'bg-orange-100 border-orange-200 text-orange-600' : 'bg-blue-100 border-blue-200 text-blue-600') : 'bg-slate-200'}`}>
                          {step.done ? <CheckCircle2 size={14} className="text-white"/> : (projectStatus === 'Manual Review' && step.title === 'Executive Review' ? <span className="font-bold text-xs">🔄</span> : null)}
                        </div>
                        <div className="flex flex-col pt-1 w-full max-w-sm">
                          <span className={`font-extrabold text-base ${step.active || step.done ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</span>
                          {step.time && (
                            <span className={`inline-block mt-2 text-xs font-bold w-fit ${step.time === 'Pending Action' ? 'text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md' : step.time === 'Manual Verification' ? 'text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1 rounded-md' : step.time === 'Approved' ? 'text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-md' : 'text-slate-500'}`}>{step.time}</span>
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
                      <span className="text-xl font-black text-slate-900">{activeProject.estBudget}</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                      <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Timeline</span>
                      <span className="text-xl font-black text-slate-900">15-30 Days</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto">
                    {projectStatus === 'Work Commenced' ? (
                       <div className="w-full bg-green-50 text-green-700 font-bold py-4 rounded-xl shadow-sm border border-green-200 flex items-center justify-center gap-2">
                         <CheckCircle2 size={20}/> Project Approved
                       </div>
                    ) : projectStatus === 'Manual Review' ? (
                       <div className="w-full bg-orange-50 text-orange-700 font-bold py-4 rounded-xl shadow-sm border border-orange-200 flex items-center justify-center gap-2">
                         <ShieldAlert size={20}/> Under Review
                       </div>
                    ) : (
                      <>
                        <button onClick={() => setActiveModal('ApproveProject')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all text-base flex items-center justify-center gap-2 hover:-translate-y-0.5">
                          Approve & Disburse Funds <ArrowRight size={20}/>
                        </button>
                        <div className="grid grid-cols-1">
                          <button onClick={() => setActiveModal('ProjectManualReview')} className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold py-4 rounded-xl transition-colors shadow-sm text-sm">Flag for Review</button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Activity</h4>
                    <div className="space-y-4">
                      {projectActivity.map((act, i) => (
                        <div key={i} className="flex gap-4">
                           <span className="text-xs font-bold text-slate-400 w-16 shrink-0 pt-0.5">{act.time}</span>
                           <span className="text-sm font-medium text-slate-700 leading-tight">{act.text}</span>
                        </div>
                      ))}
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
            <AIReportModule mpSession={mpSession} onBack={() => setActiveNav('Executive Overview')} />
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
                     {feedbacks.map((feed, idx) => (
                       <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 relative overflow-hidden">
                         {feed.flagged && <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-bl-lg shadow-sm">Flagged for Review</div>}
                         <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                           {feed.citizen_id.charAt(0).toUpperCase()}
                         </div>
                         <div className="flex-1">
                           <div className="flex justify-between items-start mb-1">
                             <div>
                               <span className="font-bold text-slate-900 mr-2">{feed.citizen_id}</span>
                               <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">{feed.complaint_id}</span>
                             </div>
                             <span className="text-xs font-medium text-slate-400">{feed.created_at}</span>
                           </div>
                           <p className="text-sm text-slate-700 leading-relaxed mt-2">{feed.comment}</p>
                           <div className="mt-3 inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border" style={{
                             borderColor: feed.sentiment?.toLowerCase() === 'positive' ? '#bbf7d0' : feed.sentiment?.toLowerCase() === 'negative' ? '#fecaca' : '#e2e8f0',
                             backgroundColor: feed.sentiment?.toLowerCase() === 'positive' ? '#f0fdf4' : feed.sentiment?.toLowerCase() === 'negative' ? '#fef2f2' : '#f8fafc',
                             color: feed.sentiment?.toLowerCase() === 'positive' ? '#166534' : feed.sentiment?.toLowerCase() === 'negative' ? '#991b1b' : '#475569',
                           }}>
                             AI Sentiment: {feed.sentiment || "Neutral"}
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
                          <span>{feedbackSummary.positive}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-green-400 h-2 rounded-full transition-all duration-1000" style={{width: `${feedbackSummary.positive}%`}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-red-400">Negative / Frustrated</span>
                          <span>{feedbackSummary.negative}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-red-400 h-2 rounded-full transition-all duration-1000" style={{width: `${feedbackSummary.negative}%`}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-400">Neutral / Inquiries</span>
                          <span>{feedbackSummary.neutral}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2"><div className="bg-slate-400 h-2 rounded-full transition-all duration-1000" style={{width: `${feedbackSummary.neutral}%`}}></div></div>
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
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white text-3xl font-black shadow-lg uppercase">
                  {mpSession.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{mpSession.name}</h3>
                  <p className="text-slate-500 font-medium">{mpSession.role || 'Member of Parliament'} • {mpSession.constituency || 'Kota Constituency'}</p>
                  <button 
                    onClick={() => {
                      setEditProfileForm(mpSession);
                      setActiveModal('EditProfile');
                    }} 
                    className="mt-3 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg"
                  >
                    Edit Profile Details
                  </button>
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
                    <div 
                      onClick={() => setNotificationPrefs(prev => ({ ...prev, [pref.title]: !prev[pref.title] }))}
                      className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-200 ${notificationPrefs[pref.title] ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${notificationPrefs[pref.title] ? 'right-1' : 'left-1'}`}></div>
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
                  {q: "How does the AI determine issue priority?", a: "The JanVaani AI analyzes multiple factors including severity of citizen reports, frequency of complaints, potential infrastructure damage, and weather patterns to automatically assign a priority score from 0-100."},
                  {q: "How do I authorize funds for a department?", a: "Navigate to the 'Projects' tab, select an active project under 'Executive Review', review the budget estimate, and click 'Approve & Disburse Funds' to digitally authorize the transaction to the respective department."},
                  {q: "Can I export the live heatmap data?", a: "Yes. Go to the 'Analytics' tab and click on the 'Export GIS Data' button on the top right of the map to download a GeoJSON or CSV file of current active issues."},
                  {q: "How to manage team access and permissions?", a: "Go to Settings > Team Management. Here you can invite secretariat staff and assign them roles like 'Viewer', 'Analyst', or 'Approver'."}
                ].map((faq, i) => (
                  <div key={i} className="mb-3">
                    <div onClick={() => setActiveFaq(activeFaq === i ? null : i)} className={`flex justify-between items-center p-5 bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors ${activeFaq === i ? 'rounded-t-xl' : 'rounded-xl'}`}>
                      <span className={`font-bold ${activeFaq === i ? 'text-blue-600' : 'text-slate-800'}`}>{faq.q}</span>
                      <ChevronRight size={18} className={`transition-transform duration-200 ${activeFaq === i ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
                    </div>
                    {activeFaq === i && (
                      <div className="p-5 bg-white border-x border-b border-slate-100 rounded-b-xl text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-black text-blue-900 mb-1">Still need help?</h4>
                  <p className="text-sm font-medium text-blue-700">Contact the dedicated JanVaani government support team.</p>
                </div>
                <button onClick={() => window.location.href = "mailto:support@janvaani.gov.in?subject=MP%20Dashboard%20Support%20Request"} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all">
                  Contact Support
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: Approve Recommendation */}
      {activeModal === 'ApproveRecommendation' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={24} /> Approve AI Recommendation?
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white space-y-4">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project</span>
                  <span className="font-black text-slate-900">Severe Waterlogging in Ward 14</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recommended Dept</label>
                    <select 
                      value={assignedDept}
                      onChange={(e) => setAssignedDept(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-800 font-bold text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="Public Works (PWD)">Public Works (PWD)</option>
                      <option value="Jal Board">Jal Board</option>
                      <option value="Municipal Corporation">Municipal Corporation</option>
                      <option value="Electricity Board">Electricity Board</option>
                    </select>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority Score</span>
                    <span className="font-black text-red-500 text-2xl mt-1 block">98</span>
                  </div>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Budget</label>
                  <input 
                    type="text" 
                    value={assignedBudget}
                    onChange={(e) => setAssignedBudget(e.target.value)}
                    className="w-full text-center bg-white border border-slate-200 text-slate-900 font-black text-lg rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                  />
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Cancel
               </button>
               <button onClick={() => {
                 setAiActionStatus('Approved');
                 triggerAction(`Recommendation approved and assigned to ${assignedDept}.`);
               }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                 Approve & Assign Department
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Flag for Manual Review */}
      {activeModal === 'ManualReview' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <ShieldAlert className="text-orange-500" size={24} /> Send for Field Verification
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white space-y-5">
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Reason for manual review</label>
                 <textarea 
                   placeholder="Add reason for manual review..."
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                 ></textarea>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Assign verification to</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 transition-colors">
                   <option>Public Works Engineer</option>
                   <option>Municipal Officer</option>
                   <option>District Admin</option>
                 </select>
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Cancel
               </button>
               <button onClick={() => {
                 setAiActionStatus('Manual Review');
                 triggerAction('Issue sent for field verification.');
               }} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                 Send for Verification
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Approve Project */}
      {activeModal === 'ApproveProject' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            {isEditingProject ? (
              <>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Pencil className="text-blue-600" size={24} /> Edit Project Details
                  </h3>
                  <button onClick={() => setIsEditingProject(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 bg-white space-y-4">
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                     <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Title</span>
                     <input type="text" value={editedProject?.title || ''} onChange={e => setEditedProject({...editedProject, title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-500" />
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                     <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Budget</span>
                     <input type="text" value={editedProject?.estBudget || ''} onChange={e => setEditedProject({...editedProject, estBudget: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:border-blue-500" />
                   </div>
                </div>
                <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                   <button onClick={() => setIsEditingProject(false)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                     Cancel
                   </button>
                   <button onClick={() => {
                     setAiQueue(aiQueue.map(p => p.id === editedProject.id ? editedProject : p));
                     setIsEditingProject(false);
                     triggerAction('Project details updated successfully!');
                   }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                     Save Changes
                   </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="text-blue-600" size={24} /> Approve Project Funding
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setIsEditingProject(true); setEditedProject({...activeProject}); }} className="text-slate-400 hover:text-blue-600 transition-colors p-1" title="Edit Project">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-1" title="Close">
                      <X size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-6 bg-white space-y-4">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project</span>
                  <span className="font-black text-slate-900">{activeProject.title} – {activeProject.ward}</span>
               </div>
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Department</span>
                 <span className="font-bold text-slate-800">Public Works Department (PWD)</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Budget</span>
                    <span className="font-black text-slate-900 text-xl">{activeProject.estBudget}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expected Timeline</span>
                    <span className="font-bold text-slate-800">15–30 Days</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AI Confidence</span>
                    <span className="font-black text-blue-600">{activeProject.priority}%</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority</span>
                    <span className="font-black text-red-500">High</span>
                  </div>
               </div>
            </div>
                <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                   <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                     Cancel
                   </button>
                   <button onClick={async () => {
                     try {
                       await workflowService.approveComplaint(activeProjectId);
                       await workflowService.assignDepartment(activeProjectId, 'PWD');
                       await workflowService.startWork(activeProjectId);
                       setProjectStatus('Work Commenced');
                       setProjectActivity(prev => [
                         ...prev,
                         { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: 'Executive approved funding' },
                         { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: 'Department notified' },
                         { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: 'Project moved to Work Commenced' }
                       ]);
                       triggerAction('Project approved. Funds sanctioned successfully. Department notified.');
                     } catch (err) {
                       triggerAction('Failed to approve project. Performing optimistic update.');
                     }
                   }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                     Approve Project
                   </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Send Project for Manual Review */}
      {activeModal === 'ProjectManualReview' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <ShieldAlert className="text-orange-500" size={24} /> Send Project for Manual Review
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white space-y-5">
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Reason</label>
                 <textarea 
                   placeholder="Enter reason for review..."
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                 ></textarea>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Assign Reviewer</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 transition-colors">
                   <option>District Engineer</option>
                   <option>Municipal Commissioner</option>
                   <option>Executive Engineer</option>
                   <option>Chief Planning Officer</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Priority</label>
                 <div className="flex gap-4">
                   <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="radio" name="priority" className="accent-blue-600"/> Normal</label>
                   <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="radio" name="priority" className="accent-blue-600" defaultChecked/> High</label>
                   <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="radio" name="priority" className="accent-blue-600"/> Critical</label>
                 </div>
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Cancel
               </button>
               <button onClick={async () => {
                 try {
                   // Optimistic UI updates
                   setProjectStatus('Manual Review');
                   setProjectActivity(prev => [
                     ...prev,
                     { time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: 'Project sent for manual verification.' }
                   ]);
                   triggerAction('Project sent for manual verification.');
                   setActiveModal(null);
                 } catch (err) {
                   triggerAction('Failed to send for review.');
                 }
               }} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                 Send for Review
               </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'EditProfile' && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-8 pb-6 border-b border-slate-100">
               <h3 className="text-2xl font-black text-slate-900">Edit Profile</h3>
               <p className="text-slate-500 font-medium mt-2">Update your dashboard details.</p>
            </div>
            <div className="p-8 space-y-6">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                 <input type="text" value={editProfileForm.name || ''} onChange={e => setEditProfileForm({...editProfileForm, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-blue-500"/>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role</label>
                 <input type="text" value={editProfileForm.role || ''} onChange={e => setEditProfileForm({...editProfileForm, role: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-blue-500"/>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Constituency / Area</label>
                 <input type="text" value={editProfileForm.constituency || ''} onChange={e => setEditProfileForm({...editProfileForm, constituency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-blue-500"/>
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Cancel
               </button>
               <button onClick={() => {
                 setMpSession(editProfileForm);
                 localStorage.setItem('mp_session', JSON.stringify(editProfileForm));
                 setActiveModal(null);
                 triggerAction('Profile updated successfully!');
               }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                 Save Changes
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Custom AI Summary */}
      {activeModal === 'CustomAISummary' && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BrainCircuit className="text-blue-600" size={24} /> Generate Custom AI Summary
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white space-y-5">
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Focus Area</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 transition-colors">
                   <option>Infrastructure & Roads</option>
                   <option>Water & Sanitation</option>
                   <option>Public Safety</option>
                   <option>Overall Performance</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Additional Instructions</label>
                 <textarea 
                   placeholder="E.g., Highlight issues in Ward 14..."
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors h-24 resize-none"
                 ></textarea>
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Cancel
               </button>
               <button onClick={() => {
                 triggerAction('AI Summary generated successfully! (Simulated)');
               }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors flex items-center gap-2">
                 Generate Summary <ArrowRight size={18}/>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Complaint Details */}
      {activeModal === 'ComplaintDetails' && activeComplaint && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <AlertTriangle className="text-blue-600" size={24} /> Complaint Details
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 bg-white space-y-5">
               <div className="flex justify-between items-start">
                 <div>
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Complaint ID</span>
                   <span className="font-black text-slate-900 text-lg">{activeComplaint.id}</span>
                 </div>
                 <div className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest ${
                   activeComplaint.status === 'Open' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                   activeComplaint.status === 'In Progress' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                   'bg-emerald-50 text-emerald-700 border border-emerald-100'
                 }`}>
                   {activeComplaint.status}
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Citizen</span>
                   <span className="font-bold text-slate-800">{activeComplaint.citizen}</span>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</span>
                   <span className="font-bold text-slate-800">{activeComplaint.ward}</span>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</span>
                   <span className="font-bold text-slate-800">{activeComplaint.category}</span>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Severity</span>
                   <span className={`font-black ${
                     activeComplaint.severity === 'Critical' ? 'text-red-600' :
                     activeComplaint.severity === 'High' ? 'text-orange-600' :
                     activeComplaint.severity === 'Medium' ? 'text-yellow-600' :
                     'text-slate-600'
                   }`}>{activeComplaint.severity}</span>
                 </div>
               </div>

               <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Department</span>
                 <span className="font-bold text-slate-800">{activeComplaint.dept}</span>
               </div>

               <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex justify-between items-center">
                 <div>
                   <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Citizen Notified via SMS</span>
                   <span className="font-bold text-slate-800 text-sm">Yes (Automated Updates)</span>
                 </div>
                 <div className="text-right">
                   <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latest SMS Status</span>
                   <span className="font-black text-green-600 flex items-center justify-end gap-1 text-sm"><CheckCircle2 size={14}/> Delivered</span>
                 </div>
               </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
               <button onClick={() => setActiveModal(null)} className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
                 Close
               </button>
               {activeComplaint.status !== 'Resolved' && (
                 <button onClick={() => {
                   const updatedComplaint = { ...activeComplaint, severity: 'Critical' };
                   setComplaintsList(prev => prev.map(c => c.id === updatedComplaint.id ? updatedComplaint : c));
                   setActiveComplaint(updatedComplaint);
                   triggerAction('Complaint escalated to Critical priority!');
                 }} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold rounded-xl shadow-md transition-colors">
                   Escalate Issue
                 </button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING AI CHAT */}
      <div className="fixed bottom-8 right-8 z-[100]">
        {chatOpen ? (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[380px] h-[550px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg flex items-center gap-2"><MessageSquare size={18}/> Ask JanVaani AI</h3>
                <p className="text-xs text-blue-100 font-medium">AI assistant for constituency decisions</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {chatHistory.length === 0 && (
                <div className="flex flex-col gap-2">
                  {[
                    "Which ward needs immediate attention?",
                    "How many road complaints are pending?",
                    "Generate monthly report",
                    "Predict next month's complaints",
                    "Show top priority issues",
                    "Explain why Rampura is priority #1"
                  ].map((chip, idx) => (
                    <button key={idx} onClick={() => handleChatSubmit(chip)} className="bg-white border border-slate-200 text-slate-700 text-sm font-bold p-2.5 rounded-xl text-left hover:bg-slate-100 transition-colors shadow-sm">
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 max-w-[85%] rounded-2xl text-sm font-medium ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                   <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                     <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '100ms'}}></div>
                     <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
                   </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="Ask a question..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit(chatMessage)}
                />
                <button onClick={() => handleChatSubmit(chatMessage)} className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors">
                  <ArrowRight size={18}/>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setChatOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-full shadow-xl flex items-center gap-3 font-bold transition-all hover:scale-105">
            <MessageSquare size={24}/> Ask JanVaani AI
          </button>
        )}
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
