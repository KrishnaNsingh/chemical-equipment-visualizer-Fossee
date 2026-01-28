import { useEffect, useState } from "react";
import api from "../api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("history/").then((res) => setHistory(res.data));
  }, []);

  if (history.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Upload History (Last 5)</h3>
      <ul>
        {history.map((item) => (
          <li key={item.id}>
            {item.file_name} — {new Date(item.uploaded_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
