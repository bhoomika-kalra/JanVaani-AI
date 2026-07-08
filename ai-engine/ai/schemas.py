from pydantic import BaseModel, Field
from typing import List, Optional

class ComplaintAnalysisRequest(BaseModel):
    complaint: str

class ComplaintAnalysisResponse(BaseModel):
    complaint_summary: str = Field(description="A concise summary of the citizen's complaint")
    category: str = Field(description="The category of the complaint (e.g., Water, Roads, Electricity)")
    probable_department: str = Field(description="The most likely government department responsible")
    urgency: str = Field(description="Low, Medium, High, or Critical")
    confidence_score: int = Field(description="Confidence score of this analysis between 0 and 100")
    sentiment: str = Field(description="The sentiment of the citizen: Positive, Neutral, Negative, or Angry")
    detected_language: str = Field(description="The language the complaint is written in")
    location_mentioned: str = Field(default="Unknown", description="Any specific location, address, or landmark mentioned")
    issue_keywords: List[str] = Field(description="A list of 3-5 keywords related to the issue")
    suggested_title: str = Field(description="A short, formal title for the complaint ticket")

class VoiceAnalysisRequest(BaseModel):
    transcript: str

class VoiceAnalysisResponse(BaseModel):
    summary: str = Field(description="A concise summary of the spoken complaint")
    category: str = Field(description="The category of the complaint (e.g., Water, Roads, Electricity)")
    urgency: str = Field(description="Low, Medium, High, or Critical")
    department: str = Field(description="The most likely government department responsible")
    language: str = Field(description="The language the transcript was spoken in")
    confidence: int = Field(description="Confidence score of this analysis between 0 and 100")
    location: str = Field(default="Unknown", description="Any specific location or address mentioned")
    missing_information: List[str] = Field(default_factory=list, description="A list of critical information pieces that are missing (e.g., exact village name)")
    follow_up_questions: List[str] = Field(default_factory=list, description="Questions generated in the same language to ask the user for the missing information")

class TranslationRequest(BaseModel):
    text: str
    target_language: str

class TranslationResponse(BaseModel):
    detected_language: str = Field(description="The language the input text was written in")
    translated_text: str = Field(description="The final translated text in the target language")
    confidence: int = Field(description="Confidence score of this translation between 0 and 100")

class NextQuestionRequest(BaseModel):
    complaint: str

class NextQuestionResponse(BaseModel):
    next_question: str = Field(description="One natural follow-up question asking for the missing info")
    reason: str = Field(description="Reason for asking this question")
    remaining_missing_fields: List[str] = Field(description="List of fields still missing (e.g. location, department)")
    confidence: int = Field(description="Confidence score between 0 and 100")

class ImageAnalysisResponse(BaseModel):
    issue_detected: str = Field(description="The primary civic issue detected in the image")
    confidence: int = Field(description="Confidence score between 0 and 100. Lower this if image is blurry.")
    category: str = Field(description="The category of the issue")
    severity: str = Field(description="Low, Medium, High, or Critical")
    description: str = Field(description="A brief visual description of the problem")
    suggested_department: str = Field(description="The suggested government department to resolve this")

class MatchedComplaint(BaseModel):
    id: str = Field(description="The ID of the matched existing complaint")
    text: str = Field(description="The text of the matched existing complaint")
    similarity_score: int = Field(description="Similarity score between 0 and 100")

class DuplicateCheckRequest(BaseModel):
    new_complaint: str

class DuplicateCheckResponse(BaseModel):
    duplicate_probability: int = Field(description="Overall probability (0-100) that this is a duplicate")
    matched_complaints: List[MatchedComplaint] = Field(description="List of similar existing complaints")
    recommended_action: str = Field(description="Must be exactly one of: 'Create new complaint', 'Merge complaint', 'Ask citizen to support existing complaint'")

class PriorityScoreRequest(BaseModel):
    complaint: str
    support_count: int
    age_days: int
    affected_population: int
    nearby_hospitals: int
    nearby_schools: int
    repeated_complaints: int
    severity: str

class PriorityScoreResponse(BaseModel):
    priority_score: int = Field(description="Calculated score between 0 and 100")
    priority_label: str = Field(description="Must be 'Critical', 'High', 'Medium', or 'Low'")
    reasoning: str = Field(description="Brief AI reasoning for why this score was assigned")

class ProjectRecommendationRequest(BaseModel):
    constituency_complaints: List[str]
    hotspots: List[str]
    priority_score: int
    support_count: int

class ProjectRecommendationResponse(BaseModel):
    top_development_recommendation: str = Field(description="The primary recommended project")
    suggested_department: str = Field(description="Department that should handle this")
    estimated_impact: str = Field(description="High, Medium, or Low")
    estimated_timeline: str = Field(description="Rough timeframe, e.g., '6-12 months'")
    budget_priority: str = Field(description="Priority for budget allocation")
    expected_beneficiaries: int = Field(description="Estimated number of people helped")
    reasoning: str = Field(description="Explanation of why this project solves the systemic issues")

class ExplainRequest(BaseModel):
    context: str = Field(description="The context to explain, such as complaint text or project summary")
    decision_type: str = Field(description="The type of decision, e.g., 'Priority Score', 'Department Selection'")

class ExplainResponse(BaseModel):
    explanation_bullets: List[str] = Field(description="List of concise, factual bullets explaining the decision")
    supporting_evidence: List[str] = Field(description="Facts from the context that support the explanation")
    priority_justification: str = Field(description="A single sentence justifying the priority level")
    confidence: int = Field(description="Confidence score between 0 and 100")

class MPInsightsResponse(BaseModel):
    top_issues: List[str] = Field(description="List of the primary issues currently affecting the constituency")
    weekly_trends: List[str] = Field(description="Short descriptions of how data changed this week")
    predicted_hotspots: List[str] = Field(description="Areas likely to experience severe issues soon")
    increasing_complaint_categories: List[str] = Field(description="Categories that are rising in volume")
    constituency_health_score: int = Field(description="Overall health score from 0 to 100")
    citizen_satisfaction: str = Field(description="Overall sentiment, e.g. 'Poor', 'Moderate', 'Improving'")
    risk_alerts: List[str] = Field(description="Critical warnings the MP must know about immediately")
    budget_recommendations: List[str] = Field(description="Where funds should be allocated")
    next_month_predictions: List[str] = Field(description="What to expect in the coming 30 days")

class MorningBriefResponse(BaseModel):
    mp_name: str = Field(description="Name of the MP")
    constituency: str = Field(description="Constituency name")
    title: str = Field(description="Title of the brief")
    bullets: List[str] = Field(description="Summary bullets")
    estimated_impact: str = Field(description="Estimated impact metric")
    priority: str = Field(description="Priority label")
    generated_at: str = Field(description="Generation time")

class ChatRequest(BaseModel):
    message: str = Field(description="The user's question")
    constituency: str = Field(description="Constituency name")

class ChatRelatedMetrics(BaseModel):
    ward: Optional[str] = None
    priority_score: Optional[int] = None
    citizens_affected: Optional[int] = None

class ChatResponse(BaseModel):
    answer: str = Field(description="Conversational answer to the MP")
    related_metrics: ChatRelatedMetrics = Field(default_factory=ChatRelatedMetrics)

class FeedbackAnalysisRequest(BaseModel):
    comment: str
    rating: int
    satisfaction_status: str

class FeedbackAnalysisResponse(BaseModel):
    sentiment: str = Field(description="Positive, Neutral, or Negative")
    urgency: str = Field(description="Low, Medium, or High")
    summary: str = Field(description="One sentence summary of the feedback")
    should_reopen: bool = Field(description="Whether the complaint should be reopened")
