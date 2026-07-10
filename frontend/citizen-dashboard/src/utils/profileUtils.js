export const getInitials = (name) => {
  if (!name) return "U";
  
  // Handle some specific edge cases explicitly like Urdu or other scripts
  // But generally, extracting the first letter of first and last word works
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "U";
  
  if (parts.length === 1) {
    return parts[0].substring(0, 1).toUpperCase();
  }
  
  const first = parts[0].substring(0, 1);
  const last = parts[parts.length - 1].substring(0, 1);
  return (first + last).toUpperCase();
};

export const formatLanguage = (langStr) => {
  if (!langStr) return "English";
  
  const lower = langStr.toLowerCase().trim();
  
  const langMap = {
    "english": "English",
    "hindi": "हिन्दी (Hindi)",
    "bengali": "বাংলা (Bengali)",
    "gujarati": "ગુજરાતી (Gujarati)",
    "marathi": "मराठी (Marathi)",
    "tamil": "தமிழ் (Tamil)",
    "telugu": "తెలుగు (Telugu)",
    "kannada": "ಕನ್ನಡ (Kannada)",
    "punjabi": "ਪੰਜਾਬੀ (Punjabi)",
    "malayalam": "മലയാളം (Malayalam)",
    "odia": "ଓଡ଼ିଆ (Odia)",
    "urdu": "اردو (Urdu)",
    "assamese": "অসমীয়া (Assamese)",
    "sanskrit": "संस्कृत (Sanskrit)",
  };

  return langMap[lower] || langStr; // Fallback to exactly what user typed if not in map
};
