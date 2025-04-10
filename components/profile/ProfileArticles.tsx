"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import profileArticlesStyles from "@/styles/profileArticles";
import { getUserBlogs } from "@/services/blog/blog.service";
import type { BlogDetail } from "@/types/blog";
import Pagination from "@/components/Pagination";

interface ProfileArticlesProps {
  userId: number;
}

export default function ProfileArticles({ userId }: ProfileArticlesProps) {
  const { theme } = useTheme();
  const styles = profileArticlesStyles[theme];
  const articlesPerPage = 5;
  const [articles, setArticles] = useState<BlogDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getUserBlogs(userId);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, [userId]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container} dir="rtl">
      {currentArticles.map((article) => (
        <div key={article.blogId}>
          <h3>{article.title}</h3>
          <p>{article.content.slice(0, 100)}...</p>
        </div>
      ))}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      )}
    </div>
  );
}
