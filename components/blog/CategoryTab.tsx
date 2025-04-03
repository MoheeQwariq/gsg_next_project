"use client";

import { CategoryTabProps } from "@/types/type";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const CategoryTab = ({ children, category }: CategoryTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "الكل";

  const handleCategoryClick = (category: string) => {
    if (category === "الكل") {
      router.push("/blogs");
    } else {
      router.push(`/blogs?category=${category}`);
    }
  };

  return (
    <button
      onClick={() => handleCategoryClick(category)}
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        currentCategory === category
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default CategoryTab;
