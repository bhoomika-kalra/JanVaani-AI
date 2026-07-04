import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CitizenHome from './pages/CitizenHome';
import CitizenRegister from './pages/CitizenRegister';
import VoiceAssistant from './pages/VoiceAssistant';
import CallCompleted from './pages/CallCompleted';
import ComplaintRegistered from './pages/ComplaintRegistered';
import TrackComplaint from './pages/TrackComplaint';
import SubmitComplaint from './pages/SubmitComplaint';
import Profile from './pages/Profile';
import IdentityVerification from './pages/IdentityVerification';
import MPDashboard from './pages/MPDashboard';
import MPLogin from './pages/MPLogin';
import MPRegistration from './pages/MPRegistration';
import MyComplaints from './pages/MyComplaints';
import EmergencyAlerts from './pages/EmergencyAlerts';

const ProtectedCitizenRoute = ({ children }) => {
  const profile = localStorage.getItem('janvaani_citizen_profile');
  if (!profile) {
    return <Navigate to="/citizen-register" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Citizen Routes */}
        <Route path="/citizen-register" element={<CitizenRegister />} />
        
        {/* Protected Citizen Routes */}
        <Route path="/citizen" element={<ProtectedCitizenRoute><CitizenHome /></ProtectedCitizenRoute>} />
        <Route path="/voice-assistant" element={<ProtectedCitizenRoute><VoiceAssistant /></ProtectedCitizenRoute>} />
        <Route path="/submit-complaint" element={<ProtectedCitizenRoute><SubmitComplaint /></ProtectedCitizenRoute>} />
        <Route path="/track-complaint" element={<ProtectedCitizenRoute><TrackComplaint /></ProtectedCitizenRoute>} />
        <Route path="/profile" element={<ProtectedCitizenRoute><Profile /></ProtectedCitizenRoute>} />
        <Route path="/my-complaints" element={<ProtectedCitizenRoute><MyComplaints /></ProtectedCitizenRoute>} />
        <Route path="/emergency-alerts" element={<ProtectedCitizenRoute><EmergencyAlerts /></ProtectedCitizenRoute>} />
        
        {/* Unprotected for now but could be protected if needed */}
        <Route path="/call-completed" element={<CallCompleted />} />
        <Route path="/complaint-registered" element={<ComplaintRegistered />} />
        <Route path="/identity-verification" element={<IdentityVerification />} />
        
        {/* MP Routes */}
        <Route path="/mp-login" element={<MPLogin />} />
        <Route path="/mp-register" element={<MPRegistration />} />
        <Route path="/mp-dashboard" element={<MPDashboard />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
