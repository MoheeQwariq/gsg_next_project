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

export default function CommentsChart() {
  const data = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو"],
    datasets: [
      {
        label: "التعليقات",
        data: [5, 7, 10, 2, 6],
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
        text: "التعليقات عبر الأشهر",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-xl font-bold mb-4">مخطط التعليقات</h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
