from django.urls import path
from .views import CSVUploadView

urlpatterns = [
    path("upload/", CSVUploadView.as_view()),
]
