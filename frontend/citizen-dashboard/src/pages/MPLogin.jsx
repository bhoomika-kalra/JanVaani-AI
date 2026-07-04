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

const MPLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem('mp_session_dummy', 'true');
      navigate('/mp-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden bg-white">

      {/* LEFT SECTION (45%) - Branding & Trust */}
      <div className="lg:w-[45%] relative flex flex-col items-center justify-center bg-[#F8FAFC] p-8 sm:p-12 lg:p-16 border-r border-slate-200/60 min-h-screen">

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
            className="h-[100px] md:h-[120px] w-auto mb-6 drop-shadow-xl"
          />

          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight uppercase text-slate-900 mb-2">
            JanVaani <span className="text-[#3B5BFF]">AI</span>
          </h1>

          <h2 className="text-[12px] sm:text-[14px] font-bold text-slate-500 uppercase tracking-[0.25em] mb-12">
            Executive Command Center
          </h2>

          <h3 className="text-[22px] sm:text-[28px] font-bold leading-[1.3] tracking-tight text-slate-800 mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">AI-powered</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">constituency intelligence</span>{' '}
            for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">data-driven development</span>.
          </h3>

          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full mb-12 opacity-80"></div>

          <div className="flex flex-col items-center">
            <p className="text-[14px] sm:text-[16px] font-bold text-slate-700 tracking-wide mb-3">
              Trusted <span className="text-blue-300 mx-3">•</span> Secure <span className="text-blue-300 mx-3">•</span> Transparent
            </p>
            <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium leading-relaxed max-w-[360px]">
              Building stronger constituencies through AI-powered governance and citizen participation.
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION (55%) - Login Flow */}
      <div className="lg:w-[55%] flex flex-col items-center justify-center bg-[#F8FAFC]/50 p-6 sm:p-12 relative animate-in fade-in duration-1000 delay-150 min-h-screen">

        {/* Main Login Card */}
        <div className="w-full max-w-[640px] relative z-10 bg-white py-[64px] px-[56px] rounded-[24px] shadow-[0_12px_40px_rgba(15,23,42,0.08)] border border-slate-100 transition-all duration-300 hover:shadow-[0_16px_50px_rgba(15,23,42,0.1)] flex flex-col items-center">
          
          {/* INNER WRAPPER: Constrains inputs while keeping the white card large */}
          <div className="w-full max-w-[464px] flex flex-col items-center w-full">
            
            <div className="flex flex-col items-center text-center w-full mb-[36px]">
              {/* Shield Icon with outer ring */}
              <div className="w-[84px] h-[84px] rounded-full bg-blue-50 flex items-center justify-center mb-[40px]">
                <div className="w-[60px] h-[60px] rounded-full bg-[#4F46E5] flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <ShieldCheck size={32} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-[32px] md:text-[40px] font-extrabold text-[#1E293B] tracking-tight mb-[20px] w-full leading-tight">Official Secure Login</h3>
              <p className="text-[20px] text-slate-500 font-medium w-full">Authorized government officials only</p>
            </div>

            <form className="flex flex-col w-full" onSubmit={handleLogin}>
              
              {/* Email / Mobile */}
              <div className="flex flex-col mb-[32px] w-full">
                <label className="block text-[18px] font-bold text-slate-700 mb-[14px] pl-1">
                  Official Email / Mobile Number
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={22} className="text-slate-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full h-[60px] pl-[48px] pr-4 border border-slate-200 rounded-[20px] bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[18px] font-medium transition-all"
                    placeholder="      Enter your official email or mobile number"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col mb-[24px] w-full">
                <label className="block text-[18px] font-bold text-slate-700 mb-[14px] pl-1">
                  Password / OTP
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={22} className="text-slate-400" strokeWidth={1.5} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full h-[60px] pl-[48px] pr-[48px] border border-slate-200 rounded-[20px] bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-[18px] font-medium transition-all"
                    placeholder="      Enter your password or OTP"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={22} strokeWidth={1.5} /> : <Eye size={22} strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between w-full pl-1 mb-[28px]">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-[18px] w-[18px] text-[#4F46E5] focus:ring-[#4F46E5] border-slate-300 rounded-[4px] cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-[16px] font-medium text-slate-700 cursor-pointer select-none">
                    Remember this device
                  </label>
                </div>
                <div>
                  <button type="button" className="text-[16px] font-bold text-[#4F46E5] hover:text-blue-700 transition-colors">
                    Forgot Password / Request OTP?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 h-[60px] border border-transparent rounded-[20px] shadow-[0_4px_14px_rgba(79,70,229,0.25)] text-[20px] font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:-translate-y-0.5"
                >
                  Access Dashboard <ArrowRight size={22} strokeWidth={2} />
                </button>
              </div>
              
              {/* Divider */}
              <div className="relative mt-[28px] mb-[28px]">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[14px] font-bold text-slate-400 border border-slate-200 rounded-full py-1">OR</span>
                </div>
              </div>

              {/* Secondary Action */}
              <div className="w-full text-center mt-[8px]">
                <p className="text-[18px] text-slate-600 font-medium">
                  New MP / Official?{' '}
                  <button onClick={() => navigate('/mp-register')} className="font-bold text-[#3B5BFF] hover:text-blue-600 transition-colors">
                    Create Account
                  </button>
                </p>
              </div>

            </form>
          </div>
        </div>

        {/* Security Notice Card */}
        <div className="w-full max-w-[640px] bg-[#F8FAFC] border border-slate-200 rounded-[16px] p-[40px] flex items-start gap-5 mt-[32px]">
          <div className="mt-1 shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <LockKeyhole size={22} className="text-blue-600" strokeWidth={2} />
          </div>
          <div className="flex flex-col w-full">
            <h4 className="font-bold text-slate-800 text-[18px] mb-2 flex items-center gap-2 w-full">
              Security Notice
            </h4>
            <p className="text-[16px] font-medium text-slate-500 leading-relaxed w-full">
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
