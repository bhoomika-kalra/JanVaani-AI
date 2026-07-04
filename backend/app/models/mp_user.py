from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database.base_class import Base

class MPUser(Base):
    __tablename__ = "mp_user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    mobile = Column(String, unique=True, index=True, nullable=True)
    state = Column(String, nullable=True)
    district = Column(String, nullable=True)
    constituency = Column(String, nullable=False)
    official_id_number = Column(String, unique=True, nullable=True)
    id_document_path = Column(String, nullable=True)
    role = Column(String, default="mp") # e.g. 'mp', 'admin'
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
