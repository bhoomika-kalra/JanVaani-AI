from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SMSRequest(BaseModel):
    citizen_id: int
    complaint_id: Optional[int] = None
    message: str

class NotificationResponse(BaseModel):
    id: int
    citizen_id: int
    complaint_id: Optional[int]
    message: str
    status: str
    type: str
    created_at: datetime

    class Config:
        from_attributes = True
