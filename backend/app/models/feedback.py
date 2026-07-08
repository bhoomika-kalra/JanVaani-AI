from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from app.database.base_class import Base

class CitizenFeedback(Base):
    __tablename__ = "citizen_feedbacks"
    
    id = Column(Integer, primary_key=True, index=True)
    feedback_id = Column(String, unique=True, index=True)
    citizen_id = Column(String, index=True)
    complaint_id = Column(String, index=True)
    satisfaction_status = Column(String)
    rating = Column(Integer)
    comment = Column(String)
    photo_path = Column(String, nullable=True)
    sentiment = Column(String, nullable=True)
    flagged_for_review = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
