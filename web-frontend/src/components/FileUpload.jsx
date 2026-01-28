import { useState } from "react";
import api from "../api";

export default function FileUpload() {
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
    } catch (error) {
      setMessage("❌ Upload failed");
      console.error(error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Upload CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
