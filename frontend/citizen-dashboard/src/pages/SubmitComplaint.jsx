import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MapPin, Mic, BrainCircuit, ThumbsUp, Camera, Video, X, Play, Square, Crosshair, ArrowRight, UploadCloud, CheckCircle2, Sparkles, AlertTriangle, Edit2, Check, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapWrapper from '../components/maps/MapWrapper';
import UserLocationMarker from '../components/maps/UserLocationMarker';
import LocationPicker from '../components/maps/LocationPicker';
import { complaintService } from '../services/complaintService';
import { mediaService } from '../services/mediaService';
import { aiService } from '../services/aiService';

const categories = ["Road", "Water", "Electricity", "Healthcare", "Education", "Sanitation", "Environment", "Other"];

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Water");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationSuccess, setLocationSuccess] = useState("");
  
  // AI Image Analysis States
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiApplied, setAiApplied] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setImageUploaded(true);
    }
  };

  const KOTA_CENTER = [25.18, 75.83];

  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [aiTextResult, setAiTextResult] = useState(null);
  
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateResult, setDuplicateResult] = useState(null);

  const [aiSummary, setAiSummary] = useState({ priority: 'Normal', score: 50, summary: 'Pending AI Analysis' });

  const handleAnalyzeImage = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    
    try {
      const data = await aiService.analyzeImage(imageFile);
      setAiResult({
        primary_issue: data.primaryIssue,
        secondary_issues: data.secondaryIssues,
        overall_severity: data.overallSeverity,
        overall_priority: data.overallPriority,
        departments: data.departments,
        summary: data.aiSummary
      });
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeText = async () => {
    if (!description.trim()) return;
    setIsAnalyzingText(true);
    try {
      const data = await aiService.analyzeComplaintText({ description, location });
      setAiTextResult(data);
      setSelectedCategory(data.category || selectedCategory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzingText(false);
      handleCheckDuplicate();
    }
  };

  const handleCheckDuplicate = async () => {
    if (!description.trim()) return;
    setIsCheckingDuplicate(true);
    try {
      const data = await aiService.checkDuplicateComplaint({ text: description, location });
      if (data && data.isDuplicate) {
        setDuplicateResult(data);
      } else {
        setDuplicateResult(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCheckingDuplicate(false);
    }
  };

  useEffect(() => {
    // Debounced or simple update for AI Summary Card
    const fetchSummary = async () => {
      if (description.length > 20) {
        const data = await aiService.calculatePriorityScore({ description, category: selectedCategory, location });
        const summaryData = await aiService.generateExplainability({ description, category: selectedCategory, location });
        setAiSummary({
          priority: data.priority_label || 'Normal',
          score: data.priority_score || 50,
          summary: summaryData.mainReason || 'Complaint text analyzed.'
        });
      }
    };
    const timer = setTimeout(fetchSummary, 2000);
    return () => clearTimeout(timer);
  }, [description, selectedCategory, location]);

  const applyAiSuggestion = () => {
    setSelectedCategory(aiResult.primary_issue || "Other");
    
    let aiDescription = (aiResult.summary || "") + "\n\n";
    if (aiResult.secondary_issues && aiResult.secondary_issues.length > 0) {
      aiDescription += "Secondary Issues:\n- " + aiResult.secondary_issues.join("\n- ") + "\n\n";
    }
    if (aiResult.departments && aiResult.departments.length > 0) {
      aiDescription += "Required Departments:\n- " + aiResult.departments.join("\n- ");
    }
    
    setDescription(aiDescription.trim());
    setAiApplied(true);
  };

  const handleGPSLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
          setLocationError('');
          setLocationSuccess('Location selected successfully.');
          setShowMap(true);
          setTimeout(() => setLocationSuccess(''), 3000);
        },
        (error) => {
          setLocationError('Location permission denied. Please select manually.');
          setShowMap(true);
          setTimeout(() => setLocationError(''), 3000);
        }
      );
    } else {
      setLocationError('Geolocation not supported.');
      setTimeout(() => setLocationError(''), 3000);
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      setIsRecording(true);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim() || !location.trim()) {
      alert("Description and location are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: `${selectedCategory} Issue at ${location}`,
        category: selectedCategory,
        description,
        location,
        city_or_village: location,
        state: "Rajasthan",
        latitude: coordinates ? coordinates[0] : null,
        longitude: coordinates ? coordinates[1] : null
      };

      const complaint = await complaintService.createComplaint(payload);
      
      if (imageFile) {
        await mediaService.uploadMedia(complaint.id, imageFile, 'image');
      }
      
      localStorage.setItem('last_complaint_id', complaint.id);
      navigate('/complaint-registered');
    } catch (err) {
      console.error(err);
      alert("Unable to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAFAFA] font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col relative pb-32">
      
      {/* Header */}
      <header className="bg-white/80 sticky top-0 z-50 pt-4 pb-3 px-4 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/citizen')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-slate-900 tracking-tight leading-tight text-lg">New Complaint</span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl lg:max-w-4xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Category Selection */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">1. Select Category</h2>
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-blue-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Complaint Description */}
        <section>
          <div className="flex justify-between items-center mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">2. Describe the Issue</h2>
            <button 
              onClick={handleAnalyzeText} 
              disabled={isAnalyzingText || !description}
              className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              <BrainCircuit size={14} />
              {isAnalyzingText ? 'Analyzing...' : 'Analyze with JanVaani AI'}
            </button>
          </div>
          <div className="bg-white rounded-3xl p-1 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., The main water pipeline has been leaking for 3 days..."
              className="w-full h-32 bg-transparent p-5 rounded-[1.3rem] outline-none text-slate-800 resize-none placeholder:text-slate-400"
            />
          </div>
          
          {aiTextResult && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2"><Sparkles size={16}/> AI Suggestions</h3>
              <p className="text-sm text-blue-800 mb-3">{aiTextResult.summary}</p>
              <button 
                onClick={() => {
                  setDescription(aiTextResult.summary);
                  setSelectedCategory(aiTextResult.category);
                  setAiTextResult(null);
                }}
                className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Use AI Suggestions
              </button>
            </div>
          )}

          {isCheckingDuplicate && (
            <div className="mt-4 text-sm text-slate-500 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              Checking for duplicates...
            </div>
          )}

          {duplicateResult && duplicateResult.isDuplicate && (
            <div className="mt-4 bg-orange-50 border border-orange-200 rounded-2xl p-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-orange-900 mb-2 flex items-center gap-2"><Copy size={16}/> Similar complaint found nearby</h3>
              <div className="bg-white p-3 rounded-xl border border-orange-100 mb-3">
                <p className="text-sm font-bold text-slate-800">{duplicateResult.similarComplaints[0]?.title || 'Similar Issue'}</p>
                <p className="text-xs text-slate-500">{duplicateResult.similarComplaints[0]?.address || 'Nearby'}</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    // Logic to support existing complaint
                    alert("Support added to existing complaint!");
                    navigate('/citizen');
                  }}
                  className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-600 flex-1"
                >
                  Support Existing Issue
                </button>
                <button 
                  onClick={() => setDuplicateResult(null)}
                  className="bg-white border border-orange-200 text-orange-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-orange-100 flex-1"
                >
                  Continue as New
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Voice Recording */}
        <section>
          <h2 className="text-sm font-bold text-slate-800 mb-3 px-1 uppercase tracking-wider">Or Record Audio</h2>
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 flex flex-col items-center">
            
            {!hasRecorded ? (
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleRecord}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
                >
                  {isRecording ? <Square size={28} /> : <Mic size={32} />}
                </button>
                <p className={`mt-4 text-sm font-bold ${isRecording ? 'text-red-500' : 'text-slate-500'}`}>
                  {isRecording ? 'Recording (00:12)... Tap to Stop' : 'Tap to Record Voice'}
                </p>
              </div>
            ) : (
              <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center gap-4">
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shrink-0">
                  <Play size={20} className="ml-1" />
                </button>
                <div className="flex-1">
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-blue-500 w-0"></div>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>00:00</span>
                    <span>00:45</span>
                  </div>
                </div>
                <button onClick={() => setHasRecorded(false)} className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors shrink-0">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Media Upload */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">3. Attach Evidence</h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded-md">Optional</span>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            accept="image/*" 
            className="hidden" 
          />
          
          {!imageUploaded ? (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-50/50 hover:bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl h-32 flex flex-col items-center justify-center gap-2 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera size={24} />
                </div>
                <span className="text-sm font-bold text-blue-700">Add Photos</span>
              </button>
              <button className="bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl h-32 flex flex-col items-center justify-center gap-2 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video size={24} />
                </div>
                <span className="text-sm font-bold text-slate-600">Add Video</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview & Analyze Action */}
              <div className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 relative overflow-hidden">
                <div className="relative h-48 w-full bg-slate-100 rounded-2xl overflow-hidden mb-4">
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imagePreviewUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80'})` }}></div>
                  
                  {/* Scanning Animation */}
                  {isAnalyzing && (
                    <>
                      <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-[2px]"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_3px_rgba(96,165,250,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold text-blue-700 flex items-center gap-2 shadow-xl">
                          <BrainCircuit size={18} className="animate-pulse" />
                          JanVaani AI is analyzing your image...
                        </div>
                      </div>
                    </>
                  )}
                  
                  <button 
                    onClick={() => {
                      setImageUploaded(false);
                      setImageFile(null);
                      setImagePreviewUrl(null);
                      setAiResult(null);
                      setAiApplied(false);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 backdrop-blur-md"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {!aiResult && !isAnalyzing && (
                  <button 
                    onClick={handleAnalyzeImage}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    Analyze Image with AI
                  </button>
                )}
              </div>

              {/* Material 3 AI Result Card */}
              {aiResult && !aiApplied && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-5 shadow-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-blue-100/50">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                      <BrainCircuit size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-950 text-sm">AI Analysis Complete</h3>
                      <p className="text-[11px] font-medium text-blue-700">We scanned your photo to help fill the form.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white p-3 rounded-2xl border border-blue-50 col-span-2">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Primary Issue</span>
                      <span className="text-sm font-bold text-slate-800">{aiResult.primary_issue}</span>
                    </div>
                    {aiResult.secondary_issues && aiResult.secondary_issues.length > 0 && (
                      <div className="bg-white p-3 rounded-2xl border border-blue-50 col-span-2">
                        <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Secondary Issues</span>
                        <div className="flex flex-wrap gap-1.5">
                          {aiResult.secondary_issues.map((issue, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-semibold">{issue}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="bg-white p-3 rounded-2xl border border-blue-50">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Overall Severity</span>
                      <span className={`text-sm font-bold flex items-center gap-1 ${
                        aiResult.overall_severity === 'Critical' ? 'text-red-600' :
                        aiResult.overall_severity === 'High' ? 'text-orange-500' :
                        aiResult.overall_severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}><AlertTriangle size={12}/> {aiResult.overall_severity}</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-blue-50">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Overall Priority</span>
                      <span className={`text-sm font-bold flex items-center gap-1 ${
                        aiResult.overall_priority === 'Emergency' ? 'text-red-600' : 'text-slate-800'
                      }`}><AlertTriangle size={12}/> {aiResult.overall_priority}</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-blue-50 col-span-2">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Required Departments</span>
                      <div className="flex flex-wrap gap-1.5">
                        {aiResult.departments && aiResult.departments.map((dept, idx) => (
                          <span key={idx} className="bg-blue-50 border border-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">{dept}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-2xl border border-blue-50 mb-5">
                    <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">AI Summary</span>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      "{aiResult.summary}"
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={applyAiSuggestion}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Check size={16} /> Use AI Suggestion
                    </button>
                    <button 
                      onClick={() => setAiApplied(true)} 
                      className="sm:w-auto bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit2 size={16} /> Edit Manually
                    </button>
                  </div>
                </div>
              )}
              
              {/* Success state after applying AI */}
              {aiApplied && aiResult && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-700 p-2 rounded-full">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-green-900">AI Suggestion Applied</h4>
                      <p className="text-xs font-medium text-green-700">Form fields have been updated.</p>
                    </div>
                  </div>
                  <button onClick={() => setAiApplied(false)} className="text-xs font-bold text-green-700 hover:text-green-900 underline">Undo</button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Location */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">4. Complaint Location</h2>
          </div>
          
          <div className="bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 mb-4 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 focus-within:border-blue-400 transition-colors">
              <MapPin size={20} className="text-slate-400 mr-3 shrink-0" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search or enter area manually"
                className="w-full bg-transparent outline-none text-slate-800 text-sm font-medium placeholder:text-slate-400"
              />
            </div>
            <button 
              onClick={handleGPSLocation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
            >
              <Crosshair size={18} /> Use Current Location
            </button>
            <button 
              onClick={() => setShowMap(!showMap)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
            >
              <MapPin size={18} /> {showMap ? 'Hide Map' : 'Select Manually on Map'}
            </button>
          </div>

          {locationSuccess && (
            <div className="mb-4 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm font-bold shadow-sm border border-green-100 flex items-center gap-2">
              <CheckCircle2 size={18} /> {locationSuccess}
            </div>
          )}

          {locationError && (
            <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-bold shadow-sm border border-red-100">
              {locationError}
            </div>
          )}

          {showMap && (
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-slate-200 animate-in fade-in zoom-in duration-300 relative z-10 flex-col flex overflow-hidden">
              <div style={{ height: '320px', width: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
                <MapWrapper center={coordinates || KOTA_CENTER} zoom={14} style={{ height: '100%', width: '100%' }}>
                  <UserLocationMarker position={coordinates} />
                  <LocationPicker 
                    position={coordinates} 
                    onLocationSelect={(coords) => {
                      setCoordinates(coords);
                      setLocationSuccess('Location selected successfully.');
                      setTimeout(() => setLocationSuccess(''), 3000);
                    }} 
                  />
                </MapWrapper>
              </div>
              
              {coordinates && (
                <div className="mt-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Latitude</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">{coordinates[0].toFixed(5)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Longitude</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">{coordinates[1].toFixed(5)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* AI Insight Card */}
        <section className="bg-blue-50 border border-blue-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm mt-12 mb-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-bl-full pointer-events-none -mt-4 -mr-4"></div>
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-blue-600">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-blue-950 tracking-tight">AI Summary</h3>
              <p className="text-xs text-blue-700 mt-1">{aiSummary.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative z-10">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Category</span>
              <span className="text-sm font-bold text-blue-950">{selectedCategory}</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Score</span>
              <span className="text-sm font-bold text-blue-950">{aiSummary.score}/100</span>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-50/50 flex flex-col justify-center">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Priority</span>
              <span className={`text-sm font-bold ${aiSummary.priority === 'High' ? 'text-red-600' : aiSummary.priority === 'Critical' ? 'text-purple-600' : 'text-orange-500'}`}>{aiSummary.priority}</span>
            </div>
          </div>
        </section>
        
      </main>

      {/* Fixed Bottom Submit Bar */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200/50 p-4 pb-safe z-50">
        <div className="max-w-3xl lg:max-w-4xl mx-auto flex">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 ${isSubmitting ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'} text-white font-bold h-16 rounded-2xl shadow-[0_8px_20px_rgb(37,99,235,0.25)] transition-all flex items-center justify-center gap-2 text-lg`}
          >
            {isSubmitting ? 'Submitting...' : <><CheckCircle2 size={20} /> Submit Complaint <ArrowRight size={20} /></>}
          </button>
        </div>
      </div>

    </div>
  );
};

export default SubmitComplaint;
