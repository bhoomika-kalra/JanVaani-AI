from pydantic import BaseModel
from typing import Optional, List

class AIAnalysisResponse(BaseModel):
    detected_language: str
    category: str
    confidence: int
    urgency: str
    priority_score: int
    similar_complaints_count: int
    short_explanation: str
    recommended_department: str
    estimated_citizens_affected: int

class SingleIssueDetection(BaseModel):
    name: str
    confidence: float
    severity: str

class ImageAnalysisResponse(BaseModel):
    primary_issue: str
    secondary_issues: List[str]
    overall_severity: str
    overall_priority: str
    departments: List[str]
    issues: List[SingleIssueDetection]
    summary: str
    objects: List[str]

class TextInput(BaseModel):
    text: str

class TranscriptInput(BaseModel):
    transcript: str
    
class DuplicateInput(BaseModel):
    text: str
    
class PriorityInput(BaseModel):
    title: str
    description: str

class RecommendationInput(BaseModel):
    description: str

class SummaryInput(BaseModel):
    description: str

class SummaryResponse(BaseModel):
    summary: str

class PriorityResponse(BaseModel):
    priority_score: int
    urgency: str

class DuplicateResponse(BaseModel):
    similar_complaints_count: int
    similar_complaint_ids: List[str]

class RecommendationResponse(BaseModel):
    recommended_department: str
    confidence: int
