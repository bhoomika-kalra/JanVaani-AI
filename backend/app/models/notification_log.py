from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class NotificationLog(Base):
    __tablename__ = "notification_log"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True) # Could be Citizen or MP depending on user_type
    user_type = Column(String) # 'citizen' or 'mp'
    type = Column(String) # 'sms', 'email', 'in_app'
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
