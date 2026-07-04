import io
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import openpyxl

class ReportGenerator:
    """Service to generate PDF, Excel, and JSON reports."""

    def generate_pdf(self, title: str, summary: str, data: dict) -> io.BytesIO:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()

        # Title
        title_style = styles['Title']
        elements.append(Paragraph(title, title_style))
        elements.append(Spacer(1, 12))

        # Executive Summary
        if summary:
            elements.append(Paragraph("<b>AI Executive Summary</b>", styles['Heading2']))
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(summary, styles['BodyText']))
            elements.append(Spacer(1, 12))

        # Data
        elements.append(Paragraph("<b>Data Breakdown</b>", styles['Heading2']))
        elements.append(Spacer(1, 6))
        
        table_data = [["Metric", "Value"]]
        for key, value in data.items():
            table_data.append([str(key), str(value)])

        table = Table(table_data)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        elements.append(table)
        doc.build(elements)
        buffer.seek(0)
        return buffer

    def generate_excel(self, title: str, summary: str, data: dict) -> io.BytesIO:
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Report Data"

        # Write Title & Summary
        ws.append([title])
        ws.append([])
        ws.append(["AI Executive Summary"])
        ws.append([summary])
        ws.append([])

        # Write Headers
        ws.append(["Metric", "Value"])
        
        # Write Data
        for key, value in data.items():
            if isinstance(value, list) or isinstance(value, dict):
                ws.append([str(key), json.dumps(value)])
            else:
                ws.append([str(key), str(value)])

        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        return buffer

    def generate_json(self, title: str, summary: str, data: dict) -> dict:
        return {
            "title": title,
            "executive_summary": summary,
            "data": data
        }

report_generator = ReportGenerator()
