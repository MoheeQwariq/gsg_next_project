"use client";
import React, { useState } from "react";
import CardBlog from "./CardBlog";
import { useTheme } from "@/context/ThemeContext";
import Pagination from "@/components/Pagination";
import type { BlogDetail } from "@/types/blog";

interface BlogsListProps {
  blogs: BlogDetail[];
}

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

const BlogsList: React.FC<BlogsListProps> = ({ blogs }) => {
  const { theme } = useTheme();
  const styles = blogsListStyles[theme];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (blogs.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyHeading}>لا توجد مقالات</h3>
        <p className={styles.emptyParagraph}>
          لم يتم إضافة أي مقالات بعد. كن أول من يضيف مقالاً!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {currentBlogs.map((blog) => (
          <CardBlog key={blog.blogId || blog.title} blog={blog} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
      />
    </>
  );
};

export default BlogsList;
