"use client";
import React from "react";
import CategoryTab from "./CategoryTab";
import { categories } from "./../../constant/constant";

const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);
  return (
    <div className="no-scrollbar flex w-full flex-nowrap items-center gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <CategoryTab
          key={category}
          active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </CategoryTab>
      ))}
    </div>
  );
};

export default Categories;
