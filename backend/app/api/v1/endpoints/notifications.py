from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.sms_notification_log import SMSNotificationLog
from app.models.citizen import Citizen
from app.models.complaint import Complaint
from app.models.feedback import CitizenFeedback
from app.schemas.sms import SMSLogResponse, SMSMockReplyRequest
from app.services.notification.sms_service import send_sms

router = APIRouter()

# Note: These paths will be under /api/v1/notifications

@router.post("/sms/send", response_model=SMSLogResponse)
def send_sms_endpoint(citizen_id: int, complaint_id: str, event_type: str, category: str = "", db: Session = Depends(get_db)):
    citizen = db.query(Citizen).filter(Citizen.id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
        
    log = send_sms(db, citizen_id, citizen.phone_number, complaint_id, event_type, category)
    return log

@router.get("/sms/citizen/{citizen_id}", response_model=List[SMSLogResponse])
def get_citizen_sms_notifications(citizen_id: int, db: Session = Depends(get_db)):
    logs = db.query(SMSNotificationLog).filter(SMSNotificationLog.citizen_id == citizen_id).order_by(SMSNotificationLog.created_at.desc()).all()
    return logs

@router.get("/sms/complaint/{complaint_id}", response_model=List[SMSLogResponse])
def get_complaint_sms_notifications(complaint_id: str, db: Session = Depends(get_db)):
    logs = db.query(SMSNotificationLog).filter(SMSNotificationLog.complaint_id == complaint_id).order_by(SMSNotificationLog.created_at.desc()).all()
    return logs

@router.post("/sms/mock-reply")
def mock_sms_reply(data: SMSMockReplyRequest, db: Session = Depends(get_db)):
    # If reply = 1 (Yes), mark feedback as satisfied
    # If reply = 2 (Partially), mark feedback as partially satisfied
    # If reply = 3 (No), reopen complaint or flag for verification
    
    complaint = db.query(Complaint).filter(Complaint.complaint_id == data.complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    feedback = db.query(CitizenFeedback).filter(CitizenFeedback.complaint_id == data.complaint_id).first()
    if not feedback:
        # Create feedback if not exists
        feedback = CitizenFeedback(citizen_id=complaint.citizen_id, complaint_id=data.complaint_id)
        db.add(feedback)
        
    if data.reply == "1":
        feedback.sentiment = "Positive"
        feedback.comment = "User satisfied via SMS reply."
        feedback.flagged_for_review = False
    elif data.reply == "2":
        feedback.sentiment = "Neutral"
        feedback.comment = "User partially satisfied via SMS reply."
        feedback.flagged_for_review = True
    elif data.reply == "3":
        feedback.sentiment = "Negative"
        feedback.comment = "User not satisfied via SMS reply."
        feedback.flagged_for_review = True
        complaint.status = "Under Review" # Reopen complaint
    else:
        raise HTTPException(status_code=400, detail="Invalid reply code")
        
    db.commit()
    return {"success": True, "message": f"Feedback processed for reply {data.reply}"}
