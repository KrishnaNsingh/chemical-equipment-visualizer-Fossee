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
    return <p>Loading charts...</p>;
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
    <div>
      <h3>Visual Analytics</h3>

      <div style={{ width: "400px", marginBottom: "30px" }}>
        <h4>Equipment Type Distribution</h4>
        <Pie data={pieData} />
      </div>

      <div style={{ width: "500px" }}>
        <h4>Average Parameters</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
}