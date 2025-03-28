import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBlogs = () => {
  return (
    <div className="relative max-w-md">
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 rtl:left-0 rtl:right-auto rtl:pl-3">
        <FaSearch className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="ابحث عن مقال"
        className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 "
      />
    </div>
  );
};

export default SearchBlogs;
