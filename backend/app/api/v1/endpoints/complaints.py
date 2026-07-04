import os
import shutil
import random
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import Any, List

from app.database.session import get_db
from app.core.auth import get_current_citizen
from app.models.citizen import Citizen
from app.models.complaint import Complaint, ComplaintTimeline, ComplaintSupport, ComplaintMedia
from app.models.notification_log import NotificationLog
from app.schemas.complaint import ComplaintCreate, ComplaintResponse, TimelineResponse, SupportResponse, MediaResponse

router = APIRouter()

def generate_complaint_uid() -> str:
    year = datetime.now().year
    random_id = random.randint(100000, 999999)
    return f"JV-{year}-{random_id}"

@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    data: ComplaintCreate,
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    # 1. Create Complaint
    complaint = Complaint(
        complaint_uid=generate_complaint_uid(),
        title=data.title,
        description=data.description,
        citizen_id=current_citizen.id,
        department_id=data.department_id,
        location_lat=data.location_lat,
        location_lng=data.location_lng,
        address=data.address,
        status="pending",
        severity="medium"
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    
    # 2. Create Initial Timeline
    timeline = ComplaintTimeline(
        complaint_id=complaint.id,
        action="Complaint Registered",
        remarks="Your complaint has been successfully registered and is pending review."
    )
    db.add(timeline)
    
    # 3. Create Notification Log
    notification = NotificationLog(
        user_id=current_citizen.id,
        user_type="citizen",
        type="in_app",
        message=f"Your complaint '{complaint.title}' has been registered with ID {complaint.complaint_uid}."
    )
    db.add(notification)
    db.commit()
    
    return complaint

@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint(complaint_id: int, db: Session = Depends(get_db)) -> Any:
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

@router.get("/{complaint_id}/tracking", response_model=List[TimelineResponse])
def get_complaint_tracking(complaint_id: int, db: Session = Depends(get_db)) -> Any:
    timeline = db.query(ComplaintTimeline).filter(ComplaintTimeline.complaint_id == complaint_id).all()
    return timeline

@router.post("/{complaint_id}/support", response_model=SupportResponse)
def support_complaint(
    complaint_id: int,
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    existing_support = db.query(ComplaintSupport).filter(
        ComplaintSupport.complaint_id == complaint_id,
        ComplaintSupport.citizen_id == current_citizen.id
    ).first()
    
    if not existing_support:
        support = ComplaintSupport(complaint_id=complaint_id, citizen_id=current_citizen.id)
        db.add(support)
        db.commit()
        
    total_supports = db.query(ComplaintSupport).filter(ComplaintSupport.complaint_id == complaint_id).count()
    return {"complaint_id": complaint_id, "total_supports": total_supports}

@router.get("/nearby/")
def get_nearby_complaints(db: Session = Depends(get_db)) -> Any:
    # Prototype: Just return all complaints to simulate 'nearby'
    return db.query(Complaint).all()

ALLOWED_EXTENSIONS = {
    "image": [".jpg", ".jpeg", ".png"],
    "audio": [".mp3", ".wav"],
    "video": [".mp4", ".mov"]
}
MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

def save_media(complaint_id: int, file: UploadFile, media_type: str, db: Session) -> ComplaintMedia:
    # Validate extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS.get(media_type, []):
        raise HTTPException(status_code=400, detail=f"Invalid file type for {media_type}. Allowed: {ALLOWED_EXTENSIONS.get(media_type)}")
    
    # Check size (reads into memory slightly but is quick check)
    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    file.file.seek(0)
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 20MB.")
        
    os.makedirs(f"uploads/{media_type}s", exist_ok=True)
    file_path = f"uploads/{media_type}s/{complaint_id}_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    media = ComplaintMedia(
        complaint_id=complaint_id,
        file_url=file_path,
        media_type=media_type
    )
    db.add(media)
    db.commit()
    db.refresh(media)
    return media

@router.post("/{complaint_id}/media/image", response_model=MediaResponse)
def upload_image(
    complaint_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    return save_media(complaint_id, file, "image", db)

@router.post("/{complaint_id}/media/audio", response_model=MediaResponse)
def upload_audio(
    complaint_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    return save_media(complaint_id, file, "audio", db)

@router.post("/{complaint_id}/media/video", response_model=MediaResponse)
def upload_video(
    complaint_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_citizen: Citizen = Depends(get_current_citizen)
) -> Any:
    return save_media(complaint_id, file, "video", db)
