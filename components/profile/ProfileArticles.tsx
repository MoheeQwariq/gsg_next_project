"use client";

import React, { useState } from "react";
import CardBlog from "@/components/blog/CardBlog";

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  likes: number;
  commentsCount: number;
}
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

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {currentArticles.map((article) => (
        <CardBlog key={article.id}  />
        // <CardBlog key={article.id} article={article} />
      ))}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            السابق
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md border border-gray-300 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border border-gray-300 text-gray-700 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
}
