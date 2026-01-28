import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";
import api from "../api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);


export default function Charts() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("summary/")
      .then((res) => setSummary(res.data))
      .catch(() => {});
  }, []);

  if (!summary) {
    return (
      <div className="card">
        <div className="cardBody">
          <div className="cardTitleRow">
            <h3 className="cardTitle">Visual Analytics</h3>
          </div>
          <div className="loadingRow">
            <span className="spinner" aria-hidden="true" />
            <span>Loading charts…</span>
          </div>
        </div>
      </div>
    );
  }

  // Pie chart: Equipment type distribution
  const pieData = {
    labels: Object.keys(summary.type_distribution),
    datasets: [
      {
        data: Object.values(summary.type_distribution),
        backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#FF9800",
        "#9C27B0",
        "#F44336",
        "#00BCD4",
      ],
      borderWidth: 1,
      },
    ],
  };

  // Bar chart: Average values
  const barData = {
    labels: ["Flowrate", "Pressure", "Temperature"],
    datasets: [
      {
        label: "Average Values",
         backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#FF9800",
      ],
        borderWidth: 1,
        data: [
          summary.avg_flowrate,
          summary.avg_pressure,
          summary.avg_temperature,
        ],
      },
    ],
  };

  return (
    <div className="card">
      <div className="cardBody">
        <div className="cardTitleRow">
          <h3 className="cardTitle">Visual Analytics</h3>
        </div>

        <div className="chartsGrid">
          <section className="chartPanel">
            <h4 className="chartTitle">Equipment Type Distribution</h4>
            <div style={{ width: "100%", maxWidth: 540, margin: "0 auto" }}>
              <Pie data={pieData} />
            </div>
          </section>

          <section className="chartPanel">
            <h4 className="chartTitle">Average Parameters</h4>
            <div style={{ width: "100%", maxWidth: 740, margin: "0 auto" }}>
              <Bar data={barData} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}