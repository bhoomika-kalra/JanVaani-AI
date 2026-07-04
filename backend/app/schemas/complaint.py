from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ComplaintBase(BaseModel):
    title: str
    description: str
    department_id: Optional[int] = None
    location_lat: Optional[float] = None
    location_lng: Optional[float] = None
    address: Optional[str] = None

class ComplaintCreate(ComplaintBase):
    pass

class ComplaintResponse(ComplaintBase):
    id: int
    complaint_uid: str
    citizen_id: int
    status: str
    severity: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TimelineResponse(BaseModel):
    id: int
    complaint_id: int
    action: str
    remarks: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class MediaResponse(BaseModel):
    id: int
    complaint_id: int
    file_url: str
    media_type: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class SupportResponse(BaseModel):
    complaint_id: int
    total_supports: int
