"use client";

import React, { useState } from "react";
// import CardBlog from "@/components/blog/CardBlog";
import type { Article } from "@/types/blog";
import profileArticlesStyles from "@/styles/profileArticles";

interface ProfileArticlesProps {
  articles: Article[];
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) {
  return (
    <div className={profileArticlesStyles.paginationContainer}>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`${profileArticlesStyles.navButton} ${currentPage === 1 ? profileArticlesStyles.navButtonDisabled : ""}`}
      >
        السابق
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`${profileArticlesStyles.pageButton} ${
              currentPage === i + 1
                ? profileArticlesStyles.activePageButton
                : profileArticlesStyles.inactivePageButton
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`${profileArticlesStyles.navButton} ${currentPage === totalPages ? profileArticlesStyles.navButtonDisabled : ""}`}
      >
        التالي
      </button>
    </div>
  );
}

export default function ProfileArticles({ articles }: ProfileArticlesProps) {
  const articlesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className={profileArticlesStyles.container} dir="rtl">
      {currentArticles.map((article) => (
        // <CardBlog key={article.id} article={article} />
        <div key={article.id}> no content , just until fix the types </div>
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
