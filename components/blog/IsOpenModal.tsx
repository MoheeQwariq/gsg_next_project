"use client";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import BlogModal from "./BlogModal";

const isOpenModalStyles = {
  light: {
    container: "bg-gray-600 bg-opacity-100",
  },
  dark: {
    container: "bg-gray-800 bg-opacity-90",
  },
};

const IsOpenModal = () => {
  const { isOpen } = useModal();
  const { theme } = useTheme();
  const styles = isOpenModalStyles[theme];

  return <div className={styles.container}>{isOpen && <BlogModal />}</div>;
};

export default IsOpenModal;
