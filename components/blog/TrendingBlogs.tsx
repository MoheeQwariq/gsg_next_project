"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { BlogDetail } from "@/types/blog";
import { getTrendBlogs } from "@/services/blog/blog.service";
import TrendingBlog from "./TrendingBlog";

const trendingBlogsStyles = {
  light: {
    container: "rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900",
    list: "space-y-4",
    skeletonCard: "animate-pulse flex gap-3 mb-4",
    skeletonImage: "bg-gray-300 rounded-lg h-20 w-20",
    skeletonContent: "flex-1 space-y-2",
    skeletonLine: "bg-gray-300 rounded h-4",
    noData: "text-center text-gray-600",
  },
  dark: {
    container: "rounded-xl border border-gray-700 bg-gray-800 p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-600 pb-2 text-xl font-bold text-gray-100",
    list: "space-y-4",
    skeletonCard: "animate-pulse flex gap-3 mb-4",
    skeletonImage: "bg-gray-600 rounded-lg h-20 w-20",
    skeletonContent: "flex-1 space-y-2",
    skeletonLine: "bg-gray-600 rounded h-4",
    noData: "text-center text-gray-400",
  },
};

const TrendingBlogs = () => {
  const { theme } = useTheme();
  const styles = trendingBlogsStyles[theme];
  const [trendingBlogs, setTrendingBlogs] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const data = await getTrendBlogs();
        setTrendingBlogs(data);
      } catch (error) {
        console.error("Error fetching trending blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBlogs();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>المقالات الرائجة</h3>
        <div className={styles.list}>
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className={styles.skeletonCard}>
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <div className={`${styles.skeletonLine} w-3/4`} />
                <div className={`${styles.skeletonLine} w-1/2`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (trendingBlogs.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>المقالات الرائجة</h3>
        <div className={styles.noData}>لا يتوفر مقالات</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>المقالات الرائجة</h3>
      <div className={styles.list}>
        {trendingBlogs.map((blog) => (
          <TrendingBlog key={blog.blogId} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default TrendingBlogs;
