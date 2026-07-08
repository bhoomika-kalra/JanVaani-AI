from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SMSLogResponse(BaseModel):
    id: int
    sms_id: Optional[str]
    citizen_id: int
    complaint_id: str
    phone_number: str
    event_type: str
    message: str
    provider: str
    status: str
    sent_at: Optional[datetime]
    delivered_at: Optional[datetime]
    created_at: datetime

    class Config:
        orm_mode = True

class SMSMockReplyRequest(BaseModel):
    complaint_id: str
    reply: str
