import logging
import google.generativeai as genai
from tenacity import retry, stop_after_attempt, wait_exponential

from app.core.config import settings
from ai.config import ai_settings
from ai.prompts import COMPLAINT_UNDERSTANDING_PROMPT, VOICE_ANALYSIS_PROMPT, TRANSLATION_PROMPT, NEXT_QUESTION_PROMPT, IMAGE_ANALYSIS_PROMPT, DUPLICATE_CHECK_PROMPT, PRIORITY_SCORE_PROMPT, PROJECT_RECOMMENDATION_PROMPT, EXPLAIN_PROMPT, MP_INSIGHTS_PROMPT, EXECUTIVE_SUMMARY_PROMPT
from ai.parser import parse_gemini_response, parse_gemini_voice_response, parse_gemini_translation_response, parse_next_question_response, parse_image_analysis_response, parse_duplicate_check_response, parse_priority_score_response, parse_project_recommendation_response, parse_explain_response, parse_mp_insights_response
from ai.fallback import get_mock_analysis, get_mock_voice_analysis, get_mock_translation, get_mock_next_question, get_mock_image_analysis, get_mock_duplicate_check, get_mock_priority_score, get_mock_project_recommendation, get_mock_explain, get_mock_mp_insights, get_mock_executive_summary
from ai.schemas import ComplaintAnalysisResponse, VoiceAnalysisResponse, TranslationResponse, NextQuestionResponse, ImageAnalysisResponse, DuplicateCheckResponse, PriorityScoreResponse, ProjectRecommendationResponse, ExplainResponse, MPInsightsResponse
from ai.safety import validate_text_input, validate_image, validate_ai_confidence, AISafetyError

logger = logging.getLogger(__name__)

class GeminiClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.is_configured = bool(self.api_key)
        
        if self.is_configured:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(
                model_name=ai_settings.GEMINI_MODEL,
                generation_config={"response_mime_type": "application/json"}
            )
            logger.info("GeminiClient initialized successfully.")
        else:
            logger.warning("GEMINI_API_KEY is not set. GeminiClient will run in fallback mode.")

    @retry(stop=stop_after_attempt(ai_settings.MAX_RETRIES), wait=wait_exponential(multiplier=1, min=2, max=10))
    def _call_gemini(self, prompt: str) -> str:
        """Raw call to Gemini API with retry logic."""
        response = self.model.generate_content(prompt)
        return response.text

    def analyze_complaint(self, complaint_text: str) -> ComplaintAnalysisResponse:
        """
        Analyzes a citizen complaint and extracts structured data.
        """
        try:
            validate_text_input(complaint_text)
        except AISafetyError as e:
            logger.warning(f"Safety validation failed for complaint: {e}")
            return ComplaintAnalysisResponse(
                category="Rejected (Safety)",
                severity="Low",
                department="None",
                confidence=100,
                summary=f"Input rejected by safety layer: {str(e)}",
                actionable_steps=["Please provide a valid, descriptive complaint."],
                sentiment="Neutral"
            )
            
        if not self.is_configured:
            return get_mock_analysis(complaint_text)

        try:
            prompt = COMPLAINT_UNDERSTANDING_PROMPT.format(complaint_text=complaint_text)
            response_text = self._call_gemini(prompt)
            
            result = parse_gemini_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini output, falling back to mock.")
                return get_mock_analysis(text)
                
        except Exception as e:
            logger.error(f"Gemini API Error: {e}. Falling back to mock.")
            return get_mock_analysis(complaint_text)

    def analyze_voice(self, transcript: str) -> VoiceAnalysisResponse:
        """
        Analyzes transcribed voice complaints, which are often colloquial and messy.
        """
        try:
            validate_text_input(transcript)
        except AISafetyError as e:
            logger.warning(f"Safety validation failed for voice transcript: {e}")
            return VoiceAnalysisResponse(
                translated_text="[Rejected]",
                category="Rejected (Safety)",
                severity="Low",
                confidence=100,
                summary=f"Voice transcript rejected by safety layer: {str(e)}"
            )
            
        if not self.is_configured:
            return get_mock_voice_analysis(transcript)

        try:
            prompt = VOICE_ANALYSIS_PROMPT.format(transcript_text=transcript)
            response_text = self._call_gemini(prompt)
            
            result = parse_gemini_voice_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini voice output, falling back to mock.")
                return get_mock_voice_analysis(transcript)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Voice): {e}. Falling back to mock.")
            return get_mock_voice_analysis(transcript)

    def translate_text(self, text: str, target_language: str) -> TranslationResponse:
        """
        Translates a given text into the target language using Gemini.
        """
        if not self.is_configured:
            return get_mock_translation(text, target_language)

        try:
            prompt = TRANSLATION_PROMPT.format(source_text=text, target_language=target_language)
            response_text = self._call_gemini(prompt)
            
            result = parse_gemini_translation_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini translation output, falling back to mock.")
                return get_mock_translation(text, target_language)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Translation): {e}. Falling back to mock.")
            return get_mock_translation(text, target_language)

    def generate_next_question(self, text: str) -> NextQuestionResponse:
        """
        Determines missing information and generates a natural follow-up question.
        """
        if not self.is_configured:
            return get_mock_next_question(text)

        try:
            prompt = NEXT_QUESTION_PROMPT.format(complaint_text=text)
            response_text = self._call_gemini(prompt)
            
            result = parse_next_question_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini next question output, falling back to mock.")
                return get_mock_next_question(text)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Next Question): {e}. Falling back to mock.")
            return get_mock_next_question(text)

    def analyze_image(self, image_bytes: bytes, mime_type: str) -> ImageAnalysisResponse:
        """
        Uses Gemini Vision to identify issues in uploaded photos.
        """
        try:
            validate_image(image_bytes)
        except AISafetyError as e:
            logger.warning(f"Safety validation failed for image: {e}")
            return ImageAnalysisResponse(
                issue_detected="Invalid Image",
                confidence=0,
                category="Rejected (Safety)",
                severity="Low",
                description=f"Image rejected by safety layer: {str(e)}",
                suggested_department="None"
            )
            
        if not self.is_configured:
            return get_mock_image_analysis()

        try:
            image_part = {
                "mime_type": mime_type,
                "data": image_bytes
            }
            # We must use gemini-1.5-flash for multimodal
            response = self.model.generate_content([IMAGE_ANALYSIS_PROMPT, image_part])
            
            result = parse_image_analysis_response(response.text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini image analysis output, falling back to mock.")
                return get_mock_image_analysis()
                
        except Exception as e:
            logger.error(f"Gemini API Error (Image Analysis): {e}. Falling back to mock.")
            return get_mock_image_analysis()

    def check_duplicate(self, new_complaint: str, existing_complaints: list) -> DuplicateCheckResponse:
        """
        Compares a new complaint against existing complaints to find semantic duplicates.
        """
        if not self.is_configured:
            return get_mock_duplicate_check(new_complaint, existing_complaints)

        import json
        try:
            existing_json = json.dumps(existing_complaints, ensure_ascii=False)
            prompt = DUPLICATE_CHECK_PROMPT.format(
                new_complaint=new_complaint, 
                existing_complaints_json=existing_json
            )
            response_text = self._call_gemini(prompt)
            
            result = parse_duplicate_check_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini duplicate check output, falling back to mock.")
                return get_mock_duplicate_check(new_complaint, existing_complaints)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Duplicate Check): {e}. Falling back to mock.")
            return get_mock_duplicate_check(new_complaint, existing_complaints)

    def calculate_priority_score(self, request_data: dict) -> PriorityScoreResponse:
        """
        Calculates a priority score using AI reasoning and applies rule-based validation.
        """
        if not self.is_configured:
            return get_mock_priority_score(request_data)

        import json
        try:
            metadata_json = json.dumps(request_data, ensure_ascii=False)
            prompt = PRIORITY_SCORE_PROMPT.format(metadata_json=metadata_json)
            response_text = self._call_gemini(prompt)
            
            result = parse_priority_score_response(response_text)
            if not result:
                logger.error("Failed to parse Gemini priority score output, falling back to mock.")
                return get_mock_priority_score(request_data)
                
            # Rule-Based Validation Override
            if request_data.get("nearby_hospitals", 0) > 0 and result.priority_score < 90:
                logger.info("Rule-based override: Nearby hospital detected. Boosting score to Critical.")
                result.priority_score = 95
                result.priority_label = "Critical"
                result.reasoning = "[Rule Override] " + result.reasoning
                
            return result
                
        except Exception as e:
            logger.error(f"Gemini API Error (Priority Score): {e}. Falling back to mock.")
            return get_mock_priority_score(request_data)

    def recommend_project(self, request_data: dict) -> ProjectRecommendationResponse:
        """
        Analyzes macro constituency data to recommend a top-level development project.
        """
        if not self.is_configured:
            return get_mock_project_recommendation(request_data)

        import json
        try:
            metadata_json = json.dumps(request_data, ensure_ascii=False)
            prompt = PROJECT_RECOMMENDATION_PROMPT.format(metadata_json=metadata_json)
            response_text = self._call_gemini(prompt)
            
            result = parse_project_recommendation_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini project recommendation output, falling back to mock.")
                return get_mock_project_recommendation(request_data)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Project Recommendation): {e}. Falling back to mock.")
            return get_mock_project_recommendation(request_data)

    def explain_decision(self, request_data: dict) -> ExplainResponse:
        """
        Provides a human-readable explanation of why a specific AI decision was made.
        """
        decision_type = request_data.get("decision_type", "Unknown")
        context = request_data.get("context", "")
        
        if not self.is_configured:
            return get_mock_explain(context, decision_type)

        try:
            prompt = EXPLAIN_PROMPT.format(
                decision_type=decision_type,
                context_data=context
            )
            response_text = self._call_gemini(prompt)
            
            result = parse_explain_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini explain output, falling back to mock.")
                return get_mock_explain(context, decision_type)
                
        except Exception as e:
            logger.error(f"Gemini API Error (Explain): {e}. Falling back to mock.")
            return get_mock_explain(context, decision_type)

    def generate_mp_insights(self, aggregated_data: dict) -> MPInsightsResponse:
        """
        Generates macro-level predictive insights for the MP Dashboard based on constituency data.
        """
        if not self.is_configured:
            return get_mock_mp_insights(aggregated_data)

        import json
        try:
            metadata_json = json.dumps(aggregated_data, ensure_ascii=False)
            prompt = MP_INSIGHTS_PROMPT.format(aggregated_data=metadata_json)
            response_text = self._call_gemini(prompt)
            
            result = parse_mp_insights_response(response_text)
            if result:
                return result
            else:
                logger.error("Failed to parse Gemini MP insights output, falling back to mock.")
                return get_mock_mp_insights(aggregated_data)
                
        except Exception as e:
            logger.error(f"Gemini API Error (MP Insights): {e}. Falling back to mock.")
            return get_mock_mp_insights(aggregated_data)

    def generate_executive_summary(self, report_type: str, report_data: dict) -> str:
        """
        Generates a plain-text executive summary for PDF reports.
        """
        if not self.is_configured:
            return get_mock_executive_summary(report_type, report_data)

        import json
        try:
            data_json = json.dumps(report_data, ensure_ascii=False)
            prompt = EXECUTIVE_SUMMARY_PROMPT.format(
                report_type=report_type,
                report_data=data_json
            )
            response_text = self._call_gemini(prompt)
            
            # Since this is plain text, just return it directly (strip backticks if hallucinated)
            cleaned = response_text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[-1]
            if cleaned.endswith("```"):
                cleaned = cleaned.rsplit("\n", 1)[0]
                
            return cleaned.strip()
                
        except Exception as e:
            logger.error(f"Gemini API Error (Executive Summary): {e}. Falling back to mock.")
            return get_mock_executive_summary(report_type, report_data)

# Singleton instance
gemini_client = GeminiClient()
