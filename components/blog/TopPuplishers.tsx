"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import TopPublisher from "./TopPuplisher";

const topPublishersStyles = {
  light: {
    container:
      "mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900",
    list: "space-y-4",
  },
  dark: {
    container:
      "mt-6 rounded-xl border border-gray-700 bg-gray-800 p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-600 pb-2 text-xl font-bold text-gray-100",
    list: "space-y-4",
  },
};

const TopPuplishers = () => {
  const { theme } = useTheme();
  const styles = topPublishersStyles[theme];

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>أفضل الناشرين</h3>
      <div className={styles.list}>
        <TopPublisher name="فيصل أبو زكري" articles={12} followers={256} />
        <TopPublisher name="محيي الدين" articles={8} followers={189} />
        <TopPublisher name=" لمى" articles={15} followers={342} />
      </div>
    </div>
  );
};

export default TopPuplishers;
