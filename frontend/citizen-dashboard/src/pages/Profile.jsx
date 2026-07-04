import React, { useState } from 'react';
import { ArrowLeft, Edit3, ShieldAlert, FileText, Bell, Globe, HelpCircle, LogOut, Phone, MapPin, Mail, ChevronRight, Activity, CheckCircle2, AlertCircle, ThumbsUp, X, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const myComplaints = [
  { id: "JV-2026-001245", title: "Water Supply Complaint", location: "Sector 4 Main Road", date: "Oct 12, 2026", status: "Under Review", priority: "High", statusColor: "text-yellow-600 bg-yellow-100" },
  { id: "JV-2026-000892", title: "Potholes on Link Road", location: "Sector 4, Block B", date: "Sep 28, 2026", status: "Resolved", priority: "Medium", statusColor: "text-green-600 bg-green-100" }
];

const supportedIssues = [
  { title: "No Electricity for 12 hours", location: "Rampura Main", status: "In Progress", supporters: 342 },
  { title: "Garbage pile up near school", location: "Gandhi Nagar", status: "Under Review", supporters: 156 }
];

const languages = [
  "English",
  "हिन्दी (Hindi)",
  "বাংলা (Bengali)",
  "తెలుగు (Telugu)",
  "मराठी (Marathi)",
  "தமிழ் (Tamil)",
  "ગુજરાતી (Gujarati)",
  "ಕನ್ನಡ (Kannada)",
  "മലയാളം (Malayalam)",
  "ਪੰਜਾਬੀ (Punjabi)",
  "ଓଡ଼ିଆ (Odia)",
  "অসমীয়া (Assamese)",
  "اردو (Urdu)",
  "संस्कृत (Sanskrit)",
  "Other (Please Specify)"
];

const helpContent = {
  "Frequently Asked Questions": "Q: How do I track my complaint?\nA: You can track your complaint using the 'Track Complaint' button on the dashboard or by going to the 'My Complaints' section in your profile.\n\nQ: How long does it take for an issue to be resolved?\nA: Most high-priority issues are reviewed within 48 hours. Resolution time depends on the complexity of the complaint.",
  "Contact Support": "Email: support@janvaani.gov.in\nHelpline: 1800-123-4567\nOperating Hours: 9 AM to 6 PM (Monday - Saturday)\n\nFor emergency services, please contact your local authorities directly.",
  "Privacy Policy": "Your privacy is important to us.\nWe only collect data necessary to process your civic complaints. Your personal identity can be anonymized upon request for sensitive reports. We do not share your data with third-party advertisers.",
  "Terms & Conditions": "By using JanVaani AI, you agree to submit truthful and accurate civic reports. Submitting false reports may lead to an account ban. We reserve the right to moderate content submitted to the platform.",
  "About JanVaani AI": "JanVaani AI is a next-generation civic engagement platform powered by artificial intelligence. Our goal is to bridge the gap between citizens and authorities through seamless voice reporting and automated tracking."
};

const Profile = () => {
  const navigate = useNavigate();
  
  // States
  const [notifications, setNotifications] = useState({
    sms: true,
    push: true,
    ai: true,
    weekly: false
  });

  // Read from localStorage or use fallback if not found
  const getInitialProfile = () => {
    const saved = localStorage.getItem('janvaani_citizen_profile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      fullName: "Ramesh Chand",
      mobileNumber: "+91 98765 43210",
      emailAddress: "ramesh.c@example.com",
      residentialAddress: "12/A, Gandhi Nagar, Sector 4",
      constituency: "Ward 12, West Zone",
      preferredLanguage: "English"
    };
  };

  const [userInfo, setUserInfo] = useState(getInitialProfile());

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editForm, setEditForm] = useState({ ...userInfo });

  const [selectedLanguage, setSelectedLanguage] = useState(userInfo.preferredLanguage);
  const [customLanguage, setCustomLanguage] = useState("");
  
  const [activeHelpItem, setActiveHelpItem] = useState(null);

  // Handlers
  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveInfo = () => {
    setUserInfo({ ...editForm });
    setSelectedLanguage(editForm.preferredLanguage);
    setIsEditingInfo(false);
    
    // Save to local storage
    const currentProfile = JSON.parse(localStorage.getItem('janvaani_citizen_profile') || '{}');
    localStorage.setItem('janvaani_citizen_profile', JSON.stringify({ ...currentProfile, ...editForm }));
  };

  const handleCancelInfo = () => {
    setEditForm({ ...userInfo });
    setIsEditingInfo(false);
  };

  const handleSaveLanguage = () => {
    const finalLang = selectedLanguage === "Other" ? customLanguage : selectedLanguage;
    setUserInfo(prev => ({ ...prev, preferredLanguage: finalLang }));
    // If they typed something in "Other", we'll just consider it saved globally
    if (selectedLanguage !== "Other") {
       setEditForm(prev => ({ ...prev, preferredLanguage: finalLang }));
    }
    
    // Save to local storage
    const currentProfile = JSON.parse(localStorage.getItem('janvaani_citizen_profile') || '{}');
    localStorage.setItem('janvaani_citizen_profile', JSON.stringify({ ...currentProfile, preferredLanguage: finalLang }));
  };

  const handleResetRegistration = () => {
    if (window.confirm("Are you sure you want to reset your registration on this device? All local data will be cleared and you will be logged out.")) {
      localStorage.removeItem('janvaani_citizen_profile');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative pb-32">
      
      {/* Header */}
      <header className="bg-white/90 sticky top-0 z-50 pt-4 pb-3 px-4 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/citizen')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 tracking-tight leading-tight text-lg">Citizen Profile</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        
        {/* 1. Profile Header */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 relative">
          <button 
            onClick={() => setIsEditingInfo(true)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <Edit3 size={18} />
          </button>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md overflow-hidden flex shrink-0 items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-400">RC</span>
            </div>
            
            <div className="mt-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{userInfo.fullName}</h1>
              <p className="text-slate-500 font-medium mt-1">{userInfo.mobileNumber}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <MapPin size={12} /> {userInfo.constituency}
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                  <Globe size={12} /> {userInfo.preferredLanguage}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Government Identity Verification */}
        {userInfo.govIdType && userInfo.govIdNumber ? (
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <ShieldAlert size={24} className="text-emerald-500" />
                  <h2 className="text-lg font-extrabold text-slate-900">Government Identity Verified</h2>
                </div>
                <p className="text-sm font-bold text-emerald-600 mb-2">Linked: {userInfo.govIdType}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-emerald-100 text-emerald-800 font-mono font-bold px-3 py-1 rounded-lg">
                    {/* Mask ID: Show first 2 and last 4 characters, mask the rest */}
                    {userInfo.govIdNumber.slice(0, 2)}{'*'.repeat(Math.max(0, userInfo.govIdNumber.length - 6))}{userInfo.govIdNumber.slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-red-50 border border-red-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between text-center sm:text-left">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <ShieldAlert size={24} className="text-red-500" />
                  <h2 className="text-lg font-extrabold text-slate-900">Government Identity Verification</h2>
                </div>
                <p className="text-sm font-bold text-red-600 mb-2">Verification Status: Not Verified</p>
                <p className="text-slate-600 text-sm max-w-md">Verify your identity using a government-issued document to increase complaint credibility and help authorities process reports more efficiently.</p>
              </div>
              
              <button 
                onClick={() => navigate('/identity-verification')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl whitespace-nowrap transition-colors shadow-md w-full sm:w-auto mt-2 sm:mt-0 active:scale-95"
              >
                Verify Identity &rarr;
              </button>
            </div>
          </section>
        )}

        {/* 3. Personal Information */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-slate-900">Personal Information</h2>
            {!isEditingInfo && (
              <button onClick={() => setIsEditingInfo(true)} className="text-blue-600 text-sm font-bold hover:underline">Edit Info</button>
            )}
          </div>
          
          {isEditingInfo ? (
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</label>
                <input type="text" value={editForm.mobileNumber} onChange={e => setEditForm({...editForm, mobileNumber: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" value={editForm.emailAddress} onChange={e => setEditForm({...editForm, emailAddress: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Residential Address</label>
                <input type="text" value={editForm.residentialAddress} onChange={e => setEditForm({...editForm, residentialAddress: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Constituency</label>
                <input type="text" value={editForm.constituency} onChange={e => setEditForm({...editForm, constituency: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Language</label>
                <select value={editForm.preferredLanguage} onChange={e => setEditForm({...editForm, preferredLanguage: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500">
                  {languages.filter(l => l !== "Other").map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                <button onClick={handleCancelInfo} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
                <button onClick={handleSaveInfo} className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"><Save size={16}/> Save Changes</button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8 animate-in fade-in duration-200">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.fullName}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.mobileNumber}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.emailAddress}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Residential Address</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.residentialAddress}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Constituency</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.constituency}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Language</span>
                <span className="text-sm font-semibold text-slate-800">{userInfo.preferredLanguage}</span>
              </div>
            </div>
          )}
        </section>

        {/* 4. Complaint Statistics */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">Complaint Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900"><FileText size={80} /></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Complaints</span>
              <span className="text-3xl font-black text-slate-900 relative z-10">14</span>
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900"><Activity size={80} /></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active</span>
              <span className="text-3xl font-black text-slate-900 relative z-10">3</span>
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900"><CheckCircle2 size={80} /></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Resolved</span>
              <span className="text-3xl font-black text-slate-900 relative z-10">11</span>
            </div>
            <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900"><ThumbsUp size={80} /></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Supported Issues</span>
              <span className="text-3xl font-black text-slate-900 relative z-10">26</span>
            </div>
          </div>
        </section>

        {/* 5. My Complaints */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">My Complaints</h2>
            <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {myComplaints.map(complaint => (
              <div key={complaint.id} className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">{complaint.title}</h3>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1"><MapPin size={14}/> {complaint.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${complaint.statusColor}`}>
                    {complaint.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">ID</span>
                    <span className="text-sm font-semibold text-slate-800">{complaint.id}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date</span>
                    <span className="text-sm font-semibold text-slate-800">{complaint.date}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Priority</span>
                    <span className="text-sm font-semibold text-slate-800">{complaint.priority}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <button 
                    onClick={() => navigate('/track-complaint')}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold py-3 rounded-xl transition-colors border border-slate-200 text-sm"
                  >
                    Track Complaint
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Supported Issues */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1 mt-6">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Supported Issues</h2>
            <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {supportedIssues.map((issue, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-1">{issue.title}</h3>
                <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1"><MapPin size={12}/> {issue.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{issue.status}</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md flex items-center gap-1"><ThumbsUp size={12}/> {issue.supporters}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Notification Preferences */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 mt-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell size={20} className="text-slate-400" />
            <h2 className="text-lg font-extrabold text-slate-900">Notification Preferences</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { key: 'sms', label: 'SMS Updates' },
              { key: 'push', label: 'Push Notifications' },
              { key: 'ai', label: 'AI Recommendations' },
              { key: 'weekly', label: 'Weekly Progress Summary' }
            ].map(({key, label}) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm font-semibold text-slate-800">{label}</span>
                <button 
                  onClick={() => toggleNotification(key)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications[key] ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${notifications[key] ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Language Preferences */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-slate-400" />
              <h2 className="text-lg font-extrabold text-slate-900">Language Preferences</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {languages.map(lang => (
              <button 
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`py-3 px-4 rounded-2xl text-sm font-bold border transition-all ${
                  selectedLanguage === lang 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200 hover:bg-slate-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {selectedLanguage === "Other" && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-slate-800 mb-2">Enter your preferred language</label>
              <input 
                type="text" 
                value={customLanguage} 
                onChange={(e) => setCustomLanguage(e.target.value)}
                placeholder="Type language here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="border-t border-slate-100 pt-4 flex justify-end">
            <button 
              onClick={handleSaveLanguage}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md active:scale-95 text-sm"
            >
              Save Language
            </button>
          </div>
        </section>

        {/* 9. Help & Support */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200">
          <div className="p-6 pb-2 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900">Help & Support</h2>
          </div>
          
          <div className="flex flex-col">
            {Object.keys(helpContent).map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveHelpItem(item)}
                className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group text-left w-full cursor-pointer"
              >
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{item}</span>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              </button>
            ))}
          </div>
        </section>

        {/* 10. Factory Reset / Logout */}
        <div className="pt-4 pb-8">
          <button 
            onClick={handleResetRegistration}
            className="w-full bg-transparent border-2 border-red-500 text-red-600 hover:bg-red-50 active:bg-red-100 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={20} /> Reset Registration
          </button>
          <p className="text-center text-xs text-slate-400 mt-3 font-medium">This will clear your local registration profile on this device.</p>
        </div>

      </main>

      {/* Help Modal */}
      {activeHelpItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setActiveHelpItem(null)}></div>
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900">{activeHelpItem}</h3>
              <button onClick={() => setActiveHelpItem(null)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-slate-600 font-medium whitespace-pre-wrap leading-relaxed text-sm">
                {helpContent[activeHelpItem]}
              </p>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setActiveHelpItem(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
