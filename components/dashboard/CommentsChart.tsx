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
import { useTheme } from "@/context/ThemeContext";
import type { MonthStat } from "@/types/dashboardStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface CommentsChartProps {
  data: MonthStat[];
}

export default function CommentsChart({ data: statData }: CommentsChartProps) {
  const { theme } = useTheme();

  // Yellow tone to match "comments"
  // Adjust as desired for dark/light variants
  const backgroundColor =
    theme === "dark"
      ? "rgba(234,179,8, 0.7)" // darker theme
      : "rgba(234,179,8, 0.7)"; // lighter theme

  const labels = statData.map((item) => item.month);
  const counts = statData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "التعليقات",
        data: counts,
        backgroundColor,
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
        مخطط التعليقات
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
