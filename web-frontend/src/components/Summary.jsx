import { useEffect, useState } from "react";
import api from "../api";

export default function Summary() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const response = await api.get("summary/");
      setSummary(response.data);
      setError("");
    } catch (err) {
      setError("No data available. Upload a CSV first.");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!summary) {
    return <p>Loading summary...</p>;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Summary</h3>
      <ul>
        <li><b>File Name:</b> {summary.file_name}</li>
        <li><b>Total Equipment:</b> {summary.total_equipment}</li>
        <li><b>Average Flowrate:</b> {summary.avg_flowrate.toFixed(2)}</li>
        <li><b>Average Pressure:</b> {summary.avg_pressure.toFixed(2)}</li>
        <li><b>Average Temperature:</b> {summary.avg_temperature.toFixed(2)}</li>
      </ul>
    </div>
  );
}

