"use client";

import React from "react";
import sideBarPageSkeletonStyles from "@/styles/sideBarPageSkeleton";

export default function SideBarPageSkeleton() {
  return (
    <div className={sideBarPageSkeletonStyles.container} dir="rtl">
      <div className={sideBarPageSkeletonStyles.mainRow}>
        {/* Left Sidebar Skeleton */}
        <div className={sideBarPageSkeletonStyles.sidebar}>
          {/* User Info Card */}
          <div className={sideBarPageSkeletonStyles.userInfoCard}>
            {/* Avatar */}
            <div className={sideBarPageSkeletonStyles.avatar}></div>
            {/* Name */}
            <div className={sideBarPageSkeletonStyles.nameLine}></div>
            {/* Stats */}
            <div className={sideBarPageSkeletonStyles.statsLine1}></div>
            <div className={sideBarPageSkeletonStyles.statsLine2}></div>
          </div>

          {/* Interactions Card */}
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
