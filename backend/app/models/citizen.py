from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class Citizen(Base):
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    constituency = Column(String, nullable=True)
    language_preference = Column(String, default="english")
    
    # New Dynamic Profile Fields
    email = Column(String, nullable=True)
    address = Column(String, nullable=True)
    state = Column(String, nullable=True)
    city_or_village = Column(String, nullable=True)
    pincode = Column(String, nullable=True)
    latitude = Column(String, nullable=True) # Stored as string for flexibility/precision
    longitude = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
