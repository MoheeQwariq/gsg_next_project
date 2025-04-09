"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import sideBarPageSkeletonStyles from "@/styles/sideBarPageSkeleton";

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
