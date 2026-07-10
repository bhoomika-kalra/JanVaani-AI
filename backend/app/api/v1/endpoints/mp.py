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
import sqlalchemy

logger = logging.getLogger(__name__)

@router.post("/register", response_model=MPTokenResponse)
def register_mp(
    full_name: str = Form(...),
    email: str = Form(...),
    mobile_number: str = Form(...),
    state: str = Form(None),
    district: str = Form(None),
    constituency: str = Form(...),
    government_id: str = Form(...),
    password: str = Form(...),
    official_id_file: UploadFile = File(...),
    db: Session = Depends(get_db)
) -> Any:
    logger.info("Received MP registration request")
    
    if not password or len(password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters long")
    if len(password.encode('utf-8')) > 72:
        raise HTTPException(status_code=400, detail="Password is too long (maximum 72 bytes)")

    file_path = None
    try:
        existing_mp = db.query(MPUser).filter(
            (MPUser.email == email) | (MPUser.official_id_number == government_id)
        ).first()
        
        if existing_mp:
            raise HTTPException(status_code=409, detail="MP already registered with this email or official ID")
            
        logger.info("Hashing password...")
        hashed_password = get_password_hash(password)

        logger.info("Validation passed. Saving file...")
        try:
            os.makedirs("/tmp/janvaani_uploads", exist_ok=True)
            file_path = f"/tmp/janvaani_uploads/mp_{government_id}_{official_id_file.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(official_id_file.file, buffer)
            logger.info("File saved successfully")
        except Exception:
            logger.exception("Failed to save uploaded file")
            raise HTTPException(status_code=500, detail="Failed to save identification document on the server.")
        mp_user = MPUser(
            full_name=full_name,
            email=email,
            hashed_password=hashed_password,
            mobile=mobile_number,
            state=state,
            district=district,
            constituency=constituency,
            official_id_number=government_id,
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
        if file_path and os.path.exists(file_path):
            try: os.remove(file_path)
            except: pass
        raise
    except sqlalchemy.exc.IntegrityError:
        logger.exception("Database integrity error during MP registration")
        db.rollback()
        if file_path and os.path.exists(file_path):
            try: os.remove(file_path)
            except: pass
        raise HTTPException(status_code=409, detail="A user with these details already exists.")
    except Exception:
        logger.exception("Unexpected error during MP registration")
        db.rollback()
        if file_path and os.path.exists(file_path):
            try: os.remove(file_path)
            except: pass
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
