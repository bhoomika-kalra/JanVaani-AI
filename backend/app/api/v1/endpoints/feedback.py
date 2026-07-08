from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import uuid

from app.database.session import get_db
from app.models.feedback import CitizenFeedback
from app.api.v1.endpoints.ai import analyze_feedback
from ai.schemas import FeedbackAnalysisRequest

router = APIRouter()

class FeedbackCreate(BaseModel):
    citizen_id: str
    complaint_id: str
    satisfaction_status: str
    rating: int
    comment: str
    photo_path: Optional[str] = None

class FeedbackResponse(FeedbackCreate):
    feedback_id: str
    sentiment: Optional[str] = None
    flagged_for_review: bool

    class Config:
        from_attributes = True

@router.post("", response_model=FeedbackResponse)
def create_feedback(data: FeedbackCreate, db: Session = Depends(get_db)):
    ai_req = FeedbackAnalysisRequest(
        comment=data.comment,
        rating=data.rating,
        satisfaction_status=data.satisfaction_status
    )
    try:
        ai_res = analyze_feedback(ai_req)
        sentiment = ai_res.sentiment
        flagged = ai_res.should_reopen
    except Exception as e:
        sentiment = "Negative" if data.rating <= 2 else ("Positive" if data.rating >= 4 else "Neutral")
        flagged = True if data.rating <= 2 or "not" in data.satisfaction_status.lower() else False

    feedback_id = f"FB-{uuid.uuid4().hex[:8].upper()}"
    new_feedback = CitizenFeedback(
        feedback_id=feedback_id,
        citizen_id=data.citizen_id,
        complaint_id=data.complaint_id,
        satisfaction_status=data.satisfaction_status,
        rating=data.rating,
        comment=data.comment,
        photo_path=data.photo_path,
        sentiment=sentiment,
        flagged_for_review=flagged
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@router.get("/citizen/{citizen_id}", response_model=List[FeedbackResponse])
def get_citizen_feedback(citizen_id: str, db: Session = Depends(get_db)):
    return db.query(CitizenFeedback).filter(CitizenFeedback.citizen_id == citizen_id).all()

@router.get("/complaint/{complaint_id}", response_model=List[FeedbackResponse])
def get_complaint_feedback(complaint_id: str, db: Session = Depends(get_db)):
    return db.query(CitizenFeedback).filter(CitizenFeedback.complaint_id == complaint_id).all()

@router.get("/mp", response_model=List[FeedbackResponse])
def get_mp_feedback(db: Session = Depends(get_db)):
    return db.query(CitizenFeedback).order_by(CitizenFeedback.created_at.desc()).all()

@router.get("/mp/summary")
def get_mp_feedback_summary(db: Session = Depends(get_db)):
    total = db.query(CitizenFeedback).count()
    if total == 0:
        return {"positive": 0, "negative": 0, "neutral": 0}
    
    pos = db.query(CitizenFeedback).filter(CitizenFeedback.sentiment == "Positive").count()
    neg = db.query(CitizenFeedback).filter(CitizenFeedback.sentiment == "Negative").count()
    neu = db.query(CitizenFeedback).filter(CitizenFeedback.sentiment == "Neutral").count()
    
    return {
        "positive": round((pos/total)*100),
        "negative": round((neg/total)*100),
        "neutral": round((neu/total)*100)
    }
