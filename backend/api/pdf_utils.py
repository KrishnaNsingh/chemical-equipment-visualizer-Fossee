import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO
from reportlab.lib.utils import ImageReader



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
    
    # ---- Charts ----
    chart_buffer = generate_charts_image(dataset)
    chart_image = ImageReader(chart_buffer)

    pdf.drawImage(
        chart_image,
        x=50,
        y=100,
        width=500,
        height=250,
    )


    pdf.showPage()
    pdf.save()

    buffer.seek(0)
    return buffer


# ---- Charts ----
def generate_charts_image(dataset):
    buffer = BytesIO()

    # ---- Data ----
    type_dist = dataset.type_distribution
    avg_values = [
        dataset.avg_flowrate,
        dataset.avg_pressure,
        dataset.avg_temperature,
    ]

    # ---- Create figure ----
    fig, axes = plt.subplots(1, 2, figsize=(10, 4))

    # Pie chart
    axes[0].pie(
        type_dist.values(),
        labels=type_dist.keys(),
        autopct="%1.1f%%",
    )
    axes[0].set_title("Equipment Type Distribution")

    # Bar chart
    axes[1].bar(
        ["Flowrate", "Pressure", "Temperature"],
        avg_values,
    )
    axes[1].set_title("Average Parameters")

    plt.tight_layout()
    plt.savefig(buffer, format="png")
    plt.close(fig)

    buffer.seek(0)
    return buffer
