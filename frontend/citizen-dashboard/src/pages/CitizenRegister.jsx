import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCircle, MapPin, Globe, Fingerprint, ArrowRight } from 'lucide-react';

const CitizenRegister = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    gender: '',
    age: '',
    state: '',
    villageCity: '',
    preferredLanguage: 'English',
    govIdType: '',
    govIdNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) newErrors.mobileNumber = "Valid Mobile Number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.age || isNaN(formData.age) || formData.age < 18) newErrors.age = "Must be 18 or older";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.villageCity) newErrors.villageCity = "Village / City is required";
    if (!formData.govIdType) newErrors.govIdType = "Please select an ID type";
    if (!formData.govIdNumber) newErrors.govIdNumber = "Government ID Number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save to localStorage as requested
      localStorage.setItem('janvaani_citizen_profile', JSON.stringify(formData));
      
      // Navigate to Citizen Dashboard
      navigate('/citizen');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col relative py-8 px-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg">
             <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Citizen Registration</h1>
          <p className="text-slate-500 font-medium mt-2">Register once on this device to access all JanVaani AI services.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleRegister} className="p-6 md:p-8 flex flex-col gap-8">
            
            {/* 1. Personal Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <UserCircle size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">Personal Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className={`w-full bg-slate-50 border ${errors.fullName ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="10-digit mobile number" className={`w-full bg-slate-50 border ${errors.mobileNumber ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Gender <span className="text-red-500">*</span></label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} className={`w-full bg-slate-50 border ${errors.gender ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none`}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1 font-medium">{errors.gender}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Age <span className="text-red-500">*</span></label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter your age" className={`w-full bg-slate-50 border ${errors.age ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                  {errors.age && <p className="text-red-500 text-xs mt-1 font-medium">{errors.age}</p>}
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-100"></div>

            {/* 2. Location Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">Location Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">State <span className="text-red-500">*</span></label>
                  <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="E.g., Gujarat, Maharashtra" className={`w-full bg-slate-50 border ${errors.state ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                  {errors.state && <p className="text-red-500 text-xs mt-1 font-medium">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Village / City <span className="text-red-500">*</span></label>
                  <input type="text" name="villageCity" value={formData.villageCity} onChange={handleInputChange} placeholder="Enter village or city" className={`w-full bg-slate-50 border ${errors.villageCity ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                  {errors.villageCity && <p className="text-red-500 text-xs mt-1 font-medium">{errors.villageCity}</p>}
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-100"></div>

            {/* 3. Identity Verification & Language */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Fingerprint size={20} className="text-blue-600" />
                <h2 className="text-lg font-bold text-slate-800">Identity & Preferences</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                   <div className="shrink-0 mt-0.5"><ShieldCheck size={18} className="text-blue-600" /></div>
                   <p className="text-xs font-medium text-blue-800 leading-relaxed">
                     Your government ID is only used locally to establish device-level trust. It is securely masked on your profile and not shared openly.
                   </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Government ID Type <span className="text-red-500">*</span></label>
                  <select name="govIdType" value={formData.govIdType} onChange={handleInputChange} className={`w-full bg-slate-50 border ${errors.govIdType ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none`}>
                    <option value="">Select ID Type</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Voter ID (EPIC)">Voter ID (EPIC)</option>
                    <option value="Driving Licence">Driving Licence</option>
                  </select>
                  {errors.govIdType && <p className="text-red-500 text-xs mt-1 font-medium">{errors.govIdType}</p>}
                </div>

                {formData.govIdType && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Government ID Number <span className="text-red-500">*</span></label>
                    <input type="text" name="govIdNumber" value={formData.govIdNumber} onChange={handleInputChange} placeholder="Enter your ID number" className={`w-full bg-slate-50 border ${errors.govIdNumber ? 'border-red-400' : 'border-slate-200'} rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors`} />
                    {errors.govIdNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.govIdNumber}</p>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 flex items-center gap-1.5"><Globe size={14}/> Preferred Language</label>
                  <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none">
                    <option value="English">English</option>
                    <option value="हिन्दी (Hindi)">हिन्दी (Hindi)</option>
                    <option value="বাংলা (Bengali)">বাংলা (Bengali)</option>
                    <option value="తెలుగు (Telugu)">తెలుగు (Telugu)</option>
                    <option value="मराठी (Marathi)">मराठी (Marathi)</option>
                    <option value="தமிழ் (Tamil)">தமிழ் (Tamil)</option>
                    <option value="ગુજરાતી (Gujarati)">ગુજરાતી (Gujarati)</option>
                    <option value="ಕನ್ನಡ (Kannada)">ಕನ್ನಡ (Kannada)</option>
                    <option value="മലയാളം (Malayalam)">മലയാളം (Malayalam)</option>
                    <option value="ਪੰਜਾਬੀ (Punjabi)">ਪੰਜਾਬੀ (Punjabi)</option>
                    <option value="ଓଡ଼ିଆ (Odia)">ଓଡ଼ିଆ (Odia)</option>
                    <option value="অসমীয়া (Assamese)">অসমীয়া (Assamese)</option>
                    <option value="اردو (Urdu)">اردو (Urdu)</option>
                    <option value="संस्कृत (Sanskrit)">संस्कृत (Sanskrit)</option>
                    <option value="Other (Please Specify)">Other (Please Specify)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Action */}
            <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button type="button" onClick={() => navigate('/')} className="px-6 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-[#3B5BFF] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all active:scale-95">
                Register Now <ArrowRight size={18} />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CitizenRegister;
