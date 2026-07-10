import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Any, List

from app.database.session import get_db
from app.core.auth import get_current_citizen
from app.core.security import create_access_token
from app.models.citizen import Citizen
from app.models.citizen_verification import CitizenVerification
from app.models.complaint import Complaint, ComplaintSupport
from app.schemas.citizen import (
    CitizenCreate, CitizenLogin, CitizenResponse, 
    CitizenUpdate, TokenResponse, VerificationResponse, PreferencesUpdate
)

router = APIRouter()

@router.post("/register", response_model=TokenResponse)
def register_citizen(data: CitizenCreate, db: Session = Depends(get_db)) -> Any:
    existing = db.query(Citizen).filter(Citizen.phone_number == data.phone_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Phone number already registered")
        
    citizen = Citizen(
        phone_number=data.phone_number,
        name=data.name,
        constituency=data.constituency,
        language_preference=data.language_preference
    )
    db.add(citizen)
    db.commit()
    db.refresh(citizen)
    
    token = create_access_token(subject=citizen.id, role="citizen")
    return {
        "access_token": token,
        "token_type": "bearer",
        "citizen": citizen
    }

@router.post("/login", response_model=TokenResponse)
def login_citizen(data: CitizenLogin, db: Session = Depends(get_db)) -> Any:
    # Login via phone number OTP simulation
    citizen = db.query(Citizen).filter(Citizen.phone_number == data.phone_number).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
        
    token = create_access_token(subject=citizen.id, role="citizen")
    return {
        "access_token": token,
        "token_type": "bearer",
        "citizen": citizen
    }

@router.get("/profile", response_model=CitizenResponse)
def get_profile(
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    from app.models.citizen_verification import CitizenVerification
    verification = db.query(CitizenVerification).filter(CitizenVerification.citizen_id == current_citizen.id).first()
    
    profile_data = {
        "id": current_citizen.id,
        "phone_number": current_citizen.phone_number,
        "name": current_citizen.name,
        "constituency": current_citizen.constituency,
        "language_preference": current_citizen.language_preference,
        "email": current_citizen.email,
        "address": current_citizen.address,
        "state": current_citizen.state,
        "city_or_village": current_citizen.city_or_village,
        "pincode": current_citizen.pincode,
        "latitude": current_citizen.latitude,
        "longitude": current_citizen.longitude,
        "created_at": current_citizen.created_at,
    }
    
    if verification:
        profile_data["verification_document_type"] = verification.id_type
        id_num = verification.id_number
        if len(id_num) > 4:
            masked = "X" * (len(id_num) - 4) + id_num[-4:]
        else:
            masked = "XXXX"
        profile_data["masked_document_number"] = masked
        
    return profile_data
@router.put("/profile", response_model=CitizenResponse)
def update_profile(
    data: CitizenUpdate, 
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    if data.name is not None:
        current_citizen.name = data.name
    if data.constituency is not None:
        current_citizen.constituency = data.constituency
    if data.language_preference is not None:
        current_citizen.language_preference = data.language_preference
    if data.email is not None:
        current_citizen.email = data.email
    if data.address is not None:
        current_citizen.address = data.address
    if data.state is not None:
        current_citizen.state = data.state
    if data.city_or_village is not None:
        current_citizen.city_or_village = data.city_or_village
    if data.pincode is not None:
        current_citizen.pincode = data.pincode
    if data.latitude is not None:
        current_citizen.latitude = data.latitude
    if data.longitude is not None:
        current_citizen.longitude = data.longitude
        
        
    db.commit()
    db.refresh(current_citizen)
    return current_citizen

@router.post("/verify-id", response_model=VerificationResponse)
def verify_id(
    id_type: str = Form(...),
    id_number: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    existing = db.query(CitizenVerification).filter(CitizenVerification.citizen_id == current_citizen.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Verification already submitted")
        
    # Ensure upload directory exists
    os.makedirs("uploads/images", exist_ok=True)
    
    file_path = f"uploads/images/verify_{current_citizen.id}_{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    verification = CitizenVerification(
        citizen_id=current_citizen.id,
        id_type=id_type,
        id_number=id_number,
        file_path=file_path,
        status="pending"
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    return verification

@router.get("/complaints")
def get_complaints(
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    # Quick dump for prototype
    complaints = db.query(Complaint).filter(Complaint.citizen_id == current_citizen.id).all()
    return complaints

@router.get("/supported-issues")
def get_supported_issues(
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    supports = db.query(ComplaintSupport).filter(ComplaintSupport.citizen_id == current_citizen.id).all()
    return supports

@router.put("/preferences", response_model=CitizenResponse)
def update_preferences(
    data: PreferencesUpdate,
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    current_citizen.language_preference = data.language_preference
    db.commit()
    db.refresh(current_citizen)
    return current_citizen
