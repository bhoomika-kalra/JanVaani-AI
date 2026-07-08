import random
from datetime import datetime
import sys
import os

# Ensure ai-engine is in path to import gemini_client
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../ai-engine")))
try:
    from ai.gemini_client import gemini_client
except ImportError:
    gemini_client = None

class SummaryGenerator:
    @staticmethod
    def get_report_data():
        """Aggregates dashboard stats and fetches AI intelligence."""
        month_name = datetime.now().strftime("%B %Y")
        
        # Raw dummy dashboard stats
        dashboard_stats = {
            "complaint_stats": {
                "Total Complaints": 1248,
                "Active": 342,
                "Resolved": 890,
                "High Priority": 45
            },
            "category_breakdown": {
                "Water": 32, "Roads": 24, "Electricity": 18, "Sanitation": 14, "Healthcare": 12
            },
            "ward_distribution": {
                "Ward 14": 145, "Ward 8": 210, "Ward 22": 98, "Ward 19": 65, "Ward 3": 110
            },
            "monthly_trends": {
                "Jan": 300, "Feb": 450, "Mar": 400, "Apr": 650, "May": 800, "Jun": 950, "Jul": 1248
            },
            "dept_performance": {
                "PWD": 85, "Water Supply": 62, "Electricity": 92, "Sanitation": 78
            }
        }
        
        # Fetch Dynamic AI Intelligence
        ai_data = {}
        if gemini_client:
            ai_data = gemini_client.generate_monthly_report_intelligence(dashboard_stats)
            
        return {
            "month": month_name,
            "stats": dashboard_stats,
            "ai": ai_data
        }
