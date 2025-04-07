"use client";
import React from "react";
import Comment from "./Comment";
import { useTheme } from "@/context/ThemeContext";

// Extracted styles for Comments component
const commentsStyles = {
  light: {
    container:
      "mx-auto mt-8 max-w-6xl rounded-xl bg-white p-6 shadow-sm md:p-8",
    title: "mb-6 text-2xl font-bold text-gray-900",
    inputContainer: "mb-8 rounded-lg border border-gray-200 p-4",
    textarea:
      "min-h-24 w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    button:
      "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-700 hover:to-indigo-700 cursor-pointer",
  },
  dark: {
    container:
      "mx-auto mt-8 max-w-6xl rounded-xl bg-gray-800 p-6 shadow-sm md:p-8",
    title: "mb-6 text-2xl font-bold text-gray-100",
    inputContainer: "mb-8 rounded-lg border border-gray-600 p-4",
    textarea:
      "min-h-24 w-full rounded-lg border border-gray-600 p-3 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    button:
      "rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-600 hover:to-indigo-600 cursor-pointer",
  },
};

const Comments = () => {
  const { theme } = useTheme();
  const styles = commentsStyles[theme];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>التعليقات</h3>

      <div className={styles.inputContainer}>
        <div className="flex flex-col gap-4">
          <textarea
            placeholder="أضف تعليقك..."
            className={styles.textarea}
          />
          <div className="flex justify-end">
            <button className={styles.button}>إضافة التعليق</button>
          </div>
        </div>
      </div>

      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
