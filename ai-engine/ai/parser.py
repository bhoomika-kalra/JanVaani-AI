import json
import logging
import re
from typing import Optional
from ai.schemas import ComplaintAnalysisResponse, VoiceAnalysisResponse, TranslationResponse, NextQuestionResponse, ImageAnalysisResponse, DuplicateCheckResponse, PriorityScoreResponse, ProjectRecommendationResponse, ExplainResponse, MPInsightsResponse

logger = logging.getLogger(__name__)

def parse_gemini_response(response_text: str) -> Optional[ComplaintAnalysisResponse]:
    """
    Parses the raw JSON string from Gemini into our Pydantic model.
    Includes auto-repair logic to strip markdown formatting if Gemini hallucinates it.
    """
    cleaned_text = response_text.strip()
    
    # Auto-repair: Strip markdown code blocks if they exist
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return ComplaintAnalysisResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini response after cleaning: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_gemini_voice_response(response_text: str) -> Optional[VoiceAnalysisResponse]:
    """
    Parses the raw JSON string from Gemini into our VoiceAnalysisResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return VoiceAnalysisResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini voice response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_gemini_translation_response(response_text: str) -> Optional[TranslationResponse]:
    """
    Parses the raw JSON string from Gemini into our TranslationResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return TranslationResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini translation response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_next_question_response(response_text: str) -> Optional[NextQuestionResponse]:
    """
    Parses the raw JSON string from Gemini into our NextQuestionResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return NextQuestionResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini next question response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_image_analysis_response(response_text: str) -> Optional[ImageAnalysisResponse]:
    """
    Parses the raw JSON string from Gemini into our ImageAnalysisResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return ImageAnalysisResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini image analysis response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_duplicate_check_response(response_text: str) -> Optional[DuplicateCheckResponse]:
    """
    Parses the raw JSON string from Gemini into our DuplicateCheckResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return DuplicateCheckResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini duplicate check response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_priority_score_response(response_text: str) -> Optional[PriorityScoreResponse]:
    """
    Parses the raw JSON string from Gemini into our PriorityScoreResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return PriorityScoreResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini priority score response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_project_recommendation_response(response_text: str) -> Optional[ProjectRecommendationResponse]:
    """
    Parses the raw JSON string from Gemini into our ProjectRecommendationResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return ProjectRecommendationResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini project recommendation response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_explain_response(response_text: str) -> Optional[ExplainResponse]:
    """
    Parses the raw JSON string from Gemini into our ExplainResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return ExplainResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini explain response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None

def parse_mp_insights_response(response_text: str) -> Optional[MPInsightsResponse]:
    """
    Parses the raw JSON string from Gemini into our MPInsightsResponse model.
    """
    cleaned_text = response_text.strip()
    
    if cleaned_text.startswith("```json"):
        cleaned_text = cleaned_text[7:]
    elif cleaned_text.startswith("```"):
        cleaned_text = cleaned_text[3:]
        
    if cleaned_text.endswith("```"):
        cleaned_text = cleaned_text[:-3]
        
    cleaned_text = cleaned_text.strip()
    
    try:
        data = json.loads(cleaned_text)
        return MPInsightsResponse(**data)
    except Exception as e:
        logger.error(f"Failed to parse Gemini MP insights response: {e}")
        logger.error(f"Raw string was: {response_text}")
        return None
