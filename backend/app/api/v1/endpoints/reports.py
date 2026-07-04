import csv
import io
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime

from app.database.session import get_db
from app.core.auth import get_mp_region_filter
from app.models.complaint import Complaint
from app.schemas.report import (
    MonthlySummaryResponse, TransparencySummaryResponse, AISummaryResponse
)

router = APIRouter()

@router.get("/monthly-summary", response_model=MonthlySummaryResponse)
def get_monthly_summary(db: Session = Depends(get_db), region_filter: dict = Depends(get_mp_region_filter)):
    # Using dummy aggregated data to match the "keep it simple" instruction
    return {
        "month": datetime.now().strftime("%B %Y"),
        "total_complaints": 1248,
        "resolved_complaints": 890,
        "categories": [
            {"category": "Water Supply", "count": 450},
            {"category": "Roads & Highways", "count": 320},
            {"category": "Electricity", "count": 280}
        ],
        "statuses": [
            {"status": "Open", "count": 342},
            {"status": "In Progress", "count": 16},
            {"status": "Resolved", "count": 890}
        ]
    }

@router.get("/complaints-csv")
def download_complaints_csv(db: Session = Depends(get_db), region_filter: dict = Depends(get_mp_region_filter)):
    complaints = db.query(Complaint).all()
    
    stream = io.StringIO()
    writer = csv.writer(stream)
    
    # Write Header
    writer.writerow(["Complaint ID", "UID", "Title", "Category", "Status", "Urgency", "Priority Score", "Submitted Date"])
    
    # Write Rows
    for c in complaints:
        writer.writerow([
            c.id, c.complaint_uid, c.title, c.category, c.status, 
            c.urgency, c.priority_score, c.created_at.strftime("%Y-%m-%d %H:%M:%S")
        ])
        
    response = StreamingResponse(iter([stream.getvalue()]), media_type="text/csv")
    response.headers["Content-Disposition"] = "attachment; filename=complaints_export.csv"
    return response

@router.get("/transparency-summary", response_model=TransparencySummaryResponse)
def get_transparency_summary(db: Session = Depends(get_db), region_filter: dict = Depends(get_mp_region_filter)):
    return {
        "overall_resolution_rate": 78.4,
        "departments": [
            {"department": "Public Works (PWD)", "complaints_received": 320, "complaints_resolved": 280, "resolution_rate": 87.5, "avg_resolution_days": 14.2},
            {"department": "Water Supply", "complaints_received": 450, "complaints_resolved": 290, "resolution_rate": 64.4, "avg_resolution_days": 22.1}
        ]
    }

@router.get("/ai-summary", response_model=AISummaryResponse)
def get_ai_summary(region_filter: dict = Depends(get_mp_region_filter)):
    return {
        "title": f"Constituency Health Report: {region_filter.get('constituency', 'All')}",
        "executive_summary": "Overall grievance resolution has improved by 14% this month. However, there is a critical emerging pattern of waterlogging complaints in Ward 14 that requires immediate preventative action before the monsoon season.",
        "key_highlights": [
            "Resolution times for Electricity faults decreased to under 48 hours.",
            "Citizen engagement on the JanVaani platform increased by 22%."
        ],
        "critical_action_items": [
            "Approve budget for MG Road drainage repair (Ward 14).",
            "Dispatch sanitation team to toxic waste dump site in Ward 03."
        ]
    }
