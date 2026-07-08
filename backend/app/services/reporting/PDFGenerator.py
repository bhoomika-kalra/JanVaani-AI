import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from .ChartGenerator import ChartGenerator

class PDFGenerator:
    @staticmethod
    def create_pdf(filepath: str, data: dict):
        doc = SimpleDocTemplate(filepath, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
        styles = getSampleStyleSheet()
        
        # Custom Styles
        title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'], fontSize=24, spaceAfter=20, textColor=colors.HexColor('#1e3a8a'))
        h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontSize=16, spaceBefore=20, spaceAfter=10, textColor=colors.HexColor('#0f172a'))
        h3_style = ParagraphStyle('H3Style', parent=styles['Heading3'], fontSize=14, spaceBefore=10, spaceAfter=5, textColor=colors.HexColor('#334155'))
        normal_style = styles['Normal']
        normal_style.fontSize = 11
        normal_style.leading = 16

        elements = []
        stats = data.get('stats', {})
        ai = data.get('ai', {})

        # 1. Header
        elements.append(Paragraph(f"JanVaani AI - Executive Monthly Report", title_style))
        elements.append(Paragraph(f"Report for: {data['month']}", normal_style))
        if ai.get('overall_health_score'):
            score = ai['overall_health_score']['Score']
            elements.append(Paragraph(f"<b>Overall Constituency Health Score:</b> {score}/100", normal_style))
        elements.append(Spacer(1, 20))

        # 2. Executive Summary
        elements.append(Paragraph("1. Executive Summary", h2_style))
        elements.append(Paragraph(ai.get('executive_summary', 'No summary available.'), normal_style))
        if ai.get('overall_health_score', {}).get('Explanation'):
            elements.append(Spacer(1, 10))
            elements.append(Paragraph(f"<i>Health Assessment:</i> {ai['overall_health_score']['Explanation']}", normal_style))
        
        # 3. Complaint Statistics
        elements.append(Paragraph("2. Complaint Statistics", h2_style))
        if 'complaint_stats' in stats:
            stats_data = [["Metric", "Value"]] + [[k, str(v)] for k, v in stats['complaint_stats'].items()]
            t1 = Table(stats_data, colWidths=[200, 100])
            t1.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.black),
                ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('PADDING', (0,0), (-1,-1), 8)
            ]))
            elements.append(t1)

        # 4. Charts (Categories & Trends)
        elements.append(Paragraph("3. Category Breakdown & Monthly Trends", h2_style))
        if 'category_breakdown' in stats and 'monthly_trends' in stats:
            pie_buf = ChartGenerator.generate_pie_chart(stats['category_breakdown'], "Complaint Categories")
            line_buf = ChartGenerator.generate_line_chart(stats['monthly_trends'], "Monthly Complaint Trends", "Month", "Count")
            
            elements.append(Image(pie_buf, width=300, height=300))
            elements.append(Image(line_buf, width=400, height=250))

        # 5. Ward Distribution & Dept Performance
        elements.append(Paragraph("4. Ward Distribution & Department Performance", h2_style))
        if ai.get('department_performance'):
            elements.append(Paragraph(ai['department_performance'], normal_style))
            elements.append(Spacer(1, 10))
            
        if 'ward_distribution' in stats and 'dept_performance' in stats:
            hbar_buf = ChartGenerator.generate_horizontal_bar_chart(stats['ward_distribution'], "Top Wards by Complaints", "Count", "Ward")
            bar_buf = ChartGenerator.generate_bar_chart(stats['dept_performance'], "Department SLAs (%)", "Department", "Resolution %")
            
            elements.append(Image(hbar_buf, width=400, height=250))
            elements.append(Image(bar_buf, width=400, height=250))

        # 6. Budget Analysis & Predictive Analytics
        elements.append(Paragraph("5. AI Financial & Predictive Analytics", h2_style))
        
        if ai.get('budget_recommendation'):
            elements.append(Paragraph("<b>Budget Recommendation</b>", h3_style))
            budget = ai['budget_recommendation']
            bd_data = [["Metric", "Value"]] + [[k, v] for k, v in budget.items()]
            t2 = Table(bd_data, colWidths=[200, 100])
            t2.setStyle(TableStyle([
                ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('PADDING', (0,0), (-1,-1), 8)
            ]))
            elements.append(t2)
            elements.append(Spacer(1, 15))

        if ai.get('predictive_analytics'):
            elements.append(Paragraph("<b>Next Month Forecast</b>", h3_style))
            pred = ai['predictive_analytics']
            pred_data = [["Forecast", "Value"]]
            for k, v in pred.items():
                val_str = ", ".join(v) if isinstance(v, list) else str(v)
                pred_data.append([k, val_str])
            t3 = Table(pred_data, colWidths=[200, 200])
            t3.setStyle(TableStyle([
                ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('PADDING', (0,0), (-1,-1), 8)
            ]))
            elements.append(t3)

        # 7. Risk Assessment
        if ai.get('risk_assessment'):
            elements.append(Paragraph("6. Risk Assessment", h2_style))
            risk = ai['risk_assessment']
            risk_data = [["Risk Type", "Level"]] + [[k, v] for k, v in risk.items()]
            t4 = Table(risk_data, colWidths=[200, 100])
            t4.setStyle(TableStyle([
                ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('PADDING', (0,0), (-1,-1), 8)
            ]))
            elements.append(t4)

        # 8. AI Insights (Highest Priority Project)
        if ai.get('ai_insights'):
            elements.append(Paragraph("7. Highest Priority Project", h2_style))
            insights = ai['ai_insights']
            ins_data = [["Attribute", "Detail"]] + [[k, v] for k, v in insights.items()]
            t5 = Table(ins_data, colWidths=[150, 300])
            t5.setStyle(TableStyle([
                ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1e40af')),
                ('TEXTCOLOR', (0,0), (-1,0), colors.white),
                ('ALIGN', (0,0), (-1,-1), 'LEFT'),
                ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
                ('PADDING', (0,0), (-1,-1), 8)
            ]))
            elements.append(t5)

        # 9. MP Recommendations
        if ai.get('mp_recommendations'):
            elements.append(Paragraph("8. Actionable MP Recommendations", h2_style))
            for i, rec in enumerate(ai['mp_recommendations'], 1):
                elements.append(Paragraph(f"<b>{i}.</b> {rec}", normal_style))
                elements.append(Spacer(1, 5))
        
        # Footer
        elements.append(Spacer(1, 40))
        elements.append(Paragraph("Confidential Government Report - Generated automatically by JanVaani AI Platform", styles['Italic']))

        doc.build(elements)
        return filepath
