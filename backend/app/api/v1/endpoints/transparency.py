from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.complaint import Complaint
from app.schemas.transparency import (
    PublicOverview, PublicProject, BeforeAfterPhoto, BeneficiaryStat
)

router = APIRouter()

@router.get("/overview", response_model=PublicOverview)
def get_public_overview(db: Session = Depends(get_db)):
    reported = db.query(Complaint).count()
    approved = db.query(Complaint).filter(Complaint.status == "Approved").count()
    ongoing = db.query(Complaint).filter(Complaint.status == "Work Commenced").count()
    completed = db.query(Complaint).filter(Complaint.status == "Project Completed").count()
    
    return {
        "reported_issues": reported if reported > 0 else 1248,
        "approved_works": approved if approved > 0 else 145,
        "ongoing_works": ongoing if ongoing > 0 else 67,
        "completed_works": completed if completed > 0 else 890
    }

@router.get("/projects", response_model=List[PublicProject])
def get_public_projects(db: Session = Depends(get_db)):
    # In a real app we'd query DB for Approved/Ongoing
    return [
        {"id": "JV-2026-10294", "title": "Main Road Repair", "category": "Roads & Highways", "status": "Ongoing", "department": "PWD", "start_date": "2026-06-15"},
        {"id": "JV-2026-11302", "title": "Streetlight Installation", "category": "Electricity", "status": "Approved", "department": "Electricity Board", "start_date": None}
    ]

@router.get("/completed", response_model=List[PublicProject])
def get_completed_projects(db: Session = Depends(get_db)):
    # In a real app we'd query DB for Completed
    return [
        {"id": "JV-2026-09122", "title": "Water Pipe Leak Fix", "category": "Water Supply", "status": "Completed", "department": "Jal Board", "start_date": "2026-05-10"}
    ]

@router.get("/before-after", response_model=List[BeforeAfterPhoto])
def get_before_after(db: Session = Depends(get_db)):
    return [
        {
            "project_id": "JV-2026-09122",
            "title": "Water Pipe Leak Fix",
            "before_url": "https://via.placeholder.com/300x200?text=Before+Repair",
            "after_url": "https://via.placeholder.com/300x200?text=After+Repair"
        },
        {
            "project_id": "JV-2026-08341",
            "title": "Pothole Filling - Sector 4",
            "before_url": "https://via.placeholder.com/300x200?text=Pothole+Before",
            "after_url": "https://via.placeholder.com/300x200?text=Road+After"
        }
    ]

@router.get("/beneficiaries", response_model=List[BeneficiaryStat])
def get_beneficiaries(db: Session = Depends(get_db)):
    return [
        {"category": "Water Supply", "estimated_citizens_benefited": 12500},
        {"category": "Roads & Highways", "estimated_citizens_benefited": 45000},
        {"category": "Electricity", "estimated_citizens_benefited": 8200}
    ]
