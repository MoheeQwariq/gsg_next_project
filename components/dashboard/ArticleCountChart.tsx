"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ArticleCountChart() {
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "المقالات",
        data: [4, 6, 3, 8, 5],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
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
        text: "عدد المقالات عبر الأشهر",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-xl font-bold mb-4">مخطط المقالات</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
