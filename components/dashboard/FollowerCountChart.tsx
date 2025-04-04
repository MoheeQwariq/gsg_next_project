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

export default function FollowerCountChart() {
  // Sample data
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "المتابعون",
        data: [80, 90, 95, 100, 120],
        borderColor: "rgba(255, 99, 132, 0.7)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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
        text: "عدد المتابعين الشهري",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-xl font-bold mb-4">مخطط المتابعين</h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
