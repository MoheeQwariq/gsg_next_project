"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import profileArticlesStyles from "@/styles/profileArticles";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) {
  const { theme } = useTheme();
  const styles = profileArticlesStyles[theme];

  return (
    <div className={styles.paginationContainer}>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`${styles.navButton} ${
          currentPage === 1 ? styles.navButtonDisabled : ""
        }`}
      >
        السابق
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`${styles.pageButton} ${
              currentPage === i + 1
                ? styles.activePageButton
                : styles.inactivePageButton
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`${styles.navButton} ${
          currentPage === totalPages ? styles.navButtonDisabled : ""
        }`}
      >
        التالي
      </button>
    </div>
  );
}
