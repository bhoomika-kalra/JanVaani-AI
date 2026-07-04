from pydantic import BaseModel, EmailStr
from typing import Optional

class MPLogin(BaseModel):
    email: EmailStr
    password: str

class MPUpdate(BaseModel):
    full_name: Optional[str] = None
    mobile: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    constituency: Optional[str] = None

class MPResponse(BaseModel):
    id: int
    email: str
    full_name: str
    mobile: Optional[str]
    state: Optional[str]
    district: Optional[str]
    constituency: str
    role: str
    official_id_number: Optional[str]
    id_document_path: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True

class MPTokenResponse(BaseModel):
    access_token: str
    token_type: str
    mp_user: MPResponse
