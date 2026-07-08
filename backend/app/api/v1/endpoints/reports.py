from fastapi import APIRouter, Query, Response
from fastapi.responses import StreamingResponse
from app.services.report_generator import report_generator
from app.services.reporting.ReportService import report_service
from ai.gemini_client import gemini_client

router = APIRouter()

def build_response(title: str, report_type: str, dummy_data: dict, format: str):
    # Generate AI summary
    summary = gemini_client.generate_executive_summary(report_type, dummy_data)
    
    if format == "pdf":
        buffer = report_generator.generate_pdf(title, summary, dummy_data)
        return StreamingResponse(
            buffer, 
            media_type="application/pdf", 
            headers={"Content-Disposition": f"attachment; filename={report_type}_report.pdf"}
        )
    elif format == "excel":
        buffer = report_generator.generate_excel(title, summary, dummy_data)
        return StreamingResponse(
            buffer, 
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
            headers={"Content-Disposition": f"attachment; filename={report_type}_report.xlsx"}
        )
    else:
        # Default JSON
        return report_generator.generate_json(title, summary, dummy_data)

@router.post("/monthly")
def generate_monthly_report_post():
    """Generates and saves a complete AI Monthly PDF report using matplotlib and reportlab."""
    return report_service.generate_monthly_report()

@router.get("/monthly")
def get_monthly_report(format: str = Query("json", description="Format: json, pdf, excel")):
    """Generates a Monthly constituency report."""
    dummy_data = {
        "Total Complaints Received": 1245,
        "Complaints Resolved": 933,
        "Resolution Rate": "74.9%",
        "Top Category": "Roads & Highways",
        "Top Hotspot": "Sector 4",
        "Citizen Sentiment": "Improving"
    }
    return build_response("JanVaani AI Monthly Report", "monthly", dummy_data, format.lower())

@router.get("/ward")
def get_ward_report(format: str = Query("json", description="Format: json, pdf, excel")):
    """Generates a Ward-wise breakdown report."""
    dummy_data = {
        "Ward 1 (North) Complaints": 450,
        "Ward 2 (South) Complaints": 320,
        "Ward 3 (East) Complaints": 210,
        "Ward 4 (West) Complaints": 265,
        "Highest Severity Ward": "Ward 1 (North)",
        "Fastest Resolution Ward": "Ward 3 (East)"
    }
    return build_response("JanVaani AI Ward Report", "ward", dummy_data, format.lower())

@router.get("/category")
def get_category_report(format: str = Query("json", description="Format: json, pdf, excel")):
    """Generates a Category breakdown report."""
    dummy_data = {
        "Roads & Transport": 450,
        "Water & Sanitation": 320,
        "Electricity": 210,
        "Public Safety": 150,
        "Parks & Recreation": 115,
        "Most Urgent Category": "Water & Sanitation",
        "Most Repeated Issue": "Potholes"
    }
    return build_response("JanVaani AI Category Report", "category", dummy_data, format.lower())
