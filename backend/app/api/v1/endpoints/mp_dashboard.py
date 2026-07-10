from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.core.auth import get_mp_region_filter, get_current_mp
from app.models.mp_user import MPUser
from app.models.complaint import Complaint
from app.schemas.mp_dashboard import (
    OverviewResponse, PriorityQueueItem, ExplainabilityResponse, Hotspot,
    CategoryStat, TrendStat, WardCount, FeedbackItem, TransparencyStat, Clustering
)

router = APIRouter()

@router.get("/overview", response_model=OverviewResponse)
def get_overview(
    db: Session = Depends(get_db),
    region_filter: dict = Depends(get_mp_region_filter),
    current_mp: MPUser = Depends(get_current_mp)
):
    # Try to calculate some dynamic counts based on the region
    total = db.query(Complaint).count() # Would normally filter by region_filter
    
    return {
        "totalComplaints": total if total > 0 else 1248,
        "activeIssues": 342,
        "aiRecommended": 12,
        "highPriority": 45,
        "completedWorks": 890,
        "citizenParticipation": "8.4k",
        "wards": [
            {"name": "Ward 14 (Downtown)", "count": 145, "trend": "+12%"},
            {"name": "Ward 22 (North Hub)", "count": 98, "trend": "-5%"},
            {"name": "Ward 08 (East Side)", "count": 210, "trend": "+24%"},
            {"name": "Ward 19 (West End)", "count": 65, "trend": "-2%"}
        ]
    }

@router.get("/priority-queue", response_model=List[PriorityQueueItem])
def get_priority_queue(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"id": "AI-774", "title": "Severe Waterlogging", "ward": "Ward 14", "category": "Drainage", "priority": 98, "estBudget": "₹4.5L", "status": "Pending Review"},
        {"id": "AI-775", "title": "Hostel Safety Audit", "ward": "Ward 22", "category": "Security", "priority": 95, "estBudget": "₹2.1L", "status": "Pending Review"},
        {"id": "AI-776", "title": "Chambal Bridge Repair", "ward": "Ward 08", "category": "Infrastructure", "priority": 92, "estBudget": "₹12.5L", "status": "Approved"},
        {"id": "AI-777", "title": "Power Cuts (48hr+)", "ward": "Ward 19", "category": "Electricity", "priority": 89, "estBudget": "₹1.0L", "status": "Assigned"},
        {"id": "AI-778", "title": "Toxic Waste Dump", "ward": "Ward 03", "category": "Sanitation", "priority": 85, "estBudget": "₹8.0L", "status": "Pending Review"},
    ]

@router.get("/explainability/{id}", response_model=ExplainabilityResponse)
def get_explainability(id: str, region_filter: dict = Depends(get_mp_region_filter)):
    return {
        "title": f"Deep Dive: {id}",
        "totalComplaintsAnalyzed": 342,
        "priorityScore": 98,
        "rootCause": "Historical data indicates the primary drainage arterial under MG Road has collapsed. Recent urban construction (Project ID: 882) likely weakened the structural integrity.",
        "clustering": {
            "twitter": 124,
            "app": 89,
            "helpline": 129
        },
        "trendPrediction": "Critical Alert: Monsoon arriving in 14 days. If unresolved, waterlogging will cascade to neighboring Ward 15, affecting approx 4,500 daily commuters.",
        "recommendedDept": "Public Works (PWD)",
        "estBudgetLimit": "₹4.5L - ₹5.2L",
        "similarHistoricalCase": "2021 MG Road Repair"
    }

@router.get("/hotspots", response_model=List[Hotspot])
def get_hotspots(region_filter: dict = Depends(get_mp_region_filter)):
    # Dummy lat/lng for heatmaps
    return [
        {"id": "hs-1", "lat": 28.6139, "lng": 77.2090, "intensity": 85, "category": "Roads", "ward": "Ward 14", "priority_score": 92, "citizens_affected": 450},
        {"id": "hs-2", "lat": 28.6200, "lng": 77.2100, "intensity": 45, "category": "Water", "ward": "Ward 22", "priority_score": 75, "citizens_affected": 210}
    ]

@router.get("/category-analytics", response_model=List[CategoryStat])
def get_category_analytics(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"name": "Water", "value": 32},
        {"name": "Roads", "value": 24},
        {"name": "Electricity", "value": 18},
        {"name": "Sanitation", "value": 14},
        {"name": "Healthcare", "value": 12},
    ]

@router.get("/monthly-trends", response_model=List[TrendStat])
def get_monthly_trends(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"month": "Jan", "val": 30},
        {"month": "Feb", "val": 45},
        {"month": "Mar", "val": 40},
        {"month": "Apr", "val": 65},
        {"month": "May", "val": 80},
        {"month": "Jun", "val": 95}
    ]

@router.get("/ward-distribution", response_model=List[WardCount])
def get_ward_distribution(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"name": "Ward 14", "count": 145, "trend": "+12%"},
        {"name": "Ward 22", "count": 98, "trend": "-5%"}
    ]

@router.get("/live-feedback", response_model=List[FeedbackItem])
def get_live_feedback(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"citizen": "Rahul S.", "comment": "The new streetlight in Ward 14 works perfectly.", "sentiment": "positive"},
        {"citizen": "Priya M.", "comment": "Water is still dirty.", "sentiment": "negative"}
    ]

@router.get("/transparency", response_model=List[TransparencyStat])
def get_transparency(region_filter: dict = Depends(get_mp_region_filter)):
    return [
        {"department": "PWD", "completion_rate": 88, "avg_resolution_days": 12},
        {"department": "Jal Board", "completion_rate": 65, "avg_resolution_days": 24}
    ]
