"use client";
import { categories } from "@/constant/constant";
import React from "react";
import CategoryTab from "./CategoryTab";

interface CategoriesProps {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryChange, currentCategory }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryTab 
          key={category} 
          category={category}
          onCategoryChange={onCategoryChange}
          currentCategory={currentCategory}
        >
          {category}
        </CategoryTab>
      ))}
    </div>
  );
};

export default Categories;
