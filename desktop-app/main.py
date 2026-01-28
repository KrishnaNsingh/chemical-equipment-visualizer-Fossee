from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout,
    QPushButton, QLabel, QFileDialog
)
import sys
import api

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.setGeometry(100, 100, 700, 500)

        layout = QVBoxLayout()

        self.status = QLabel("Upload a CSV file")
        upload_btn = QPushButton("Upload CSV")

        upload_btn.clicked.connect(self.upload_csv)

        layout.addWidget(upload_btn)
        layout.addWidget(self.status)

        self.setLayout(layout)

    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV", "", "CSV Files (*.csv)"
        )

        if file_path:
            response = api.upload_csv(file_path)
            if response.status_code == 201:
                self.status.setText("✅ Upload successful")
            else:
                self.status.setText("❌ Upload failed")

app = QApplication(sys.argv)
window = MainWindow()
window.show()
sys.exit(app.exec_())
