"use client";

import React from "react";
import profilePageSkeletonStyles from "@/styles/profilePageSkeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className={profilePageSkeletonStyles.container} dir="rtl">
      {/* Top Bar (title or breadcrumbs) */}
      <div className={profilePageSkeletonStyles.topBar}></div>

      <div className={profilePageSkeletonStyles.mainRow}>
        {/* Left Sidebar Skeleton */}
        {/* (No content provided for sidebar – add if needed) */}

        {/* Main Content Skeleton */}
        <div className={profilePageSkeletonStyles.mainContent}>
          {/* Profile Header Skeleton */}
          <div className={profilePageSkeletonStyles.profileHeader}>
            {/* Cover Image */}
            <div className={profilePageSkeletonStyles.coverImage}></div>
            {/* Profile row */}
            <div className={profilePageSkeletonStyles.profileRow}>
              <div className={profilePageSkeletonStyles.avatar}></div>
              <div className={profilePageSkeletonStyles.profileInfo}>
                <div className={profilePageSkeletonStyles.infoLine1}></div>
                <div className={profilePageSkeletonStyles.infoLine2}></div>
              </div>
            </div>
          </div>

          {/* User Bio Section */}
          <div className={profilePageSkeletonStyles.bioSection}>
            <div className={profilePageSkeletonStyles.bioTitle}></div>
            <div className={profilePageSkeletonStyles.bioContent}>
              <div className={profilePageSkeletonStyles.bioLine1}></div>
              <div className={profilePageSkeletonStyles.bioLine2}></div>
              <div className={profilePageSkeletonStyles.bioLine3}></div>
            </div>
          </div>

          {/* Articles Section */}
          <div className={profilePageSkeletonStyles.articlesSection}>
            <div className={profilePageSkeletonStyles.articlesTitle}></div>

            {/* Single Article Skeleton */}
            <div className={profilePageSkeletonStyles.articleCard}>
              <div className={profilePageSkeletonStyles.articleContent}>
                <div className={profilePageSkeletonStyles.articleLine1}></div>
                <div className={profilePageSkeletonStyles.articleLine2}></div>
                <div className={profilePageSkeletonStyles.articleLine3}></div>
              </div>
              <div className={profilePageSkeletonStyles.articleImage}></div>
            </div>

            {/* Repeat for another article */}
            <div className={profilePageSkeletonStyles.articleCard}>
              <div className={profilePageSkeletonStyles.articleContent}>
                <div className={profilePageSkeletonStyles.articleLine1}></div>
                <div className={profilePageSkeletonStyles.articleLine2}></div>
                <div className={profilePageSkeletonStyles.articleLine3}></div>
              </div>
              <div className={profilePageSkeletonStyles.articleImage}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
