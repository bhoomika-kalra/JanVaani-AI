from pydantic import BaseModel
from typing import List

class CategoryCount(BaseModel):
    category: str
    count: int

class StatusCount(BaseModel):
    status: str
    count: int

class MonthlySummaryResponse(BaseModel):
    month: str
    total_complaints: int
    resolved_complaints: int
    categories: List[CategoryCount]
    statuses: List[StatusCount]

class DeptTransparency(BaseModel):
    department: str
    complaints_received: int
    complaints_resolved: int
    resolution_rate: float
    avg_resolution_days: float

class TransparencySummaryResponse(BaseModel):
    overall_resolution_rate: float
    departments: List[DeptTransparency]

class AISummaryResponse(BaseModel):
    title: str
    executive_summary: str
    key_highlights: List[str]
    critical_action_items: List[str]
