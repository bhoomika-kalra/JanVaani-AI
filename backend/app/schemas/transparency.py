from pydantic import BaseModel
from typing import List, Optional

class PublicOverview(BaseModel):
    reported_issues: int
    approved_works: int
    ongoing_works: int
    completed_works: int

class PublicProject(BaseModel):
    id: str
    title: str
    category: str
    status: str
    department: str
    start_date: Optional[str] = None

class BeforeAfterPhoto(BaseModel):
    project_id: str
    title: str
    before_url: str
    after_url: str

class BeneficiaryStat(BaseModel):
    category: str
    estimated_citizens_benefited: int
