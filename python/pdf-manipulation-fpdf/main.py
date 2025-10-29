"""
Main script to demonstrate PDF operations
"""

from pdf_operations import PDFManager

def main():
    manager = PDFManager()
    
    # Example 1: Simple PDF
    manager.create_simple_pdf(
        "simple_document.pdf",
        "My First PDF with FPDF",
        "This is a simple PDF document created using FPDF library.\n\n" +
        "Features:\n- Easy to use\n- Lightweight\n- No external dependencies\n" +
        "Perfect for generating simple PDF documents programmatically."
    )
    
    # Example 2: Invoice
    customer_data = {"name": "John Doe"}
    items = [
        {"name": "Laptop", "quantity": 1, "price": 999.99},
        {"name": "Mouse", "quantity": 2, "price": 25.50},
        {"name": "Keyboard", "quantity": 1, "price": 79.99}
    ]
    manager.create_invoice("invoice.pdf", customer_data, items)
    
    # Example 3: Certificate
    manager.create_certificate(
        "certificate.pdf",
        "Jane Smith",
        "Python Programming Masterclass",
        "2024-10-15"
    )
    
    # Example 4: Table Report
    headers = ['ID', 'Name', 'Department', 'Salary']
    data = [
        [1, 'John Doe', 'Engineering', 75000],
        [2, 'Jane Smith', 'Marketing', 65000],
        [3, 'Bob Johnson', 'Sales', 70000],
        [4, 'Alice Brown', 'HR', 60000]
    ]
    manager.create_table_report("employee_report.pdf", headers, data, "Employee Report")
    
    print("\nAll PDF files have been created successfully!")

if __name__ == "__main__":
    main()