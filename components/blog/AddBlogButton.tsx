"use client";

import { useModal } from "@/context/ModalContext";
import React from "react";
import { FaPlus } from "react-icons/fa";

const AddBlogButton = () => {
  const { handleModal } = useModal();

  return (
    <button
      onClick={handleModal}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer"
    >
      <FaPlus className="w-4 h-4" />
      <span>أضف مقال</span>
    </button>
  );
};

export default AddBlogButton;
