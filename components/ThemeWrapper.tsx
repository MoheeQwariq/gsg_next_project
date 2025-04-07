"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const backgroundClass = theme === "light" ? "bg-[#EFEFEF]" : "bg-gray-900";

  return <div className={`${backgroundClass} min-h-screen`}>{children}</div>;
};

export default ThemeWrapper;
