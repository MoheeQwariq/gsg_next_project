"use client";
import { useModal } from "@/context/ModalContext";
import React from "react";
import BlogModal from "./BlogModal";

const IsOpenModal = () => {
  const { isOpen } = useModal();
  return (
    <div className="bg-gray-600 bg-opacity-100">{isOpen && <BlogModal />}</div>
  );
};

export default IsOpenModal;
