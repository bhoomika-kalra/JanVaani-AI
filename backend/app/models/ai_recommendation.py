from sqlalchemy import Column, Integer, Text, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.base_class import Base

class AIRecommendation(Base):
    __tablename__ = "ai_recommendation"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaint.id"), unique=True)
    suggested_department_id = Column(Integer, ForeignKey("department.id"), nullable=True)
    risk_score = Column(Float, nullable=True)
    reasoning = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint")
    suggested_department = relationship("Department")
