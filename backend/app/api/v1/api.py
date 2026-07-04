from fastapi import APIRouter
from app.api.v1.endpoints import db_test, citizens, complaints, ai, mp, mp_dashboard, workflow, notifications, reports, transparency

api_router = APIRouter()

api_router.include_router(db_test.router, prefix="/db-test", tags=["Testing"])
api_router.include_router(citizens.router, prefix="/citizens", tags=["Citizens"])
api_router.include_router(complaints.router, prefix="/complaints", tags=["Complaints"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Engine"])
api_router.include_router(mp.router, prefix="/mp", tags=["MP / Officials"])
api_router.include_router(mp_dashboard.router, prefix="/mp/dashboard", tags=["MP Dashboard"])
api_router.include_router(workflow.router, prefix="/workflow", tags=["Workflow Engine"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(transparency.router, prefix="/transparency", tags=["Public Transparency"])
