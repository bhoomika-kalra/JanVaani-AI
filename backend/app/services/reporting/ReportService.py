import os
from datetime import datetime
from .SummaryGenerator import SummaryGenerator
from .PDFGenerator import PDFGenerator

class ReportService:
    def __init__(self):
        self.upload_dir = os.path.join(os.getcwd(), "uploads", "reports")
        os.makedirs(self.upload_dir, exist_ok=True)

    def generate_monthly_report(self):
        # 1. Collect data
        data = SummaryGenerator.get_report_data()

        # 2. Generate filename
        now = datetime.now()
        filename = f"JanVaani_Report_{now.strftime('%B')}_{now.year}.pdf"
        filepath = os.path.join(self.upload_dir, filename)

        # 3. Build PDF
        PDFGenerator.create_pdf(filepath, data)

        # 4. Return metadata
        return {
            "success": True,
            "filename": filename,
            "download_url": f"/uploads/reports/{filename}",
            "generated_at": now.isoformat(),
            "month": data['month']
        }

report_service = ReportService()
