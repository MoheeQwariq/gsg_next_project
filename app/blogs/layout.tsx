"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import TrendingBlogs from "@/components/blog/TrendingBlogs";
import TopPuplishers from "@/components/blog/TopPuplishers";
const blogLayoutStyles = {
  light: {
    container:
      "container mx-auto px-4 py-8 bg-[rgb(235,235,235)] text-gray-900",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    mainContent: "order-2 lg:order-1 lg:col-span-3",
    sidebar: "order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start",
    sidebarContent: "space-y-6",
  },
  dark: {
    container: "container mx-auto px-4 py-8 bg-gray-900 text-gray-100",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    mainContent: "order-2 lg:order-1 lg:col-span-3",
    sidebar: "order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start",
    sidebarContent: "space-y-6",
  },
};


const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const styles = blogLayoutStyles[theme];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.mainContent}>{children}</div>
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <TrendingBlogs />
            <TopPuplishers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
