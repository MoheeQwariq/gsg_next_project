"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import chartSkeletonStyles from "@/styles/dashboard/chartSkeletonStyles";

export default function ChartSkeleton() {
  const { theme } = useTheme();
  const styles = chartSkeletonStyles[theme];

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.header}></div>
      <div className={styles.chartArea}></div>
    </div>
  );
}
