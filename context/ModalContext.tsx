"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext<{
  isOpen: boolean;
  handleModal: () => void;
} | null>(null);

export const ModalWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const value = {
    isOpen,
    handleModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

// Custom hook to use the context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalWrapper");
  }
  return context;
};
