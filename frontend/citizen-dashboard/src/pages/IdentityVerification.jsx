import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, UploadCloud, Camera, CheckCircle2, ChevronDown, FileCheck2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const docConfig = {
  "Aadhaar Card": {
    label: "Aadhaar Number",
    placeholder: "e.g., 1234 5678 9012"
  },
  "Voter ID (EPIC)": {
    label: "Voter ID Number",
    placeholder: "e.g., ABC1234567"
  },
  "Driving Licence": {
    label: "Driving Licence Number",
    placeholder: "e.g., RJ14 20260012345"
  },
  "PAN Card": {
    label: "PAN Number",
    placeholder: "e.g., ABCDE1234F"
  }
};

const IdentityVerification = () => {
  const navigate = useNavigate();
  
  const [selectedDoc, setSelectedDoc] = useState("Aadhaar Card");
  const [docNumber, setDocNumber] = useState("");
  const [idUploaded, setIdUploaded] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUploadClick = () => {
    // Mock file upload
    setIdUploaded(true);
    setErrors(prev => ({ ...prev, upload: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!docNumber.trim()) {
      newErrors.number = `Please enter your ${docConfig[selectedDoc].label}`;
    }
    
    if (!idUploaded) {
      newErrors.upload = "Please upload an image of your Government ID";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col relative pb-32">
      
      {/* Header */}
      <header className="bg-white/90 sticky top-0 z-50 pt-4 pb-3 px-4 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 tracking-tight leading-tight text-lg">Identity Verification</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {isSubmitted ? (
          <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Verification Submitted Successfully</h2>
            <p className="text-slate-500 mb-8 max-w-md">Your government ID has been securely transmitted. The verification process usually takes 24-48 hours.</p>
            
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </div>
              <span className="text-sm font-bold text-yellow-700 uppercase tracking-widest">Status: Verification Pending</span>
            </div>

            <button 
              onClick={() => navigate('/profile')}
              className="mt-10 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-colors shadow-md"
            >
              Return to Profile
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <section className="text-center sm:text-left px-2">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Government Identity Verification</h1>
              <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
                Verify your identity using any government-issued document to improve complaint authenticity and help authorities process your reports more efficiently.
              </p>
            </section>

            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 space-y-6">
              
              {/* Step 1: Document Type */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Select Government ID Type</label>
                <div className="relative">
                  <select 
                    value={selectedDoc}
                    onChange={(e) => {
                      setSelectedDoc(e.target.value);
                      setDocNumber("");
                      setErrors(prev => ({ ...prev, number: null }));
                    }}
                    className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-base rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
                  >
                    {Object.keys(docConfig).map(doc => (
                      <option key={doc} value={doc}>{doc}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Step 2: Document Number */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">{docConfig[selectedDoc].label}</label>
                <input 
                  type="text" 
                  value={docNumber}
                  onChange={(e) => {
                    setDocNumber(e.target.value);
                    if(errors.number) setErrors(prev => ({ ...prev, number: null }));
                  }}
                  placeholder={docConfig[selectedDoc].placeholder}
                  className={`w-full bg-slate-50 border ${errors.number ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'} text-slate-900 font-semibold text-base rounded-2xl px-5 py-4 outline-none focus:ring-4 transition-all`}
                />
                {errors.number && (
                  <p className="mt-2 text-sm font-bold text-red-500 flex items-center gap-1.5"><AlertCircle size={16}/> {errors.number}</p>
                )}
              </div>

              {/* Step 3: Upload Image */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Upload Government ID</label>
                
                {!idUploaded ? (
                  <div 
                    onClick={handleUploadClick}
                    className={`w-full bg-slate-50 hover:bg-blue-50/50 border-2 border-dashed ${errors.upload ? 'border-red-400' : 'border-slate-300 hover:border-blue-300'} rounded-2xl h-40 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group`}
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UploadCloud size={28} />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold text-slate-700 block">Tap or drag files to upload</span>
                      <span className="text-xs font-medium text-slate-500 mt-1">Supports JPG, PNG, PDF</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-green-100 text-green-600 shadow-sm">
                        <FileCheck2 size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-800">document_scan.jpg</p>
                        <p className="text-xs font-medium text-green-600 mt-0.5">Upload complete</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIdUploaded(false)}
                      className="text-xs font-bold text-red-600 hover:underline px-2"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {errors.upload && (
                  <p className="mt-2 text-sm font-bold text-red-500 flex items-center gap-1.5"><AlertCircle size={16}/> {errors.upload}</p>
                )}
              </div>

              {/* Step 4: Optional Selfie */}
              <div className="pt-2">
                <label className="block text-sm font-bold text-slate-800 mb-2 flex justify-between">
                  <span>Capture Selfie</span>
                  <span className="text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-md text-xs">Optional</span>
                </label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-24 flex items-center justify-center gap-3 transition-colors cursor-pointer hover:bg-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center">
                    <Camera size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">Tap to take a selfie</span>
                </div>
              </div>

            </section>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-[0_8px_20px_rgb(37,99,235,0.25)] transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              Submit for Verification &rarr;
            </button>
            
          </form>
        )}

      </main>

    </div>
  );
};

export default IdentityVerification;
