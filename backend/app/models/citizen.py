from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class Citizen(Base):
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    constituency = Column(String, nullable=True)
    language_preference = Column(String, default="english")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
