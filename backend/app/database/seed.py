import logging
from sqlalchemy.orm import Session
from app.models import MPUser, Department, Citizen

logger = logging.getLogger(__name__)

def seed_db(db: Session) -> None:
    # Seed Departments
    if not db.query(Department).first():
        logger.info("Seeding Departments...")
        deps = [
            Department(name="Roads & Highways", description="Potholes, broken roads, highway issues"),
            Department(name="Water & Sanitation", description="Water supply, drainage, garbage collection"),
            Department(name="Electricity", description="Power cuts, broken streetlights"),
        ]
        db.add_all(deps)
        db.commit()

    # Seed MP User
    if not db.query(MPUser).first():
        logger.info("Seeding MP User...")
        mp = MPUser(
            email="mp@janvaani.gov.in",
            hashed_password="hashed_dummy_password",
            full_name="Hon. Member of Parliament",
            constituency="South Delhi",
            state="Delhi",
            role="mp"
        )
        db.add(mp)
        db.commit()

    # Seed Citizen
    if not db.query(Citizen).first():
        logger.info("Seeding Citizen...")
        citizen = Citizen(
            phone_number="+919876543210",
            name="Rahul Sharma",
            constituency="South Delhi"
        )
        db.add(citizen)
        db.commit()
        
    logger.info("Database seeding complete.")
