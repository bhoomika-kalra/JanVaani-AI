import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyComplaints = () => {
  const navigate = useNavigate();

  // Dummy Data for My Complaints
  const myComplaints = [
    { id: "JV-2026-001245", title: "Streetlight not working", category: "Electricity", date: "Oct 12, 2026", status: "Under Review", statusColor: "text-yellow-700 bg-yellow-100", aiRecommendation: "High Priority" },
    { id: "JV-2026-000892", title: "Potholes on Link Road", category: "Roads", date: "Sep 28, 2026", status: "Resolved", statusColor: "text-emerald-700 bg-emerald-100", aiRecommendation: "Standard" }
  ];

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans p-6 md:p-12 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/citizen')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-8">
          My Complaints
        </h1>

        <div className="flex flex-col gap-6">
          {myComplaints.filter(c => c.status !== "Resolved" && c.status !== "Completed").map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{complaint.id}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{complaint.category}</span>
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">{complaint.title}</h3>
                 <p className="text-sm font-bold text-slate-500">Submitted: {complaint.date}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                 <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${complaint.statusColor}`}>
                      {complaint.status}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5">
                      <CheckCircle2 size={14}/> AI: {complaint.aiRecommendation}
                    </span>
                 </div>
                 <button onClick={() => navigate('/track-complaint')} className="w-full md:w-auto bg-slate-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95">
                   Track Complaint
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
