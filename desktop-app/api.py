import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "https://chemical-equipment-backend-xthm.onrender.com/api/"
AUTH = HTTPBasicAuth("fossee", "fossee123")

def upload_csv(file_path):
    with open(file_path, "rb") as f:
        files = {"file": f}
        return requests.post(BASE_URL + "upload/", files=files, auth=AUTH)

def get_summary():
    return requests.get(BASE_URL + "summary/", auth=AUTH)

def get_history():
    return requests.get(BASE_URL + "history/", auth=AUTH)

def download_pdf():
    return requests.get(BASE_URL + "report/", auth=AUTH)
