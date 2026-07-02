import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const MPLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    const storedSessionString = localStorage.getItem('mp_session');
    
    if(!storedSessionString) {
      alert("No account found. Please register first.");
      return;
    }

    const storedSession = JSON.parse(storedSessionString);
    
    // Check if email/mobile and password match
    if(storedSession.email === email && storedSession.password === password) {
      navigate('/mp-dashboard');
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-200">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 transform hover:scale-105 transition-transform">
          <BrainCircuit size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">JanVaani <span className="text-blue-600">AI</span></h2>
        <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Executive Command Center</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-2xl shadow-blue-900/5 sm:rounded-3xl sm:px-10 border border-slate-100 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none blur-2xl"></div>

          <div className="mb-8 border-b border-slate-100 pb-6 text-center">
            <ShieldCheck size={40} className="mx-auto text-blue-500 mb-4 opacity-80" />
            <h3 className="text-xl font-bold text-slate-800">Official Secure Login</h3>
            <p className="text-xs text-slate-500 mt-1">Authorized government personnel only.</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Official Email / Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-medium transition-all"
                  placeholder="name@gov.in or +91"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-medium transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-bold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5"
              >
                Access Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-600">
              New Official or MP?{' '}
              <button onClick={() => navigate('/mp-register')} className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MPLogin;
