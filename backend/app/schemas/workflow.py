from pydantic import BaseModel
from typing import Optional

class NoteCreate(BaseModel):
    description: str

class DepartmentAssign(BaseModel):
    department_name: str
    description: Optional[str] = "Assigned to department."
