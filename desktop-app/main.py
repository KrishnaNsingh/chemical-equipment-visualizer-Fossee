from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout,
    QPushButton, QLabel, QFileDialog
)
import sys
import api
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setGeometry(100, 100, 700, 500)

        self.main_layout = QVBoxLayout()

        # Upload button
        upload_btn = QPushButton("Upload CSV")
        upload_btn.clicked.connect(self.upload_csv)
        self.main_layout.addWidget(upload_btn)

        # Download PDF button
        download_btn = QPushButton("Download PDF Report")
        download_btn.clicked.connect(self.download_pdf)
        self.main_layout.addWidget(download_btn)

        # Status label
        self.status = QLabel("Upload a CSV file")
        self.main_layout.addWidget(self.status)

        # Summary label
        self.summary_label = QLabel("Summary will appear here")
        self.summary_label.setWordWrap(True)
        self.main_layout.addWidget(self.summary_label)

        # History title
        self.history_label = QLabel("Upload History (Last 5)")
        self.history_label.setStyleSheet("font-weight: bold;")
        self.main_layout.addWidget(self.history_label)

        # History content
        self.history_list = QLabel("")
        self.history_list.setWordWrap(True)
        self.main_layout.addWidget(self.history_list)

        # Charts
        self.figure = Figure(figsize=(5, 4))
        self.canvas = FigureCanvas(self.figure)
        self.main_layout.addWidget(self.canvas)

        # SET LAYOUT 
        self.setLayout(self.main_layout)

        # LOAD DATA AFTER UI EXISTS
        self.load_history()


    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV", "", "CSV Files (*.csv)"
        )

        if not file_path:
            return

        response = api.upload_csv(file_path)

        if response.status_code == 201:
            self.status.setText("✅ Upload successful")
            self.load_summary()
            self.load_history()
        else:
            self.status.setText("❌ Upload failed")

    def load_summary(self):
        response = api.get_summary()

        if response.status_code != 200:
            self.summary_label.setText("No summary available")
            return

        data = response.json()

        summary_text = (
            f"File Name: {data['file_name']}\n"
            f"Total Equipment: {data['total_equipment']}\n"
            f"Average Flowrate: {data['avg_flowrate']:.2f}\n"
            f"Average Pressure: {data['avg_pressure']:.2f}\n"
            f"Average Temperature: {data['avg_temperature']:.2f}"
        )

        self.summary_label.setText(summary_text)
        # 🔥 draw charts
        self.draw_charts(data)

    # draw charts
    def draw_charts(self, data):
        self.figure.clear()

        # Pie chart — Equipment Type Distribution
        ax1 = self.figure.add_subplot(121)
        types = data["type_distribution"]
        ax1.pie(types.values(), labels=types.keys(), autopct="%1.1f%%")
        ax1.set_title("Equipment Type Distribution")

        # Bar chart — Average values
        ax2 = self.figure.add_subplot(122)
        params = ["Flowrate", "Pressure", "Temperature"]
        values = [
            data["avg_flowrate"],
            data["avg_pressure"],
            data["avg_temperature"],
        ]
        ax2.bar(params, values)
        ax2.set_title("Average Parameters")

        self.canvas.draw()
        
    def download_pdf(self):
        response = api.download_pdf()

        if response.status_code != 200:
            self.status.setText("❌ Failed to download PDF")
            return

        save_path, _ = QFileDialog.getSaveFileName(
            self,
            "Save PDF",
            "equipment_report.pdf",
            "PDF Files (*.pdf)"
        )

        if save_path:
            with open(save_path, "wb") as f:
                f.write(response.content)

            self.status.setText("📄 PDF downloaded successfully")


    # Load history
    def load_history(self):
        response = api.get_history()

        if response.status_code != 200:
            self.history_list.setText("No history available")
            return

        data = response.json()

        if not data:
            self.history_list.setText("No history available")
            return

        history_text = ""
        for item in data:
            history_text += (
                f"• {item['file_name']} — "
                f"{item['uploaded_at']}\n"
            )

        self.history_list.setText(history_text)
    



app = QApplication(sys.argv)
window = MainWindow()
window.show()
sys.exit(app.exec_())
