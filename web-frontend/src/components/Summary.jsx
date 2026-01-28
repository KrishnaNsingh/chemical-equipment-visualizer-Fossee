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
    return (
      <div className="card">
        <div className="cardBody">
          <div className="cardTitleRow">
            <h3 className="cardTitle">Summary</h3>
          </div>
          <p className="statusText statusError">{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="card">
        <div className="cardBody">
          <div className="cardTitleRow">
            <h3 className="cardTitle">Summary</h3>
          </div>
          <div className="loadingRow">
            <span className="spinner" aria-hidden="true" />
            <span>Loading summary…</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <h3 className="cardTitle">Summary</h3>
        </div>

        <ul className="kvList">
          <li className="kvItem">
            <span className="kvKey">File</span>
            <span className="kvVal">{summary.file_name}</span>
          </li>
          <li className="kvItem">
            <span className="kvKey">Total equipment</span>
            <span className="kvVal">{summary.total_equipment}</span>
          </li>
          <li className="kvItem">
            <span className="kvKey">Avg flowrate</span>
            <span className="kvVal">{summary.avg_flowrate.toFixed(2)}</span>
          </li>
          <li className="kvItem">
            <span className="kvKey">Avg pressure</span>
            <span className="kvVal">{summary.avg_pressure.toFixed(2)}</span>
          </li>
          <li className="kvItem">
            <span className="kvKey">Avg temperature</span>
            <span className="kvVal">{summary.avg_temperature.toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

