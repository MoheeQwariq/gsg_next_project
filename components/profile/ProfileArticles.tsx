"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import profileArticlesStyles from "@/styles/profileArticles";
import { getUserBlogs } from "@/services/blog/blog.service";
import type { BlogDetail } from "@/types/blog";
import Pagination from "@/components/Pagination";
import CardBlog from "../blog/CardBlog";

interface ProfileArticlesProps {
  userId: number;
}

export default function ProfileArticles({ userId }: ProfileArticlesProps) {
  const { theme } = useTheme();
  const styles = profileArticlesStyles[theme];
  const articlesPerPage = 5;
  const [articles, setArticles] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const fetchedArticles = await getUserBlogs(userId);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [userId]);

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.container} dir="rtl">
      {loading ? (
        Array.from({ length: articlesPerPage }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonText} />
          </div>
        ))
      ) : articles.length === 0 ? (
        <div className={styles.noArticlesCard}>
          <p>لا توجد مقالات متاحة</p>
        </div>
      ) : (
        currentArticles.map((article) => (
          <CardBlog key={article.blogId} blog={article} />
        ))
      )}

      {!loading && articles.length > 0 && totalPages > 1 && (
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
