import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ShieldCheck, Upload, ArrowRight } from 'lucide-react';

const MPRegistration = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: 'MP',
    state: 'Rajasthan',
    district: '',
    constituency: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if(!formData.name || !formData.constituency) {
      alert("Name and Constituency are required!");
      return;
    }
    
    if(!formData.password || formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    
    if(formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    // Create dummy session based on form
    const dummySession = {
      name: formData.name,
      role: formData.role,
      email: formData.email || formData.mobile, // store identifier for login
      password: formData.password, // store dummy password
      constituency: formData.constituency,
      district: formData.district || formData.constituency,
      state: formData.state
    };
    
    localStorage.setItem('mp_session', JSON.stringify(dummySession));
    navigate('/mp-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-200">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6">
          <BrainCircuit size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">JanVaani <span className="text-blue-600">AI</span></h2>
        <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Official Registration Portal</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-10 px-4 shadow-2xl shadow-blue-900/5 sm:rounded-3xl sm:px-10 border border-slate-100 relative overflow-hidden">
          
          <div className="mb-8 border-b border-slate-100 pb-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><ShieldCheck size={28} /></div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Account Setup</h3>
              <p className="text-xs text-slate-500 mt-1">Register to access your executive command center.</p>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleRegister}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text" name="name" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="Hon. Name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                <input
                  type="text" name="mobile" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="+91"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Official Email</label>
                <input
                  type="email" name="email" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="name@gov.in"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Designation Role</label>
                <select 
                  name="role" onChange={handleChange} required
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                >
                  <option value="MP">Member of Parliament (MP)</option>
                  <option value="MLA">Member of Legislative Assembly (MLA)</option>
                  <option value="District Collector">District Collector</option>
                  <option value="Municipal Commissioner">Municipal Commissioner</option>
                  <option value="Panchayat Officer">Panchayat Officer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
                <select 
                  name="state" onChange={handleChange} required
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                >
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">District</label>
                <input
                  type="text" name="district" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="e.g. Udaipur"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Constituency / Region</label>
                <input
                  type="text" name="constituency" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="Enter Constituency Name (e.g., Udaipur, Jaipur, Kota)"
                />
                <p className="text-xs text-slate-500 mt-2 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100 inline-block">🔒 This will strictly lock your dashboard data to this region.</p>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Create Password</label>
                <input
                  type="password" name="password" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password" name="confirmPassword" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Government ID / Official ID Number</label>
                <input
                  type="text" name="idNumber" required
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm font-medium"
                  placeholder="Enter ID Number"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-bold text-slate-700 mb-3">Upload Official ID (Verification)</label>
              <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-blue-200 border-dashed rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="space-y-2 text-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="flex flex-col text-sm text-slate-600 justify-center mt-4">
                    <span className="relative rounded-md font-bold text-blue-700 focus-within:outline-none text-base">
                      Click to upload a file
                    </span>
                    <p className="mt-1">or drag and drop your document here</p>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-[0_8px_20px_rgb(37,99,235,0.25)] text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all hover:-translate-y-1"
              >
                Create Official Account <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already registered?{' '}
              <button onClick={() => navigate('/mp-login')} className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MPRegistration;
