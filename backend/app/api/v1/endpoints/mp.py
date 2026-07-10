import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Any

from app.database.session import get_db
from app.core.auth import get_current_mp, get_mp_region_filter
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.mp_user import MPUser
from app.schemas.mp import MPLogin, MPUpdate, MPResponse, MPTokenResponse

router = APIRouter()

import logging

logger = logging.getLogger(__name__)

@router.post("/register", response_model=MPTokenResponse)
def register_mp(
    full_name: str = Form(...),
    email: str = Form(...),
    mobile: str = Form(...),
    state: str = Form(...),
    district: str = Form(...),
    constituency: str = Form(...),
    official_id_number: str = Form(...),
    password: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
) -> Any:
    logger.info(f"Received MP registration request for email: {email}")
    try:
        existing_mp = db.query(MPUser).filter(
            (MPUser.email == email) | (MPUser.official_id_number == official_id_number)
        ).first()
        
        if existing_mp:
            logger.warning(f"Registration failed: duplicate email {email} or ID {official_id_number}")
            raise HTTPException(status_code=400, detail="MP already registered with this email or official ID")
            
        logger.info("Validation passed. Saving file...")
        os.makedirs("uploads/documents", exist_ok=True)
        file_path = f"uploads/documents/mp_{official_id_number}_{file.filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"File saved successfully to {file_path}")
            
        logger.info("Hashing password...")
        mp_user = MPUser(
            full_name=full_name,
            email=email,
            hashed_password=get_password_hash(password),
            mobile=mobile,
            state=state,
            district=district,
            constituency=constituency,
            official_id_number=official_id_number,
            id_document_path=file_path,
            role="mp"
        )
        
        logger.info("Inserting into database...")
        db.add(mp_user)
        db.commit()
        db.refresh(mp_user)
        logger.info(f"Database insert completed for MP user {mp_user.id}")
        
        token = create_access_token(subject=mp_user.id, role="mp")
        return {
            "access_token": token,
            "token_type": "bearer",
            "mp_user": mp_user
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error during MP registration: {str(e)}", exc_info=True)
        db.rollback()
        raise HTTPException(status_code=500, detail="An unexpected error occurred during registration. Please try again.")

@router.post("/login", response_model=MPTokenResponse)
def login_mp(data: MPLogin, db: Session = Depends(get_db)) -> Any:
    mp_user = db.query(MPUser).filter(MPUser.email == data.email).first()
    if not mp_user or not verify_password(data.password, mp_user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
        
    token = create_access_token(subject=mp_user.id, role="mp")
    return {
        "access_token": token,
        "token_type": "bearer",
        "mp_user": mp_user
    }

@router.get("/profile", response_model=MPResponse)
def get_mp_profile(
    current_mp: MPUser = Depends(get_current_mp),
    region_filter: dict = Depends(get_mp_region_filter)
) -> Any:
    # We can inject region_filter into endpoints that need it.
    # For profile, we just return the MP.
    return current_mp

@router.put("/profile", response_model=MPResponse)
def update_mp_profile(
    data: MPUpdate,
    db: Session = Depends(get_db),
    current_mp: MPUser = Depends(get_current_mp)
) -> Any:
    if data.full_name: current_mp.full_name = data.full_name
    if data.mobile: current_mp.mobile = data.mobile
    if data.state: current_mp.state = data.state
    if data.district: current_mp.district = data.district
    if data.constituency: current_mp.constituency = data.constituency
    
    db.commit()
    db.refresh(current_mp)
    return current_mp

@router.post("/logout")
def logout_mp(current_mp: MPUser = Depends(get_current_mp)):
    # Dummy logout
    return {"message": "Successfully logged out"}
