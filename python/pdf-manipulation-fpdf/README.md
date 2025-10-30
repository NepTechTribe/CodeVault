# PDF Operations Toolkit

A comprehensive Python-based PDF generation toolkit using the FPDF library. Create professional PDFs including simple documents, invoices, certificates, and table reports with ease.

## Features

- **Simple PDF Documents**: Create basic PDFs with titles and content
- **Invoice Generation**: Professional invoice templates with itemized billing
- **Certificate Creation**: Generate certificates of completion with custom formatting
- **Table Reports**: Create structured data reports with headers and rows
- **Lightweight**: No external dependencies beyond FPDF
- **Easy to Use**: Simple API for all PDF operations

## Requirements

- Python 3.6 or higher
- FPDF library

## Installation

1. Clone or download this repository
2. Install the required dependencies:

```bash
pip install fpdf
```

## Project Structure

```
pdf-toolkit/
│
├── pdf_operations.py    # Main PDFManager class with all PDF operations
├── main.py             # Example usage and demonstrations
└── README.md           # This file
```

## Quick Start

Run the example script to generate sample PDFs:

```bash
python main.py
```

This will create four sample PDF files:
- `simple_document.pdf` - Basic document example
- `invoice.pdf` - Invoice template
- `certificate.pdf` - Certificate of completion
- `employee_report.pdf` - Table report

## Usage

### Basic Usage

```python
from pdf_operations import PDFManager

# Initialize the PDF manager
manager = PDFManager()

# Create a simple PDF
manager.create_simple_pdf(
    "output.pdf",
    "Document Title",
    "Your content goes here..."
)
```

## API Reference

### PDFManager Class

#### `create_simple_pdf(filename, title, content)`

Creates a basic PDF document with a title and content.

**Parameters:**
- `filename` (str): Output PDF filename
- `title` (str): Document title (displayed in bold, centered)
- `content` (str): Main content text (supports newlines)

**Example:**
```python
manager.create_simple_pdf(
    "welcome.pdf",
    "Welcome Guide",
    "Welcome to our platform!\n\nThis guide will help you get started."
)
```

---

#### `create_invoice(filename, customer_data, items)`

Generates a professional invoice with customer details and itemized billing.

**Parameters:**
- `filename` (str): Output PDF filename
- `customer_data` (dict): Customer information with 'name' key
- `items` (list): List of dictionaries with 'name', 'quantity', and 'price' keys

**Example:**
```python
customer = {"name": "John Doe"}
items = [
    {"name": "Product A", "quantity": 2, "price": 49.99},
    {"name": "Product B", "quantity": 1, "price": 99.99}
]
manager.create_invoice("invoice_001.pdf", customer, items)
```

**Output Features:**
- Auto-calculates total amount
- Displays current date automatically
- Professional table layout with headers
- Gray header background for clarity

---

#### `create_certificate(filename, name, course, date)`

Creates a certificate of completion with a decorative border.

**Parameters:**
- `filename` (str): Output PDF filename
- `name` (str): Recipient's name (displayed in uppercase)
- `course` (str): Course or program name
- `date` (str): Completion date

**Example:**
```python
manager.create_certificate(
    "certificate.pdf",
    "Jane Smith",
    "Python Programming",
    "2024-10-15"
)
```

**Design Features:**
- Decorative border around the certificate
- Professional typography with multiple font sizes
- Centered layout for formal appearance

---

#### `create_table_report(filename, headers, data, title="Report")`

Generates a PDF report with tabular data.

**Parameters:**
- `filename` (str): Output PDF filename
- `headers` (list): Column headers
- `data` (list): List of lists containing row data
- `title` (str, optional): Report title (default: "Report")

**Example:**
```python
headers = ['ID', 'Name', 'Score']
data = [
    [1, 'Alice', 95],
    [2, 'Bob', 87],
    [3, 'Charlie', 92]
]
manager.create_table_report("scores.pdf", headers, data, "Student Scores")
```

**Layout Features:**
- Auto-calculated column widths based on number of columns
- Gray header background
- Bordered cells for clarity

---

## Advanced Examples

### Custom Invoice with Multiple Items

```python
from pdf_operations import PDFManager

manager = PDFManager()

customer = {
    "name": "Acme Corporation"
}

items = [
    {"name": "Web Development Service", "quantity": 40, "price": 150.00},
    {"name": "Logo Design", "quantity": 1, "price": 500.00},
    {"name": "Hosting (Annual)", "quantity": 1, "price": 1200.00}
]

manager.create_invoice("client_invoice.pdf", customer, items)
# Total will be automatically calculated: $7,700.00
```

### Batch Certificate Generation

```python
from pdf_operations import PDFManager
from datetime import datetime

manager = PDFManager()
current_date = datetime.now().strftime('%Y-%m-%d')

students = [
    "Alice Johnson",
    "Bob Williams",
    "Charlie Brown",
    "Diana Martinez"
]

for student in students:
    filename = f"certificate_{student.replace(' ', '_').lower()}.pdf"
    manager.create_certificate(
        filename,
        student,
        "Data Science Bootcamp",
        current_date
    )
    
print(f"Generated {len(students)} certificates!")
```

### Dynamic Report from Data

```python
from pdf_operations import PDFManager

manager = PDFManager()

# Simulate data from database or API
headers = ['Month', 'Revenue', 'Expenses', 'Profit']
data = [
    ['January', '$45,000', '$30,000', '$15,000'],
    ['February', '$52,000', '$28,000', '$24,000'],
    ['March', '$48,000', '$32,000', '$16,000'],
    ['Q1 Total', '$145,000', '$90,000', '$55,000']
]

manager.create_table_report(
    "quarterly_report.pdf",
    headers,
    data,
    "Q1 2024 Financial Report"
)
```

### Employee Directory

```python
from pdf_operations import PDFManager

manager = PDFManager()

headers = ['Employee ID', 'Name', 'Department', 'Email']
employees = [
    ['E001', 'John Doe', 'Engineering', 'john.doe@company.com'],
    ['E002', 'Jane Smith', 'Marketing', 'jane.smith@company.com'],
    ['E003', 'Bob Johnson', 'Sales', 'bob.johnson@company.com'],
    ['E004', 'Alice Brown', 'HR', 'alice.brown@company.com']
]

manager.create_table_report(
    "employee_directory.pdf",
    headers,
    employees,
    "Company Employee Directory"
)
```

## Use Cases

### Business Applications
- **Invoicing**: Generate customer invoices with itemized products/services
- **Reports**: Create financial, sales, or analytics reports
- **Receipts**: Generate transaction receipts
- **Statements**: Account statements and summaries

### Educational Applications
- **Certificates**: Course completion certificates
- **Transcripts**: Grade reports and academic records
- **Attendance**: Student attendance sheets
- **Report Cards**: Student performance reports

### Administrative Applications
- **Documentation**: Generate standardized documents
- **Forms**: Pre-filled form templates
- **Letters**: Automated letter generation
- **Labels**: Custom label printing

## Technical Details

### Architecture

The toolkit uses a class-based design with the `PDFManager` class handling all PDF operations. Each method creates a fresh FPDF instance via the `_create_new_pdf()` helper method, ensuring clean document generation for every operation.

### Font Support

Currently supports built-in FPDF fonts:
- **Arial**: Regular, Bold
- **Times**: Regular, Bold, Italic
- **Courier**: Regular, Bold

For custom fonts, refer to the [FPDF documentation](http://www.fpdf.org/).

### Page Layout

- **Default page size**: A4 (210mm × 297mm)
- **Default margins**: 10mm on all sides
- **Default orientation**: Portrait
- **Unit**: Millimeters (mm)

### Customization Tips

**Changing Colors:**
```python
pdf.set_fill_color(R, G, B)  # Background color
pdf.set_text_color(R, G, B)  # Text color
pdf.set_draw_color(R, G, B)  # Border color
```

**Changing Fonts:**
```python
pdf.set_font('Arial', 'B', 16)  # Font family, style, size
# Styles: '' (regular), 'B' (bold), 'I' (italic), 'U' (underline)
```

**Adding Page Numbers:**
```python
pdf.alias_nb_pages()  # Enable page count
pdf.cell(0, 10, f'Page {pdf.page_no()}/{{nb}}', 0, 0, 'C')
```

## Limitations

- Text encoding limited to Latin-1 (Western European characters)
- No built-in support for images (can be added with custom code)
- Tables don't automatically span multiple pages
- Limited to built-in fonts without custom font installation

## Best Practices

1. **File Naming**: Use descriptive filenames with timestamps for better organization
2. **Data Validation**: Validate input data before PDF generation
3. **Error Handling**: Wrap PDF operations in try-except blocks
4. **Memory Management**: For batch operations, process in chunks if dealing with large datasets
5. **Testing**: Test PDFs with various data sizes and edge cases

## Resources

- [FPDF Official Documentation](http://www.fpdf.org/)
- [FPDF Python Package (PyPI)](https://pypi.org/project/fpdf/)
- [FPDF Tutorial](http://www.fpdf.org/en/tutorial/)
- [FPDF Reference Manual](http://www.fpdf.org/en/doc/)

## License

This project is open source and available for personal and commercial use.

---

**Version:** 1.0.0  
**Last Updated:** October 2025
**Author:** SHYAMA TRIPATHI