"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function UserNotFound() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerClasses = isDark 
    ? "flex items-center justify-center min-h-screen bg-gray-900"
    : "flex items-center justify-center min-h-screen bg-gray-100";

  const boxClasses = isDark 
    ? "p-8 bg-gray-800 rounded-lg shadow-lg"
    : "p-8 bg-white rounded-lg shadow-lg";

  const titleClasses = isDark 
    ? "text-3xl font-bold text-white"
    : "text-3xl font-bold text-gray-800";

  const subtitleClasses = isDark 
    ? "mt-4 text-lg text-gray-300"
    : "mt-4 text-lg text-gray-600";

  return (
    <div className={containerClasses}>
    <div className={boxClasses}>
        <h1 className={titleClasses}>المستخدم غير موجود</h1>
        <p className={subtitleClasses}>
        المستخدم الذي تبحث عنه غير موجود أو ربما تم حذفه.
        </p>
    </div>
    </div>

  );
}
