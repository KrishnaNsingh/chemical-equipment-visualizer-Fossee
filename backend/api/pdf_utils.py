from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO


def generate_dataset_pdf(dataset):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 50

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Chemical Equipment Report")
    y -= 40

    pdf.setFont("Helvetica", 12)
    pdf.drawString(50, y, f"File Name: {dataset.file_name}")
    y -= 20
    pdf.drawString(50, y, f"Uploaded At: {dataset.uploaded_at}")
    y -= 30

    pdf.drawString(50, y, f"Total Equipment: {dataset.total_equipment}")
    y -= 20
    pdf.drawString(50, y, f"Average Flowrate: {dataset.avg_flowrate:.2f}")
    y -= 20
    pdf.drawString(50, y, f"Average Pressure: {dataset.avg_pressure:.2f}")
    y -= 20
    pdf.drawString(50, y, f"Average Temperature: {dataset.avg_temperature:.2f}")
    y -= 30

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, y, "Equipment Type Distribution:")
    y -= 20

    pdf.setFont("Helvetica", 11)
    for eq_type, count in dataset.type_distribution.items():
        pdf.drawString(70, y, f"{eq_type}: {count}")
        y -= 15

    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return buffer
