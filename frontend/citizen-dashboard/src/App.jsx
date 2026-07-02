import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CitizenHome from './pages/CitizenHome';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/citizen" element={<CitizenHome />} />
        <Route path="/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/call-completed" element={<CallCompleted />} />
        <Route path="/complaint-registered" element={<ComplaintRegistered />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/submit-complaint" element={<SubmitComplaint />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/identity-verification" element={<IdentityVerification />} />
        <Route path="/mp-login" element={<MPLogin />} />
        <Route path="/mp-register" element={<MPRegistration />} />
        <Route path="/mp-dashboard" element={<MPDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
