import logging
from ai.schemas import ComplaintAnalysisResponse, VoiceAnalysisResponse, TranslationResponse, NextQuestionResponse, ImageAnalysisResponse, DuplicateCheckResponse, PriorityScoreResponse, ProjectRecommendationResponse, ExplainResponse, MPInsightsResponse

logger = logging.getLogger(__name__)

def get_mock_analysis(text: str) -> ComplaintAnalysisResponse:
    """
    Fallback mock AI engine that returns a fully structured ComplaintAnalysisResponse.
    """
    logger.info("Using AI Fallback Mock")
    text_lower = text.lower()
    
    # Default fallback
    response = ComplaintAnalysisResponse(
        complaint_summary="The citizen is reporting a general public grievance.",
        category="General Grievance",
        probable_department="Municipal Corporation",
        urgency="Low",
        confidence_score=75,
        sentiment="Neutral",
        detected_language="English",
        location_mentioned="Unknown",
        issue_keywords=["general", "grievance"],
        suggested_title="General Public Inquiry"
    )
    
    # Rule 1: Water
    if "पानी" in text_lower or "water" in text_lower or "leak" in text_lower:
        response.complaint_summary = "Severe water shortage or leakage reported in the local area."
        response.category = "Water Supply"
        response.probable_department = "Water Supply Department"
        response.urgency = "High"
        response.confidence_score = 92
        response.sentiment = "Negative"
        response.detected_language = "Hindi" if "पानी" in text_lower else "English"
        response.issue_keywords = ["water", "shortage", "leak"]
        response.suggested_title = "Water Supply Issue Reported"
        
    # Rule 2: Electricity
    elif "बिजली" in text_lower or "electricity" in text_lower or "power cut" in text_lower:
        response.complaint_summary = "Complete power outage reported requiring immediate dispatch."
        response.category = "Electricity"
        response.probable_department = "Electricity Board"
        response.urgency = "Critical"
        response.confidence_score = 95
        response.sentiment = "Angry"
        response.detected_language = "Hindi" if "बिजली" in text_lower else "English"
        response.issue_keywords = ["power cut", "electricity", "outage"]
        response.suggested_title = "Power Outage in Area"
        
    # Rule 3: Roads
    elif "सड़क" in text_lower or "road" in text_lower or "pothole" in text_lower:
        response.complaint_summary = "Damaged road surface posing risk to commuters."
        response.category = "Roads & Highways"
        response.probable_department = "PWD"
        response.urgency = "Medium"
        response.confidence_score = 88
        response.sentiment = "Negative"
        response.detected_language = "Hindi" if "सड़क" in text_lower else "English"
        response.issue_keywords = ["road", "pothole", "damage"]
        response.suggested_title = "Road Surface Damage"
        
    return response

def get_mock_voice_analysis(text: str) -> VoiceAnalysisResponse:
    """Fallback mock AI engine for Voice Transcripts."""
    logger.info("Using AI Fallback Mock for Voice")
    text_lower = text.lower()
    
    response = VoiceAnalysisResponse(
        summary="Citizen reported a generic issue.",
        category="General Grievance",
        urgency="Low",
        department="Municipal Corporation",
        language="Hindi",
        confidence=70,
        location="Unknown",
        missing_information=["Exact Location", "District"],
        follow_up_questions=["कृपया अपने गांव या इलाके का नाम बताइए।"]
    )
    
    if "पानी" in text_lower:
        response.summary = "Severe water shortage reported."
        response.category = "Water Supply"
        response.department = "Water Supply Department"
        response.urgency = "High"
        response.language = "Hindi"
        response.missing_information = ["Location"]
        response.follow_up_questions = ["यह पानी की समस्या किस इलाके में है?"]
        
    return response

def get_mock_translation(text: str, target_language: str) -> TranslationResponse:
    """Fallback mock AI engine for Translation."""
    logger.info("Using AI Fallback Mock for Translation")
    text_lower = text.lower()
    
    response = TranslationResponse(
        detected_language="Unknown",
        translated_text=text,
        confidence=50
    )
    
    # Hardcoded dummy translations
    if "पानी" in text_lower:
        response.detected_language = "Hindi"
        response.translated_text = "Water issue reported."
        response.confidence = 90
    elif "सड़क" in text_lower:
        response.detected_language = "Hindi"
        response.translated_text = "Road issue reported."
        response.confidence = 90
        
    return response

def get_mock_next_question(text: str) -> NextQuestionResponse:
    """Fallback mock AI engine for Next Question Generation."""
    logger.info("Using AI Fallback Mock for Next Question")
    text_lower = text.lower()
    
    response = NextQuestionResponse(
        next_question="Can you provide more details about the issue?",
        reason="Need more context",
        remaining_missing_fields=["location", "details"],
        confidence=60
    )
    
    if "पानी" in text_lower or "water" in text_lower:
        response.next_question = "यह पानी की समस्या किस इलाके में है?"
        response.reason = "Location missing"
        response.remaining_missing_fields = ["location"]
        response.confidence = 90
    elif "सड़क" in text_lower or "road" in text_lower:
        response.next_question = "कृपया उस सड़क का नाम या गांव का नाम बताइए।"
        response.reason = "Location missing"
        response.remaining_missing_fields = ["location"]
        response.confidence = 90
        
    return response

def get_mock_image_analysis(filename: str = "") -> ImageAnalysisResponse:
    """Fallback mock AI engine for Image Analysis."""
    logger.info("Using AI Fallback Mock for Image Analysis")
    
    return ImageAnalysisResponse(
        issue_detected="Pothole on road",
        confidence=85,
        category="Roads & Highways",
        severity="Medium",
        description="Mock fallback visual detection of a pothole.",
        suggested_department="PWD"
    )

def get_mock_duplicate_check(new_complaint: str, existing_complaints: list) -> DuplicateCheckResponse:
    """Fallback mock AI engine for Duplicate Detection."""
    logger.info("Using AI Fallback Mock for Duplicate Check")
    text_lower = new_complaint.lower()
    
    response = DuplicateCheckResponse(
        duplicate_probability=10,
        matched_complaints=[],
        recommended_action="Create new complaint"
    )
    
    # Simple mock logic based on keyword matching with the dummy dataset
    if "पानी" in text_lower or "water" in text_lower:
        response.duplicate_probability = 85
        response.recommended_action = "Ask citizen to support existing complaint"
        response.matched_complaints = [
            {
                "id": "1",
                "text": "The entire MG Road area has been without water supply for 2 days.",
                "similarity_score": 85
            }
        ]
        
    return response

def get_mock_priority_score(data_dict: dict) -> PriorityScoreResponse:
    """Fallback mock AI engine for Priority Scoring."""
    logger.info("Using AI Fallback Mock for Priority Score")
    
    score = 50
    label = "Medium"
    
    # Basic rule-based fallback
    if data_dict.get("nearby_hospitals", 0) > 0:
        score = 95
        label = "Critical"
    elif data_dict.get("severity", "").lower() == "high":
        score = 80
        label = "High"
        
    return PriorityScoreResponse(
        priority_score=score,
        priority_label=label,
        reasoning="Mock fallback calculated based on basic heuristics."
    )

def get_mock_project_recommendation(data_dict: dict) -> ProjectRecommendationResponse:
    """Fallback mock AI engine for Project Recommendation."""
    logger.info("Using AI Fallback Mock for Project Recommendation")
    
    return ProjectRecommendationResponse(
        top_development_recommendation="Construct new drainage system in affected hotspots",
        suggested_department="Public Works Department (PWD)",
        estimated_impact="High",
        estimated_timeline="6-8 months",
        budget_priority="High Priority",
        expected_beneficiaries=data_dict.get("support_count", 0) * 10,
        reasoning="Based on the recurring complaints in these hotspots, a structural upgrade is required."
    )

def get_mock_explain(context: str, decision_type: str) -> ExplainResponse:
    """Fallback mock AI engine for Explainable AI."""
    logger.info("Using AI Fallback Mock for Explainable AI")
    
    return ExplainResponse(
        explanation_bullets=[
            "The system detected keywords indicating severe infrastructure failure.",
            "Historical data shows similar issues escalate quickly if unresolved."
        ],
        supporting_evidence=[
            f"Context contained: {context[:30]}...",
            f"Decision Type requested: {decision_type}"
        ],
        priority_justification="High impact on citizen daily life warrants immediate attention.",
        confidence=85
    )

def get_mock_mp_insights(data_dict: dict) -> MPInsightsResponse:
    """Fallback mock AI engine for MP Dashboard Insights."""
    logger.info("Using AI Fallback Mock for MP Insights")
    
    return MPInsightsResponse(
        top_issues=["Severe Water Logging", "Broken Streetlights", "Potholes on Main Roads"],
        weekly_trends=["Sanitation complaints increased by 15%", "Overall resolution speed improved by 5%"],
        predicted_hotspots=["Sector 4 (Water)", "Downtown (Traffic)"],
        increasing_complaint_categories=["Sanitation", "Roads"],
        constituency_health_score=68,
        citizen_satisfaction="Moderate",
        risk_alerts=["High risk of monsoon flooding in North Zone"],
        budget_recommendations=["Divert 15% of discretionary fund to immediate drainage clearing"],
        next_month_predictions=["Expect sharp rise in electricity complaints as summer peaks"]
    )

def get_mock_executive_summary(report_type: str, data: dict) -> str:
    """Fallback mock AI engine for Executive Summary generation."""
    logger.info(f"Using AI Fallback Mock for {report_type} Executive Summary")
    
    return (
        f"This {report_type} report highlights several critical areas requiring immediate attention from the Member of Parliament. "
        "Recent aggregated metrics suggest a slight increase in infrastructure-related complaints, particularly concerning water "
        "logging and road conditions. \n\n"
        "It is highly recommended to review the severe hotspots listed below and prioritize resource allocation accordingly. "
        "Proactive intervention in these highlighted zones is expected to significantly improve overall citizen satisfaction."
    )
