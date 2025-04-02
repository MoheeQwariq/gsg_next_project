"use client";

import React, { useState } from "react";
import CardBlog, { Article } from "@/components/blog/CardBlog";

interface ProfileArticlesProps {
  articles: Article[];
}

export default function ProfileArticles({ articles }: ProfileArticlesProps) {
  const articlesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div dir="rtl">
      {currentArticles.map((article) => (
        <CardBlog key={article.id} article={article} />
      ))}
      {totalPages > 1 && (
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            السابق
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
