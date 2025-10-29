"""
PDF Manipulation using FPDF
Author: [SHYAMA TRIPATHI]
Complete PDF creation and manipulation toolkit
"""

from fpdf import FPDF
import os
from datetime import datetime

class PDFManager:
    def __init__(self):
        pass  # Remove the pdf instance here
        
    def _create_new_pdf(self):
        """Create a new FPDF instance for each document"""
        return FPDF()
        
    def create_simple_pdf(self, filename, title, content):
        """Create a simple PDF with title and content"""
        pdf = self._create_new_pdf()  # Create new instance
        pdf.add_page()
        
        # Title
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, title, 0, 1, 'C')
        pdf.ln(10)
        
        # Content
        pdf.set_font('Arial', '', 12)
        pdf.multi_cell(0, 10, content)
        
        pdf.output(filename)
        print(f"PDF created: {filename}")
    
    def create_invoice(self, filename, customer_data, items):
        """Create an invoice PDF"""
        pdf = self._create_new_pdf()  # Create new instance
        pdf.add_page()
        
        # Header
        pdf.set_font('Arial', 'B', 20)
        pdf.cell(0, 10, 'INVOICE', 0, 1, 'C')
        pdf.ln(10)
        
        # Customer Info
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, f"Customer: {customer_data['name']}", 0, 1)
        pdf.cell(0, 10, f"Date: {datetime.now().strftime('%Y-%m-%d')}", 0, 1)
        pdf.ln(10)
        
        # Table Header
        pdf.set_fill_color(200, 200, 200)
        pdf.cell(100, 10, 'Item', 1, 0, 'C', True)
        pdf.cell(45, 10, 'Quantity', 1, 0, 'C', True)
        pdf.cell(45, 10, 'Price', 1, 1, 'C', True)
        
        # Table Content
        pdf.set_font('Arial', '', 12)
        total = 0
        for item in items:
            pdf.cell(100, 10, item['name'], 1)
            pdf.cell(45, 10, str(item['quantity']), 1, 0, 'C')
            pdf.cell(45, 10, f"${item['price']:.2f}", 1, 1, 'C')
            total += item['quantity'] * item['price']
        
        # Total
        pdf.cell(100, 10, '', 1)
        pdf.cell(45, 10, 'Total:', 1, 0, 'R', True)
        pdf.cell(45, 10, f"${total:.2f}", 1, 1, 'C', True)
        
        pdf.output(filename)
        print(f"Invoice created: {filename}")
    
    def create_certificate(self, filename, name, course, date):
        """Create a certificate PDF"""
        pdf = self._create_new_pdf()  # Create new instance
        pdf.add_page()
        
        # Border
        pdf.set_line_width(1.5)
        pdf.rect(10, 10, 190, 277)
        
        # Title
        pdf.set_font('Arial', 'B', 24)
        pdf.cell(0, 50, 'CERTIFICATE OF COMPLETION', 0, 1, 'C')
        
        # Content
        pdf.set_font('Arial', '', 16)
        pdf.cell(0, 30, 'This certifies that', 0, 1, 'C')
        
        pdf.set_font('Arial', 'B', 20)
        pdf.cell(0, 40, name.upper(), 0, 1, 'C')
        
        pdf.set_font('Arial', '', 16)
        pdf.cell(0, 30, f'has successfully completed the course', 0, 1, 'C')
        
        pdf.set_font('Arial', 'B', 18)
        pdf.cell(0, 40, course, 0, 1, 'C')
        
        # Date
        pdf.set_font('Arial', '', 14)
        pdf.cell(0, 30, f'Date: {date}', 0, 1, 'C')
        
        pdf.output(filename)
        print(f"Certificate created: {filename}")

    def create_table_report(self, filename, headers, data, title="Report"):
        """Create a PDF report with table"""
        pdf = self._create_new_pdf()  # Create new instance
        pdf.add_page()
        
        # Title
        pdf.set_font('Arial', 'B', 16)
        pdf.cell(0, 10, title, 0, 1, 'C')
        pdf.ln(10)
        
        # Calculate column width
        col_width = 190 / len(headers)
        
        # Table headers
        pdf.set_font('Arial', 'B', 12)
        pdf.set_fill_color(200, 200, 200)
        for header in headers:
            pdf.cell(col_width, 10, header, 1, 0, 'C', True)
        pdf.ln()
        
        # Table data
        pdf.set_font('Arial', '', 10)
        for row in data:
            for item in row:
                pdf.cell(col_width, 10, str(item), 1)
            pdf.ln()
        
        pdf.output(filename)
        print(f"Table report created: {filename}")