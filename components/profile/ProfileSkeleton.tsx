import React from "react";
import { useTheme } from "@/context/ThemeContext";
import profilePageSkeletonStyles from "@/styles/profilePageSkeleton";

export default function ProfilePageSkeleton() {
  const { theme } = useTheme();
  const styles = profilePageSkeletonStyles[theme];

  return (
    <div className={styles.container} dir="rtl">
      <div className={styles.topBar}></div>
      <div className={styles.mainRow}>
        <div className={styles.mainContent}>
          <div className={styles.profileHeader}>
            <div className={styles.coverImage}></div>
            <div className={styles.profileRow}>
              <div className={styles.avatar}></div>
              <div className={styles.profileInfo}>
                <div className={styles.infoLine1}></div>
                <div className={styles.infoLine2}></div>
              </div>
            </div>
          </div>
          <div className={styles.bioSection}>
            <div className={styles.bioTitle}></div>
            <div className={styles.bioContent}>
              <div className={styles.bioLine1}></div>
              <div className={styles.bioLine2}></div>
              <div className={styles.bioLine3}></div>
            </div>
          </div>
          <div className={styles.articlesSection}>
            <div className={styles.articlesTitle}></div>
            <div className={styles.articleCard}>
              <div className={styles.articleContent}>
                <div className={styles.articleLine1}></div>
                <div className={styles.articleLine2}></div>
                <div className={styles.articleLine3}></div>
              </div>
              <div className={styles.articleImage}></div>
            </div>
            <div className={styles.articleCard}>
              <div className={styles.articleContent}>
                <div className={styles.articleLine1}></div>
                <div className={styles.articleLine2}></div>
                <div className={styles.articleLine3}></div>
              </div>
              <div className={styles.articleImage}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
