from fastapi import APIRouter, UploadFile, File
from app.schemas.ai import (
    AIAnalysisResponse, TextInput, TranscriptInput, DuplicateInput, DuplicateResponse,
    PriorityInput, PriorityResponse, RecommendationInput, RecommendationResponse,
    SummaryInput, SummaryResponse
)
from app.services.ai_mock import analyze_dummy_text
import random

router = APIRouter()

@router.post("/analyze-text", response_model=AIAnalysisResponse)
def analyze_text(data: TextInput):
    return analyze_dummy_text(data.text)

@router.post("/analyze-voice-transcript", response_model=AIAnalysisResponse)
def analyze_voice_transcript(data: TranscriptInput):
    # Same logic as text for now
    return analyze_dummy_text(data.transcript)

@router.post("/analyze-image", response_model=AIAnalysisResponse)
def analyze_image(file: UploadFile = File(...)):
    # Mock visual analysis output (e.g. assumes image has a pothole if it's an image upload)
    return analyze_dummy_text("पॉटहोल सड़क") 

@router.post("/detect-duplicates", response_model=DuplicateResponse)
def detect_duplicates(data: DuplicateInput):
    analysis = analyze_dummy_text(data.text)
    return {
        "similar_complaints_count": analysis.similar_complaints_count,
        "similar_complaint_ids": [f"JV-2026-{random.randint(100000, 999999)}" for _ in range(analysis.similar_complaints_count)]
    }

@router.post("/priority-score", response_model=PriorityResponse)
def priority_score(data: PriorityInput):
    analysis = analyze_dummy_text(f"{data.title} {data.description}")
    return {
        "priority_score": analysis.priority_score,
        "urgency": analysis.urgency
    }

@router.post("/recommendation", response_model=RecommendationResponse)
def recommendation(data: RecommendationInput):
    analysis = analyze_dummy_text(data.description)
    return {
        "recommended_department": analysis.recommended_department,
        "confidence": analysis.confidence
    }

@router.post("/summary", response_model=SummaryResponse)
def summary(data: SummaryInput):
    analysis = analyze_dummy_text(data.description)
    return {
        "summary": analysis.short_explanation
    }
