from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class ImageAnalysisLog(Base):
    __tablename__ = "image_analysis_log"
    
    id = Column(Integer, primary_key=True, index=True)
    image_name = Column(String, index=True)
    citizen_id = Column(String, nullable=True, index=True)
    complaint_id = Column(String, nullable=True, index=True)
    primary_issue = Column(String)
    secondary_issues = Column(Text) # JSON string
    overall_severity = Column(String)
    overall_priority = Column(String)
    departments = Column(Text) # JSON string
    issues = Column(Text) # JSON string
    summary = Column(Text)
    objects = Column(Text) # JSON string
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
