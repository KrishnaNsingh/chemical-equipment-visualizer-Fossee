import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Dataset
from .serializers import DatasetSerializer

class CSVUploadView(APIView):
    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            df = pd.read_csv(file)
        except Exception:
            return Response(
                {"error": "Invalid CSV file"},
                status=status.HTTP_400_BAD_REQUEST
            )

        required_columns = {
            "Equipment Name",
            "Type",
            "Flowrate",
            "Pressure",
            "Temperature"
        }

        if not required_columns.issubset(df.columns):
            return Response(
                {"error": "CSV missing required columns"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Analytics
        total_equipment = len(df)
        avg_flowrate = df["Flowrate"].mean()
        avg_pressure = df["Pressure"].mean()
        avg_temperature = df["Temperature"].mean()

        type_distribution = df["Type"].value_counts().to_dict()

        # Save dataset
        dataset = Dataset.objects.create(
            file_name=file.name,
            total_equipment=total_equipment,
            avg_flowrate=avg_flowrate,
            avg_pressure=avg_pressure,
            avg_temperature=avg_temperature,
            type_distribution=type_distribution,
        )

        # Keep only last 5
        # Dataset.objects.order_by("-uploaded_at")[5:].delete()
        old_datasets = Dataset.objects.order_by("-uploaded_at").values_list("id", flat=True)[5:]
        Dataset.objects.filter(id__in=old_datasets).delete()

        serializer = DatasetSerializer(dataset)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

#Latest uploaded dataset (api/summary/)
class SummaryView(APIView):
    def get(self, request):
        dataset = Dataset.objects.order_by("-uploaded_at").first()

        if not dataset:
            return Response(
                {"message": "No data available"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = DatasetSerializer(dataset)
        return Response(serializer.data)


#Last 5 uploaded datasets (api/history/)
class HistoryView(APIView):
    def get(self, request):
        datasets = Dataset.objects.order_by("-uploaded_at")[:5]
        serializer = DatasetSerializer(datasets, many=True)
        return Response(serializer.data)



# PDF Report View (api/report/)
from django.http import FileResponse
from .pdf_utils import generate_dataset_pdf

class PDFReportView(APIView):
    def get(self, request):
        dataset = Dataset.objects.order_by("-uploaded_at").first()

        if not dataset:
            return Response(
                {"message": "No data available"},
                status=status.HTTP_404_NOT_FOUND
            )

        pdf_buffer = generate_dataset_pdf(dataset)

        return FileResponse(
            pdf_buffer,
            as_attachment=True,
            filename="equipment_report.pdf",
            content_type="application/pdf"
        )


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class StatusView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "status": "ok",
            "message": "Backend is running"
        })
