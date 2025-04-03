import { categories } from "@/constant/constant";
import React from "react";
import CategoryTab from "./CategoryTab";

const Categories = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories?.map((category) => (
        <CategoryTab key={category} category={category}>
          {category}
        </CategoryTab>
      ))}
    </div>
  );
};

export default Categories;
