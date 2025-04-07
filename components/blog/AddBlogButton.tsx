"use client";

import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { FaPlus } from "react-icons/fa";

const addBlogButtonStyles = {
  light: {
    button:
      "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer",
    icon: "w-4 h-4",
  },
  dark: {
    button:
      "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-gray-100 shadow-md transition duration-300 hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg cursor-pointer",
    icon: "w-4 h-4",
  },
};

const AddBlogButton = () => {
  const { handleModal } = useModal();
  const { theme } = useTheme();
  const styles = addBlogButtonStyles[theme];

  return (
    <button onClick={handleModal} className={styles.button}>
      <FaPlus className={styles.icon} />
      <span>أضف مقال</span>
    </button>
  );
};

export default AddBlogButton;
