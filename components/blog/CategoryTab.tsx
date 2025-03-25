import { CategoryTabProps } from "@/types/type";
import React from "react";

const CategoryTab = ({
  children,
  active = false,
  onClick,
}: CategoryTabProps) => {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-100 text-blue-700"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
};

export default CategoryTab;
