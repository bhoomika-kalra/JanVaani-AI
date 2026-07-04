from app.schemas.ai import AIAnalysisResponse

def analyze_dummy_text(text: str) -> AIAnalysisResponse:
    """
    Mock AI engine that uses simple keyword rules.
    """
    text_lower = text.lower()
    
    # Default values
    response = AIAnalysisResponse(
        detected_language="English",
        category="General Public Grievance",
        confidence=75,
        urgency="Low",
        priority_score=40,
        similar_complaints_count=1,
        short_explanation="The issue appears to be a general grievance.",
        recommended_department="Municipal Corporation",
        estimated_citizens_affected=10
    )
    
    # Rule 1: Water
    if "पानी" in text_lower or "water" in text_lower:
        response.detected_language = "Hindi" if "पानी" in text_lower else "English"
        response.category = "Water Supply"
        response.confidence = 94
        response.urgency = "High"
        response.priority_score = 92
        response.similar_complaints_count = 5
        response.short_explanation = "Severe water shortage reported in the local area affecting multiple households."
        response.recommended_department = "Water Supply Department"
        response.estimated_citizens_affected = 500
        
    # Rule 2: Electricity
    elif "बिजली" in text_lower or "electricity" in text_lower or "power cut" in text_lower:
        response.detected_language = "Hindi" if "बिजली" in text_lower else "English"
        response.category = "Electricity"
        response.confidence = 91
        response.urgency = "Critical"
        response.priority_score = 98
        response.similar_complaints_count = 12
        response.short_explanation = "Complete power outage reported. Requires immediate dispatch."
        response.recommended_department = "Electricity Board"
        response.estimated_citizens_affected = 1200
        
    # Rule 3: Roads
    elif "सड़क" in text_lower or "road" in text_lower or "pothole" in text_lower:
        response.detected_language = "Hindi" if "सड़क" in text_lower else "English"
        response.category = "Roads & Highways"
        response.confidence = 88
        response.urgency = "Medium"
        response.priority_score = 65
        response.similar_complaints_count = 3
        response.short_explanation = "Damaged road surface posing risk to commuters."
        response.recommended_department = "Roads & Highways Department"
        response.estimated_citizens_affected = 300
        
    return response
