"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
const sideBarPageSkeletonStyles = {
    light: {
      container: "flex flex-col gap-6 animate-pulse",
      mainRow: "flex flex-col lg:flex-row gap-6",
      sidebar: "hidden lg:block w-full lg:w-64 flex-shrink-0 space-y-4",
      userInfoCard: "border border-gray-200 bg-white rounded-md p-4 space-y-4",
      avatar: "w-16 h-16 mx-auto rounded-full bg-gray-200",
      nameLine: "h-4 w-1/2 bg-gray-200 mx-auto rounded",
      statsLine1: "h-3 w-3/4 bg-gray-200 mx-auto rounded",
      statsLine2: "h-3 w-2/3 bg-gray-200 mx-auto rounded",
      interactionsCard: "border border-gray-200 bg-white rounded-md p-4 space-y-3",
      interactionLine1: "h-3 w-3/4 bg-gray-200 rounded",
      interactionLine2: "h-3 w-1/2 bg-gray-200 rounded",
      interactionLine3: "h-3 w-2/3 bg-gray-200 rounded",
    },
    dark: {
      container: "flex flex-col gap-6 animate-pulse",
      mainRow: "flex flex-col lg:flex-row gap-6",
      sidebar: "hidden lg:block w-full lg:w-64 flex-shrink-0 space-y-4",
      userInfoCard: "border border-gray-600 bg-gray-800 rounded-md p-4 space-y-4",
      avatar: "w-16 h-16 mx-auto rounded-full bg-gray-700",
      nameLine: "h-4 w-1/2 bg-gray-700 mx-auto rounded",
      statsLine1: "h-3 w-3/4 bg-gray-700 mx-auto rounded",
      statsLine2: "h-3 w-2/3 bg-gray-700 mx-auto rounded",
      interactionsCard: "border border-gray-600 bg-gray-800 rounded-md p-4 space-y-3",
      interactionLine1: "h-3 w-3/4 bg-gray-700 rounded",
      interactionLine2: "h-3 w-1/2 bg-gray-700 rounded",
      interactionLine3: "h-3 w-2/3 bg-gray-700 rounded",
    },
  };
  
  
export default function SideBarPageSkeleton() {
  const { theme } = useTheme();
  const styles = sideBarPageSkeletonStyles[theme];

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.mainRow}>
        <div className={styles.sidebar}>
          <div className={styles.userInfoCard}>
            <div className={styles.avatar}></div>
            <div className={styles.nameLine}></div>
            <div className={styles.statsLine1}></div>
            <div className={styles.statsLine2}></div>
          </div>
          <div className={styles.interactionsCard}>
            <div className={styles.interactionLine1}></div>
            <div className={styles.interactionLine2}></div>
            <div className={styles.interactionLine3}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
