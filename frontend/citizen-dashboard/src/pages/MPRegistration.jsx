import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ShieldCheck, Upload, ArrowRight, AlertCircle } from 'lucide-react';
import logo from '../assets/logo.svg';
import apiClient from '../services/apiClient';

const SafeAlertCircle = AlertCircle || (({ size, className }) => <span className={className} style={{ fontSize: size }}>!</span>);

const MPRegistration = () => {
  const navigate = useNavigate();
  
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.constituency) {
      setErrorMsg("Name and Constituency are required!");
      return;
    }
    
    if(!formData.password || formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    
    if(formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    
    const fileToUpload = fileInputRef.current?.files?.[0];
    if (!fileToUpload) {
      setErrorMsg("Please upload your official ID for verification.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobile', formData.mobile);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('constituency', formData.constituency);
    formDataToSend.append('official_id_number', formData.idNumber);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('file', fileToUpload);

    try {
      setErrorMsg('');
      const res = await apiClient.post('/mp/register', formDataToSend);
      const { access_token, mp_user } = res.data;
      
      localStorage.setItem('janvaani_token', access_token);
      localStorage.setItem('mp_session', JSON.stringify(mp_user));
      navigate('/mp-dashboard');
    } catch (err) {
      if (err.response?.data?.detail) {
        // Validation or explicit HTTP errors
        if (typeof err.response.data.detail === 'string') {
            setErrorMsg(err.response.data.detail);
        } else {
            // Pydantic validation error array
            setErrorMsg(err.response.data.detail.map(e => `${e.loc[e.loc.length-1]}: ${e.msg}`).join(', '));
        }
      } else {
        // Network or CORS failure
        setErrorMsg('Registration failed. The server is unreachable or CORS blocked the request.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-200">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center">
        <img src={logo} alt="JanVaani AI Logo" className="h-[120px] w-auto mx-auto mb-4 drop-shadow-lg" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">JanVaani <span className="text-[#3B5BFF]">AI</span></h2>
        <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">Official Registration Portal</p>
        
        {errorMsg && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start text-left gap-3 animate-in fade-in slide-in-from-top-2">
            <SafeAlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
            <p className="text-red-700 text-sm font-medium leading-relaxed">{errorMsg}</p>
          </div>
        )}
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
              <input type="file" ref={fileInputRef} className="hidden" accept=".png,.jpg,.jpeg,.pdf" onChange={(e) => {
                 if (e.target.files && e.target.files[0]) {
                   setUploadedFile(e.target.files[0].name);
                 }
              }} />
              <div onClick={() => fileInputRef.current?.click()} className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-blue-200 border-dashed rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="space-y-2 text-center">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="h-7 w-7 text-blue-500" />
                  </div>
                  <div className="flex flex-col text-sm text-slate-600 justify-center mt-4">
                    {uploadedFile ? (
                       <span className="relative rounded-md font-bold text-green-600 focus-within:outline-none text-base">
                         {uploadedFile}
                       </span>
                    ) : (
                       <span className="relative rounded-md font-bold text-blue-700 focus-within:outline-none text-base">
                         Click to upload a file
                       </span>
                    )}
                    <p className="mt-1">{uploadedFile ? 'Click to change file' : 'or drag and drop your document here'}</p>
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
