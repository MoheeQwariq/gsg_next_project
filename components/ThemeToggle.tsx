"use client";
import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === "dark");

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  const handleToggle = () => {
    toggleTheme();
  };


  const sunClasses = isChecked ? "opacity-50" : "opacity-100";
  const moonClasses = isChecked ? "opacity-100" : "opacity-50";

  return (
    <label className="relative inline-flex items-center w-20 h-10 cursor-pointer" dir="ltr">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="sr-only peer"
      />

      <div
        className={`
          absolute inset-0 rounded-full
          bg-gray-300 peer-checked:bg-gradient-to-r
          peer-checked:from-violet-600 peer-checked:to-blue-500
          transition-colors duration-300
        `}
      />

      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        <FaSun className={`text-yellow-500 transition-opacity duration-300 ${sunClasses}`} />
        <FaMoon className={`text-indigo-300 transition-opacity duration-300 ${moonClasses}`} />
      </div>

      <div
        className={`
          absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md
          transition-transform duration-300
          peer-checked:translate-x-10
        `}
      />
    </label>
  );
}
