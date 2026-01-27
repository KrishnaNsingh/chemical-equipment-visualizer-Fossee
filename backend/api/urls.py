from django.urls import path
from .views import CSVUploadView,  SummaryView, HistoryView, PDFReportView

urlpatterns = [
    path("upload/", CSVUploadView.as_view()),
    path("summary/", SummaryView.as_view()),
    path("history/", HistoryView.as_view()),
    path("report/", PDFReportView.as_view()),
]
