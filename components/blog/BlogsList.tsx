"use client";
import React from "react";
import CardBlog from "./CardBlog";
import { useBlogs } from "@/services/useBlogs";
import { useTheme } from "@/context/ThemeContext";

const blogsListStyles = {
  light: {
    emptyContainer:
      "rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-xl font-semibold text-gray-800",
    emptyParagraph: "text-gray-600",
    container: "space-y-6",
  },
  dark: {
    emptyContainer:
      "rounded-xl border border-gray-700 bg-gray-800 p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-xl font-semibold text-gray-100",
    emptyParagraph: "text-gray-400",
    container: "space-y-6",
  },
};

const BlogsList = () => {
  const { blogs, categoryFilter } = useBlogs();
  const { theme } = useTheme();
  const styles = blogsListStyles[theme];

  if (blogs.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyHeading}>لا توجد مقالات</h3>
        <p className={styles.emptyParagraph}>
          {categoryFilter && categoryFilter !== "الكل"
            ? `لا توجد مقالات في تصنيف "${categoryFilter}"`
            : "لم يتم إضافة أي مقالات بعد. كن أول من يضيف مقالاً!"}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {blogs.map((blog) => (
        <CardBlog key={blog.blogId || blog.title} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
