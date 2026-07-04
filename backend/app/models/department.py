from sqlalchemy import Column, Integer, String
from app.database.base_class import Base

class Department(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(String, nullable=True)
