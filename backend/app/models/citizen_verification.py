from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.base_class import Base

class CitizenVerification(Base):
    __tablename__ = "citizen_verification"
    id = Column(Integer, primary_key=True, index=True)
    citizen_id = Column(Integer, ForeignKey("citizen.id"), unique=True)
    id_type = Column(String, nullable=False)
    id_number = Column(String, unique=True, index=True, nullable=False)
    file_path = Column(String, nullable=False)
    status = Column(String, default="pending") # pending, verified, rejected
    
    citizen = relationship("Citizen", backref="verification")
