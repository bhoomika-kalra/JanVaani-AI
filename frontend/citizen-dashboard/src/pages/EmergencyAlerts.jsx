import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Info, Zap, Droplets, CloudLightning, Activity, AlertOctagon, Car, Building2, ChevronDown, ChevronUp, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmergencyAlerts = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedAlert, setExpandedAlert] = useState(null);

  const filters = ['All', 'Critical', 'Weather', 'Traffic', 'Utilities', 'Health', 'Government'];

  const alerts = [
    {
      id: 1,
      title: "Water Supply Disruption",
      description: "Water supply will remain unavailable between 8:00 AM and 4:00 PM due to pipeline maintenance.",
      location: "Rampura Ward 12",
      date: "Today • 8:00 AM",
      severity: "High",
      type: "Utilities",
      icon: <Droplets size={24} />,
      color: "orange"
    },
    {
      id: 2,
      title: "Electricity Shutdown",
      description: "Scheduled maintenance by the Electricity Department.",
      location: "Sector 4",
      date: "Tomorrow • 10:00 AM",
      severity: "Medium",
      type: "Utilities",
      icon: <Zap size={24} />,
      color: "yellow"
    },
    {
      id: 3,
      title: "Heavy Rain Warning",
      description: "Heavy rainfall expected during the next 24 hours. Please stay indoors if possible and avoid low-lying areas.",
      location: "Entire Constituency",
      date: "Today",
      severity: "Critical",
      type: "Weather",
      icon: <CloudLightning size={24} />,
      color: "red"
    },
    {
      id: 4,
      title: "Road Blockade",
      description: "MG Road is temporarily blocked due to a fallen tree. Traffic is being diverted through Subhash Marg.",
      location: "MG Road",
      date: "Today • 2:00 PM",
      severity: "Information",
      type: "Traffic",
      icon: <Car size={24} />,
      color: "blue"
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical') return alert.severity === 'Critical';
    return alert.type === activeFilter;
  });

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Information': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getIconStyles = (color) => {
    switch(color) {
      case 'red': return 'bg-red-100 text-red-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans p-6 md:p-12 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/citizen')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        
        <div className="flex items-center gap-3 mb-8">
           <AlertTriangle size={32} className="text-red-500" />
           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
             Emergency Alerts
           </h1>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide px-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-sm transition-all border ${activeFilter === filter ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="flex flex-col gap-6">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center">
               <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-2">No active alerts</h3>
               <p className="text-slate-500 font-bold">Everything is operating normally.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
              >
                 <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${getIconStyles(alert.color)}`}>
                         {alert.icon}
                       </div>
                       <div>
                         <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border inline-block mb-2 ${getSeverityStyles(alert.severity)}`}>
                           {alert.severity}
                         </span>
                         <h3 className="text-xl font-black text-slate-900 leading-tight">{alert.title}</h3>
                       </div>
                    </div>
                    <div className="text-slate-400 p-2">
                       {expandedAlert === alert.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                 </div>
                 
                 {expandedAlert === alert.id && (
                   <div className="animate-in slide-in-from-top-2 fade-in duration-200">
                     <div className="text-slate-600 font-medium text-sm md:text-base mb-6 mt-4">
                        {alert.description}
                     </div>
                     
                     <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-bold text-slate-500 pt-5 border-t border-slate-100">
                        <div className="bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-2">
                          <MapPin size={16} className="text-slate-400" /> Location: {alert.location}
                        </div>
                        <div className="bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-2">
                          <Clock size={16} className="text-slate-400" /> {alert.date}
                        </div>
                     </div>
                   </div>
                 )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlerts;
