import { useState } from "react";
import api from "../api";

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ File uploaded successfully");
      onUploadSuccess();   // 👈 trigger refresh
    } catch (error) {
      setMessage("❌ Upload failed");
      console.error(error);
    }
  };

  const statusClass =
    message?.startsWith("✅") ? "statusText statusSuccess" : message?.startsWith("❌") ? "statusText statusError" : "statusText";

  return (
    <div className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <h3 className="cardTitle">Upload CSV</h3>
        </div>

        <div className="field">
          <label className="label" htmlFor="csv-upload">
            Choose a file
          </label>
          <input
            id="csv-upload"
            className="fileInput"
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center" }}>
          <button className="btn btnPrimary" onClick={handleUpload}>
            Upload
          </button>
          {file ? <span className="pill">{file.name}</span> : <span className="pill">No file selected</span>}
        </div>

        {message ? <p className={statusClass}>{message}</p> : null}
      </div>
    </div>
  );
}
