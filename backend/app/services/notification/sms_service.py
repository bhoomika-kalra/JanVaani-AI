import os
from datetime import datetime
from sqlalchemy.orm import Session
from app.models.sms_notification_log import SMSNotificationLog
import uuid

def get_sms_template(event_type: str, complaint_id: str, category: str = "") -> str:
    templates = {
        "Complaint Registered": f"JanVaani AI: Your complaint has been registered successfully.\nComplaint ID: {complaint_id}\nCategory: {category}\nStatus: Submitted.",
        "Under Review": f"JanVaani AI: Your complaint {complaint_id} is now under review by the concerned authority.",
        "AI Recommended": f"JanVaani AI: Your complaint {complaint_id} has been prioritized by AI for further action.",
        "Approved": f"JanVaani AI: Your complaint {complaint_id} has been approved for execution.",
        "Work Started": f"JanVaani AI: Work has started for your complaint {complaint_id}.",
        "Completed": f"JanVaani AI: Your complaint {complaint_id} has been marked completed.\nAre you satisfied?\nReply 1 Yes, 2 Partially, 3 No."
    }
    return templates.get(event_type, f"JanVaani AI: Update on complaint {complaint_id}.")

def send_sms(db: Session, citizen_id: int, phone_number: str, complaint_id: str, event_type: str, category: str = "") -> SMSNotificationLog:
    """
    Core function to handle sending SMS notifications.
    Supports modes: mock, msg91_ready, twilio_ready
    """
    provider = os.getenv("SMS_PROVIDER", "mock")
    message = get_sms_template(event_type, complaint_id, category)
    
    # Initialize the log entry
    log = SMSNotificationLog(
        citizen_id=citizen_id,
        complaint_id=complaint_id,
        phone_number=phone_number,
        event_type=event_type,
        message=message,
        provider=provider,
        status="queued"
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    
    # Send SMS based on provider
    if provider == "mock":
        # Mock logic: return immediately with success
        log.status = "sent"
        log.sms_id = f"mock_{uuid.uuid4().hex}"
        log.sent_at = datetime.utcnow()
    elif provider == "msg91_ready":
        # TODO: Implement MSG91 real integration
        # msg91_auth_key = os.getenv("MSG91_AUTH_KEY")
        # sender_id = os.getenv("MSG91_SENDER_ID")
        # Use MSG91 API to send the SMS
        log.status = "failed" # Failing until actually implemented
    elif provider == "twilio_ready":
        # TODO: Implement Twilio real integration
        # account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        # auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        # from_number = os.getenv("TWILIO_FROM_NUMBER")
        # Use Twilio API to send the SMS
        log.status = "failed"
        
    db.commit()
    db.refresh(log)
    return log
