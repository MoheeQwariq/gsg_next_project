"use client";

import { CategoryTabProps } from "@/types/type";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

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

const CategoryTab = ({ children, category }: CategoryTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "الكل";
  const { theme } = useTheme();
  const styles = categoryTabStyles[theme];

  const handleCategoryClick = (category: string) => {
    if (category === "الكل") {
      router.push("/blogs");
    } else {
      router.push(`/blogs?category=${category}`);
    }
  };

  const activeStyle =
    currentCategory === category ? styles.active : styles.inactive;

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
