import api from "../api";

export default function PdfDownload() {
  const downloadPdf = async () => {
    const response = await api.get("report/", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "equipment_report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={downloadPdf}>📄 Download PDF Report</button>
    </div>
  );
}
