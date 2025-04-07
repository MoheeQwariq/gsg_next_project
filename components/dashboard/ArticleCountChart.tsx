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

interface ArticleCountChartProps {
  data: MonthStat[];
}

export default function ArticleCountChart({ data: statData }: ArticleCountChartProps) {
  const { theme } = useTheme();
  
  // Use the articles color from your overview stat (adjust RGBA as needed)
  const backgroundColor = theme === "dark" 
    ? "rgba(29, 78, 216, 0.7)"  // dark: blue-900 variant example
    : "rgba(29, 78, 216, 0.7)"; // light: blue-50 variant example

  const labels = statData.map(item => item.month);
  const counts = statData.map(item => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "المقالات",
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
        text: "عدد المقالات عبر الأشهر",
      },
    },
  };

  return (
    <div className={`p-6 rounded-lg shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`} dir="rtl">
      <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
        مخطط المقالات
      </h3>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
