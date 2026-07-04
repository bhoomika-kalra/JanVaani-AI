from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.notification_log import NotificationLog
from app.models.citizen import Citizen
from app.schemas.notification import SMSRequest, NotificationResponse
from app.services.mock_sms import send_dummy_sms

router = APIRouter()

@router.post("/send-sms", response_model=NotificationResponse)
def send_sms(data: SMSRequest, db: Session = Depends(get_db)):
    citizen = db.query(Citizen).filter(Citizen.id == data.citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen not found")
        
    # Call the mock SMS provider
    status = send_dummy_sms(citizen.phone_number, data.message)
    
    # Log the notification in the database
    log = NotificationLog(
        citizen_id=citizen.id,
        complaint_id=data.complaint_id,
        message=data.message,
        status=status,
        type="SMS"
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    
    return log

@router.get("/{citizen_id}", response_model=List[NotificationResponse])
def get_citizen_notifications(citizen_id: int, db: Session = Depends(get_db)):
    # Returns all SMS notifications sent to a specific citizen
    logs = db.query(NotificationLog).filter(NotificationLog.citizen_id == citizen_id).order_by(NotificationLog.created_at.desc()).all()
    return logs

@router.get("/complaint/{complaint_id}", response_model=List[NotificationResponse])
def get_complaint_notifications(complaint_id: int, db: Session = Depends(get_db)):
    # Returns all SMS notifications associated with a specific complaint ticket
    logs = db.query(NotificationLog).filter(NotificationLog.complaint_id == complaint_id).order_by(NotificationLog.created_at.desc()).all()
    return logs
