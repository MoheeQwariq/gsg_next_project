"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export interface CategoryTabProps {
  children: React.ReactNode;
  category: string;
  onCategoryChange?: (category: string) => void;
  currentCategory?: string;
}

const categoryTabStyles = {
  light: {
    active: "bg-blue-500 text-white",
    inactive: "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white",
  },
  dark: {
    active: "bg-blue-400 text-white",
    inactive: "bg-gray-700 text-gray-300 hover:bg-blue-400 hover:text-white",
  },
};

const CategoryTab: React.FC<CategoryTabProps> = ({ children, category, onCategoryChange, currentCategory }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = categoryTabStyles[theme];

  const activeCategory = currentCategory || "الكل";

  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    } else {
      if (category === "الكل") {
        router.push("/blogs");
      } else {
        router.push(`/blogs?category=${category}`);
      }
    }
  };

  const activeStyle = activeCategory === category ? styles.active : styles.inactive;

  return (
    <button
      onClick={() => handleCategoryClick(category)}
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeStyle}`}
    >
      {children}
    </button>
  );
};

export default CategoryTab;
