import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole
} from 'lucide-react';
import logo from '../assets/logo.svg';
import apiClient from '../services/apiClient';

const MPLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      try {
        const res = await apiClient.post('/mp/login', {
          email: email.trim(),
          password: password.trim()
        });
        const { access_token, mp_user } = res.data;
        
        localStorage.setItem('janvaani_token', access_token);
        localStorage.setItem('mp_session', JSON.stringify(mp_user));
        navigate('/mp-dashboard');
      } catch (err) {
        alert(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden bg-white">

      {/* LEFT SECTION (45%) - Branding & Trust */}
      <div className="lg:w-[45%] h-full relative flex flex-col items-center justify-center bg-[#F8FAFC] p-8 border-r border-slate-200/60">

        {/* CSS-Only Abstract Government/AI Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B5BFF_1px,transparent_1px),linear-gradient(to_bottom,#3B5BFF_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[40%] flex justify-center items-end gap-8">
            <div className="w-16 h-[60%] border-t-2 border-l-2 border-r-2 border-[#3B5BFF] rounded-t-full"></div>
            <div className="w-24 h-[80%] border-t-2 border-l-2 border-r-2 border-[#3B5BFF] rounded-t-full"></div>
            <div className="w-32 h-[100%] border-t-2 border-l-2 border-r-2 border-[#3B5BFF] rounded-t-[40px]"></div>
            <div className="w-24 h-[80%] border-t-2 border-l-2 border-r-2 border-[#3B5BFF] rounded-t-full"></div>
            <div className="w-16 h-[60%] border-t-2 border-l-2 border-r-2 border-[#3B5BFF] rounded-t-full"></div>
          </div>
        </div>

        {/* Subtle Blue Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-200 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-200 rounded-full blur-[120px]"></div>
        </div>

        {/* Branding Content */}
        <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center text-center animate-in fade-in duration-1000 slide-in-from-bottom-8">

          <img
            src={logo}
            alt="JanVaani AI Logo"
            className="h-[180px] md:h-[220px] w-auto mb-6 drop-shadow-xl"
          />

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-slate-900 mb-1">
            JanVaani <span className="text-[#3B5BFF]">AI</span>
          </h1>

          <h2 className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-8">
            Executive Command Center
          </h2>

          <h3 className="text-xl sm:text-2xl font-bold leading-[1.3] tracking-tight text-slate-800 mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">AI-powered</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">constituency intelligence</span>{' '}
            for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">data-driven development</span>.
          </h3>

          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mb-8 opacity-80"></div>

          <div className="flex flex-col items-center">
            <p className="text-sm sm:text-base font-bold text-slate-700 tracking-wide mb-2">
              Trusted <span className="text-blue-300 mx-3">•</span> Secure <span className="text-blue-300 mx-3">•</span> Transparent
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-[320px]">
              Building stronger constituencies through AI-powered governance and citizen participation.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION (55%) - Login Flow */}
      <div className="lg:w-[55%] h-full flex flex-col items-center justify-center bg-[#FAFAFA] p-6 lg:p-12 relative animate-in fade-in duration-1000 delay-150 overflow-y-auto overflow-x-hidden">

        {/* Main Login Card */}
        <div className="w-full max-w-[500px] relative z-10 bg-white py-10 px-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 transition-all duration-300 hover:shadow-[0_16px_50px_rgba(15,23,42,0.08)] flex flex-col items-center">
          
          <div className="w-full flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#4F46E5] flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck size={24} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Official Secure Login</h3>
            <p className="text-sm text-slate-500 font-medium">Authorized government officials only</p>
          </div>

          <form className="flex flex-col w-full" onSubmit={handleLogin}>
            
            {/* Email / Mobile */}
            <div className="flex flex-col mb-5 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">
                Official Email / Mobile Number
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" strokeWidth={2} />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full h-12 pl-11 pr-4 border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm font-semibold transition-colors"
                  placeholder="Enter official email or mobile"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6 w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">
                Password / OTP
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" strokeWidth={2} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-12 pl-11 pr-11 border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm font-semibold transition-colors"
                  placeholder="Enter password or OTP"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pl-1 mb-8 gap-3 sm:gap-0">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#4F46E5] focus:ring-[#4F46E5] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-slate-600 cursor-pointer select-none">
                  Remember device
                </label>
              </div>
              <button type="button" className="text-sm font-bold text-[#4F46E5] hover:text-blue-700 transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 h-12 border border-transparent rounded-xl shadow-[0_4px_14px_rgba(79,70,229,0.25)] text-base font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Access Dashboard <ArrowRight size={18} strokeWidth={2} />
            </button>
            
            {/* Divider */}
            <div className="relative mt-8 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs font-bold text-slate-400 border border-slate-200 rounded-full py-1">OR</span>
              </div>
            </div>

            {/* Secondary Action */}
            <div className="w-full text-center">
              <p className="text-sm text-slate-600 font-medium">
                New MP / Official?{' '}
                <button type="button" onClick={() => navigate('/mp-register')} className="font-bold text-[#3B5BFF] hover:text-blue-600 transition-colors">
                  Create Account
                </button>
              </p>
            </div>

          </form>
        </div>

        {/* Security Notice Card */}
        <div className="w-full max-w-[500px] bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-start gap-4 mt-6">
          <div className="mt-0.5 shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <LockKeyhole size={18} className="text-blue-600" strokeWidth={2} />
          </div>
          <div className="flex flex-col w-full">
            <h4 className="font-bold text-slate-800 text-sm mb-1 flex items-center gap-2 w-full">
              Security Notice
            </h4>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed w-full">
              Access is restricted to verified government officials.<br />
              Dashboard data is limited to your assigned constituency.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MPLogin;
