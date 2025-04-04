"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LovesChart() {
  // Example data
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "الإعجابات",
        data: [8, 12, 6, 14, 9],
        borderColor: "rgba(255, 99, 132, 0.7)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "الإعجابات الشهرية",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-xl font-bold mb-4">مخطط الإعجابات</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
