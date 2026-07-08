from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class SMSNotificationLog(Base):
    __tablename__ = "sms_notification_log"
    
    id = Column(Integer, primary_key=True, index=True)
    sms_id = Column(String, index=True, nullable=True) # ID returned by provider
    citizen_id = Column(Integer, index=True)
    complaint_id = Column(String, index=True)
    phone_number = Column(String)
    event_type = Column(String)
    message = Column(Text)
    provider = Column(String, default="mock")
    status = Column(String, default="queued") # queued, sent, delivered, failed
    sent_at = Column(DateTime(timezone=True), nullable=True)
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
