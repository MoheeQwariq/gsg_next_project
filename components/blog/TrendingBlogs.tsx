"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import TrendingBlog from "./TrendingBlog";

const trendingBlogsStyles = {
  light: {
    container: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
    heading: "mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900",
    list: "space-y-4",
  },
  dark: {
    container: "rounded-xl border border-gray-700 bg-gray-800 p-5 shadow-sm",
    heading: "mb-4 border-b border-gray-600 pb-2 text-xl font-bold text-gray-100",
    list: "space-y-4",
  },
};

const TrendingBlogs = () => {
  const { theme } = useTheme();
  const styles = trendingBlogsStyles[theme];

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>المقالات الرائجة</h3>
      <div className={styles.list}>
        <TrendingBlog />
        <TrendingBlog />
        <TrendingBlog />
      </div>
    </div>
  );
};

export default TrendingBlogs;
