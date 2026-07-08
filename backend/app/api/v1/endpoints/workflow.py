from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Any

from app.database.session import get_db
from app.core.auth import get_current_mp
from app.models.mp_user import MPUser
from app.models.complaint import Complaint, ComplaintTimeline
from app.models.notification_log import NotificationLog
from app.models.citizen import Citizen
from app.models.department import Department
from app.schemas.workflow import NoteCreate, DepartmentAssign
from app.schemas.complaint import TimelineResponse
from app.services.notification.sms_service import send_sms

router = APIRouter()

def _update_workflow_status(db: Session, complaint_id: int, status_title: str, description: str, updated_by: str) -> List[TimelineResponse]:
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    # Update main status if it's a primary status change, else just keep current
    # We will assume all status_titles are primary statuses except for "Internal Note"
    if status_title != "Internal Note":
        complaint.status = status_title
        
    # Create Timeline Entry
    timeline = ComplaintTimeline(
        complaint_id=complaint.id,
        status_title=status_title,
        description=description,
        updated_by=updated_by
    )
    db.add(timeline)
    
    # Create Notification Log (In-App)
    notif = NotificationLog(
        user_id=complaint.citizen_id,
        user_type="citizen",
        message=f"Update on your complaint {complaint.complaint_uid}: {status_title}. {description}",
        type="in_app"
    )
    db.add(notif)
    
    db.commit()
    db.refresh(complaint)
    
    # Send actual SMS if it's one of the trackable workflow events
    sms_events = ["Under Review", "AI Recommended", "Approved", "Work Commenced", "Project Completed"]
    if status_title in sms_events:
        citizen = db.query(Citizen).filter(Citizen.id == complaint.citizen_id).first()
        if citizen:
            # Map "Project Completed" back to "Completed", "Work Commenced" back to "Work Started" for template matching
            event_type = status_title
            if status_title == "Project Completed":
                event_type = "Completed"
            elif status_title == "Work Commenced":
                event_type = "Work Started"
                
            send_sms(
                db=db,
                citizen_id=citizen.id,
                phone_number=citizen.phone_number,
                complaint_id=complaint.complaint_uid,
                event_type=event_type,
                category=str(complaint.department_id) if complaint.department_id else ""
            )
    
    # Return updated timeline
    timelines = db.query(ComplaintTimeline).filter(ComplaintTimeline.complaint_id == complaint.id).order_by(ComplaintTimeline.created_at.desc()).all()
    return timelines

@router.put("/{complaint_id}/under-review", response_model=List[TimelineResponse])
def under_review(complaint_id: int, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "Under Review", "Complaint is currently being reviewed by officials.", current_mp.full_name)

@router.put("/{complaint_id}/ai-recommended", response_model=List[TimelineResponse])
def ai_recommended(complaint_id: int, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "AI Recommended", "AI Engine has analyzed the issue and generated a recommendation.", "JanVaani AI Engine")

@router.put("/{complaint_id}/approve", response_model=List[TimelineResponse])
def approve_complaint(complaint_id: int, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "Approved", "Funding and action approved by MP.", current_mp.full_name)

@router.put("/{complaint_id}/assign-department", response_model=List[TimelineResponse])
def assign_department(complaint_id: int, data: DepartmentAssign, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    # Dummy department logic
    dept = db.query(Department).filter(Department.name == data.department_name).first()
    if dept:
        complaint.department_id = dept.id
        
    return _update_workflow_status(db, complaint_id, "Assigned to Department", f"Assigned to {data.department_name}: {data.description}", current_mp.full_name)

@router.put("/{complaint_id}/start-work", response_model=List[TimelineResponse])
def start_work(complaint_id: int, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "Work Commenced", "Ground work has started.", current_mp.full_name)

@router.put("/{complaint_id}/complete", response_model=List[TimelineResponse])
def complete_work(complaint_id: int, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "Project Completed", "Issue has been fully resolved.", current_mp.full_name)

@router.post("/{complaint_id}/notes", response_model=List[TimelineResponse])
def add_note(complaint_id: int, data: NoteCreate, db: Session = Depends(get_db), current_mp: MPUser = Depends(get_current_mp)):
    return _update_workflow_status(db, complaint_id, "Internal Note", data.description, current_mp.full_name)
