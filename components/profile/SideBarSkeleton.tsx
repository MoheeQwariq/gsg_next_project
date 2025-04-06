"use client";
import React from "react";
import sideBarPageSkeletonStyles from "@/styles/sideBarPageSkeleton";

export default function SideBarPageSkeleton() {
  return (
    <div className={sideBarPageSkeletonStyles.container} dir="rtl">
      <div className={sideBarPageSkeletonStyles.mainRow}>
        <div className={sideBarPageSkeletonStyles.sidebar}>
          <div className={sideBarPageSkeletonStyles.userInfoCard}>
            <div className={sideBarPageSkeletonStyles.avatar}></div>
            <div className={sideBarPageSkeletonStyles.nameLine}></div>
            <div className={sideBarPageSkeletonStyles.statsLine1}></div>
            <div className={sideBarPageSkeletonStyles.statsLine2}></div>
          </div>
          <div className={sideBarPageSkeletonStyles.interactionsCard}>
            <div className={sideBarPageSkeletonStyles.interactionLine1}></div>
            <div className={sideBarPageSkeletonStyles.interactionLine2}></div>
            <div className={sideBarPageSkeletonStyles.interactionLine3}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
