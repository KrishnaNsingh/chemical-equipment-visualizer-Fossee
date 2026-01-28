import { useEffect, useState } from "react";
import api from "../api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("history/").then((res) => setHistory(res.data));
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <h3 className="cardTitle">Upload History</h3>
        </div>
        <ul className="list">
          {history.map((item) => (
            <li key={item.id}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>{item.file_name}</span>
              <span className="muted"> — {new Date(item.uploaded_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
