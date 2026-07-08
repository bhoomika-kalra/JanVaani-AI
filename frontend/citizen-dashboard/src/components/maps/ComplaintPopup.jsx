import React from 'react';
import { Popup } from 'react-leaflet';
import { AlertCircle, Activity, MapPin, CheckCircle2, Users, ArrowRight } from 'lucide-react';

const ComplaintPopup = ({ title, category, status, priority, location, support, onViewDetails }) => {
  return (
    <Popup className="custom-popup">
      <div className="p-1 min-w-[200px]">
        <h3 className="font-bold text-slate-900 text-sm mb-2">{title}</h3>
        
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <AlertCircle size={14} className="text-blue-500" />
            <span className="font-medium">{category}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 size={14} className={status === 'Resolved' ? "text-green-500" : "text-amber-500"} />
            <span className="font-medium">{status}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Activity size={14} className={priority === 'High' ? "text-red-500" : "text-orange-500"} />
            <span className="font-medium">AI Priority: {priority}</span>
          </div>

          {support !== undefined && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Users size={14} className="text-blue-500" />
              <span className="font-medium">{support} Supporters</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-600 border-t border-slate-100 pt-2 mt-1">
            <MapPin size={14} className="text-slate-400" />
            <span className="font-medium">{location}</span>
          </div>

          {onViewDetails && (
            <button 
              onClick={onViewDetails}
              className="mt-2 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              View Details <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default ComplaintPopup;
