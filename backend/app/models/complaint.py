from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.base_class import Base

class Complaint(Base):
    id = Column(Integer, primary_key=True, index=True)
    complaint_uid = Column(String, unique=True, index=True, nullable=True) # E.g., JV-2026-123456
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    citizen_id = Column(Integer, ForeignKey("citizen.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("department.id"), nullable=True)
    
    status = Column(String, default="pending") # pending, reviewed, in_progress, resolved
    severity = Column(String, default="low") # low, medium, high, critical
    location_lat = Column(Float, nullable=True)
    location_lng = Column(Float, nullable=True)
    address = Column(String, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    citizen = relationship("Citizen")
    department = relationship("Department")
    media = relationship("ComplaintMedia", backref="complaint")
    support = relationship("ComplaintSupport", backref="complaint")
    timeline = relationship("ComplaintTimeline", backref="complaint")


class ComplaintMedia(Base):
    __tablename__ = "complaint_media"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaint.id"))
    file_url = Column(String, nullable=False)
    media_type = Column(String) # image, audio, video
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ComplaintSupport(Base):
    __tablename__ = "complaint_support"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaint.id"))
    citizen_id = Column(Integer, ForeignKey("citizen.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ComplaintTimeline(Base):
    __tablename__ = "complaint_timeline"
    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaint.id"))
    action = Column(String, nullable=False) # Status change, note added, etc.
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
