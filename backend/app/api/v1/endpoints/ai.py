import sys
import os

# Add ai-engine to Python path
ai_engine_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../ai-engine"))
if ai_engine_path not in sys.path:
    sys.path.append(ai_engine_path)

from fastapi import APIRouter, UploadFile, File
from ai.schemas import (
    ComplaintAnalysisRequest, ComplaintAnalysisResponse,
    VoiceAnalysisRequest, VoiceAnalysisResponse,
    TranslationRequest, TranslationResponse,
    NextQuestionRequest, NextQuestionResponse,
    ImageAnalysisResponse, DuplicateCheckRequest, DuplicateCheckResponse,
    PriorityScoreRequest, PriorityScoreResponse,
    ProjectRecommendationRequest, ProjectRecommendationResponse,
    ExplainRequest, ExplainResponse, MPInsightsResponse
)
from ai.gemini_client import gemini_client

router = APIRouter()

@router.get("/health")
def ai_health():
    return {
        "status": "healthy",
        "provider": "Gemini",
        "mode": "live" if gemini_client.is_configured else "mock"
    }

@router.post("/analyze-complaint", response_model=ComplaintAnalysisResponse)
def analyze_complaint(data: ComplaintAnalysisRequest):
    """
    Receives raw complaint text and returns a highly structured 
    10-field intelligence payload via Gemini (or Mock Fallback).
    """
    result = gemini_client.analyze_complaint(data.complaint)
    return result

@router.post("/analyze-voice", response_model=VoiceAnalysisResponse)
def analyze_voice(data: VoiceAnalysisRequest):
    """
    Analyzes a voice transcript to extract intelligence and 
    generates follow-up questions if critical information is missing.
    """
    result = gemini_client.analyze_voice(data.transcript)
    return result

@router.post("/translate", response_model=TranslationResponse)
def translate(data: TranslationRequest):
    """
    Translates input text into the requested target language
    and identifies the original source language.
    """
    result = gemini_client.translate_text(data.text, data.target_language)
    return result

@router.post("/next-question", response_model=NextQuestionResponse)
def get_next_question(data: NextQuestionRequest):
    """
    Evaluates the complaint to determine missing context and 
    generates a single natural follow-up question.
    """
    result = gemini_client.generate_next_question(data.complaint)
    return result

@router.post("/analyze-image", response_model=ImageAnalysisResponse)
async def analyze_image(file: UploadFile = File(...)):
    """
    Analyzes an uploaded civic image for issues like potholes or garbage.
    """
    image_bytes = await file.read()
    result = gemini_client.analyze_image(image_bytes, file.content_type)
    return result

DUMMY_COMPLAINTS = [
    {"id": "1", "text": "The entire MG Road area has been without water supply for 2 days."},
    {"id": "2", "text": "Deep pothole near the central park entrance."},
    {"id": "3", "text": "Garbage has not been collected in sector 4 for a week."},
    {"id": "4", "text": "Street light is completely broken on 5th avenue."},
    {"id": "5", "text": "Open manhole on the sidewalk near the high school."}
]

@router.post("/check-duplicate", response_model=DuplicateCheckResponse)
def check_duplicate(data: DuplicateCheckRequest):
    """
    Compares a new complaint against existing ones to detect duplicates.
    """
    result = gemini_client.check_duplicate(data.new_complaint, DUMMY_COMPLAINTS)
    return result

@router.post("/priority-score", response_model=PriorityScoreResponse)
def get_priority_score(data: PriorityScoreRequest):
    """
    Calculates a priority score using AI reasoning and rule-based validation.
    """
    result = gemini_client.calculate_priority_score(data.model_dump())
    return result

@router.post("/recommend-project", response_model=ProjectRecommendationResponse)
def get_project_recommendation(data: ProjectRecommendationRequest):
    """
    Analyzes macro constituency data to recommend high-impact public works projects.
    """
    result = gemini_client.recommend_project(data.model_dump())
    return result

@router.post("/explain", response_model=ExplainResponse)
def get_explain(data: ExplainRequest):
    """
    Generates human-readable explanations of AI decisions for the MP Dashboard.
    """
    result = gemini_client.explain_decision(data.model_dump())
    return result

@router.get("/mp-insights", response_model=MPInsightsResponse)
def get_mp_insights():
    """
    Generates predictive macro-level insights for the MP Dashboard based on dummy constituency metrics.
    """
    # Dummy aggregated data that would normally come from the PostgreSQL database
    dummy_aggregated_data = {
        "total_complaints": 1245,
        "open_complaints": 312,
        "resolved_complaints": 933,
        "avg_resolution_time_days": 14,
        "complaint_categories": {
            "Roads": 450,
            "Water": 320,
            "Sanitation": 210,
            "Electricity": 150,
            "Other": 115
        },
        "recent_hotspots": [
            {"location": "Sector 4", "count": 85, "main_issue": "Water Logging"},
            {"location": "MG Road", "count": 62, "main_issue": "Potholes"}
        ]
    }
    
    result = gemini_client.generate_mp_insights(dummy_aggregated_data)
    return result
