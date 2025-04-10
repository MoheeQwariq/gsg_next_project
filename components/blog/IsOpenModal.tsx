"use client";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import BlogModal from "./BlogModal";
import type { BlogDetail } from "@/types/blog";

const isOpenModalStyles = {
  light: {
    container: "bg-gray-600 bg-opacity-100",
  },
  dark: {
    container: "bg-gray-800 bg-opacity-90",
  },
};
interface IsOpenModalProps {
  onAddBlog: (blogData: Partial<BlogDetail>) => void;
}
const IsOpenModal = ({ onAddBlog }: IsOpenModalProps) => {
  const { isOpen } = useModal();
  const { theme } = useTheme();
  const styles = isOpenModalStyles[theme];

  return (
    <div className={styles.container}>
      {isOpen && <BlogModal onAddBlog={onAddBlog} />}
    </div>
  );
};

export default IsOpenModal;
