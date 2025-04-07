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
import { useTheme } from "@/context/ThemeContext";
import type { MonthStat } from "@/types/dashboardStats";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LovesChartProps {
  data: MonthStat[];
}

export default function LovesChart({ data: statData }: LovesChartProps) {
  const { theme } = useTheme();

  // Red tone to match "الإعجابات" from overview
  const borderColor = "rgba(220, 38, 38, 0.7)"; // ~ Tailwind red-600
  const backgroundColor = "rgba(220, 38, 38, 0.2)";

  const labels = statData.map((item) => item.month);
  const counts = statData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "الإعجابات",
        data: counts,
        borderColor,
        backgroundColor,
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
    <div
      className={`p-6 rounded-lg shadow ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
      dir="rtl"
    >
      <h3
        className={`text-xl font-bold mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        مخطط الإعجابات
      </h3>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
