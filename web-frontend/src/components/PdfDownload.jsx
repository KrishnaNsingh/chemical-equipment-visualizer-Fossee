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
    <div className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <h3 className="cardTitle">Report</h3>
        </div>
        <div style={{ marginTop: 4 }}>
          <button className="btn btnIcon" onClick={downloadPdf}>
            <span aria-hidden="true">📄</span>
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
