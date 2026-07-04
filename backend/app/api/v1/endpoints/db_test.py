from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.mp_user import MPUser
from app.models.citizen import Citizen

router = APIRouter()

@router.get("/")
def test_database(db: Session = Depends(get_db)):
    mps = db.query(MPUser).all()
    citizens = db.query(Citizen).all()
    
    return {
        "status": "success",
        "message": "Database connection and ORM models are working correctly.",
        "data": {
            "mp_count": len(mps),
            "citizen_count": len(citizens),
            "sample_mp": mps[0].full_name if mps else None,
            "sample_citizen": citizens[0].name if citizens else None
        }
    }
