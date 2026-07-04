from pydantic import BaseModel, constr
from typing import Optional, List
from datetime import datetime

class CitizenBase(BaseModel):
    phone_number: str
    name: Optional[str] = None
    constituency: Optional[str] = None
    language_preference: Optional[str] = "english"

class CitizenCreate(CitizenBase):
    pass

class CitizenLogin(BaseModel):
    phone_number: str
    otp: str # Dummy OTP field

class CitizenUpdate(BaseModel):
    name: Optional[str] = None
    constituency: Optional[str] = None
    language_preference: Optional[str] = None

class CitizenResponse(CitizenBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    citizen: CitizenResponse

class VerificationCreate(BaseModel):
    id_type: str
    id_number: str
    
class VerificationResponse(BaseModel):
    id: int
    id_type: str
    id_number: str
    status: str
    file_path: str
    
    class Config:
        from_attributes = True
        
class PreferencesUpdate(BaseModel):
    language_preference: str
