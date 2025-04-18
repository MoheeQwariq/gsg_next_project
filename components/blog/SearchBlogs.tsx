"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

interface SearchBlogsProps {
  onSearch: (query: string) => void;
}

const searchBlogsStyles = {
  light: {
    container: "relative max-w-md",
    iconContainer:
      "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 rtl:left-0 rtl:right-auto rtl:pl-3",
    icon: "h-4 w-4 text-gray-400",
    input:
      "w-full rounded-lg border border-gray-300 bg-white py-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  },
  dark: {
    container: "relative max-w-md",
    iconContainer:
      "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 rtl:left-0 rtl:right-auto rtl:pl-3",
    icon: "h-4 w-4 text-gray-300",
    input:
      "w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pr-10 text-gray-300 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400",
  },
};

const SearchBlogs: React.FC<SearchBlogsProps> = ({ onSearch }) => {
  const { theme } = useTheme();
  const styles = searchBlogsStyles[theme];
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <FaSearch className={styles.icon} />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="ابحث عن مقال"
        className={styles.input}
      />
    </div>
  );
};

export default SearchBlogs;
