from pydantic import BaseModel, constr
from typing import Optional, List
from datetime import datetime

class CitizenBase(BaseModel):
    phone_number: str
    name: Optional[str] = None
    constituency: Optional[str] = None
    language_preference: Optional[str] = "english"
    email: Optional[str] = None
    address: Optional[str] = None
    state: Optional[str] = None
    city_or_village: Optional[str] = None
    pincode: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None

class CitizenCreate(CitizenBase):
    pass

class CitizenLogin(BaseModel):
    phone_number: str
    otp: str # Dummy OTP field

class CitizenUpdate(BaseModel):
    name: Optional[str] = None
    constituency: Optional[str] = None
    language_preference: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    state: Optional[str] = None
    city_or_village: Optional[str] = None
    pincode: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None

class CitizenResponse(CitizenBase):
    id: int
    created_at: datetime
    verification_document_type: Optional[str] = None
    masked_document_number: Optional[str] = None
    
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
