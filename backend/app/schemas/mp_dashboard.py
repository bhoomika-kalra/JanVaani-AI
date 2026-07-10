from pydantic import BaseModel
from typing import List, Dict, Optional

class WardCount(BaseModel):
    name: str
    count: int
    trend: str

class OverviewResponse(BaseModel):
    totalComplaints: int
    activeIssues: int
    aiRecommended: int
    highPriority: int
    completedWorks: int
    citizenParticipation: str
    wards: List[WardCount]

class PriorityQueueItem(BaseModel):
    id: str
    title: str
    ward: str
    category: str
    priority: int
    estBudget: str
    status: str

class Clustering(BaseModel):
    twitter: int
    app: int
    helpline: int

class ExplainabilityResponse(BaseModel):
    title: str
    totalComplaintsAnalyzed: int
    priorityScore: int
    rootCause: str
    clustering: Clustering
    trendPrediction: str
    recommendedDept: str
    estBudgetLimit: str
    similarHistoricalCase: str

class Hotspot(BaseModel):
    id: str
    lat: float
    lng: float
    intensity: int
    category: str
    ward: str
    priority_score: int
    citizens_affected: int

class CategoryStat(BaseModel):
    name: str
    value: int

class TrendStat(BaseModel):
    month: str
    val: int

class FeedbackItem(BaseModel):
    citizen: str
    comment: str
    sentiment: str

class TransparencyStat(BaseModel):
    department: str
    completion_rate: int
    avg_resolution_days: int
