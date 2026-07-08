import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { citizenService } from '../services/citizenService';

const MyComplaints = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await citizenService.getMyComplaints();
        setComplaints(data);
      } catch (err) {
        console.error("Failed to load complaints:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'resolved':
        return "text-emerald-700 bg-emerald-100";
      case 'pending':
        return "text-red-700 bg-red-100";
      default:
        return "text-yellow-700 bg-yellow-100";
    }
  };

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

        {isLoading ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 flex flex-col items-center">
            <p className="text-slate-500 font-medium mb-6">You have not submitted any complaints yet.</p>
            <button onClick={() => navigate('/submit-complaint')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-colors">
              Report an Issue
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{complaint.complaint_uid}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{complaint.department_id ? `Dept ${complaint.department_id}` : 'General'}</span>
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-2 capitalize">{complaint.title}</h3>
                   <p className="text-sm font-bold text-slate-500">Submitted: {new Date(complaint.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                   <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5">
                        <CheckCircle2 size={14}/> AI: {complaint.severity} Priority
                      </span>
                   </div>
                   <button onClick={() => navigate('/track-complaint', { state: { complaintId: complaint.id } })} className="w-full md:w-auto bg-slate-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95">
                     Track Complaint
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
