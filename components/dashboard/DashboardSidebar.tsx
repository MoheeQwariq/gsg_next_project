"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import dashboardSidebarStyles from "@/styles/dashboard/dashboardSidebarStyles";
import UserCard from "@/components/profile/UserCard";

export default function DashboardSidebar() {
  const { user, profile, logout } = useAuth();
  const { theme } = useTheme();
  const styles = dashboardSidebarStyles[theme];

  const dynamicStats = {
    totalArticles: profile?.articlesCount || 0,
    totalLikes: profile?.starsCount || 0,
    totalComments: profile?.commentsCount || 0,
    totalFollowers: profile?.followersCount || 0,

  };

  return (
    <div className={styles.container}>
      <UserCard user={user} styles={styles.userCard} />

      <div className={styles.statsCard}>
        <h3 className={styles.statsTitle}>إحصائياتي</h3>
        <p className={styles.statLine}>مقالات: {dynamicStats.totalArticles}</p>
        <p className={styles.statLine}>الإعجابات: {dynamicStats.totalLikes}</p>
        <p className={styles.statLine}>التعليقات: {dynamicStats.totalComments}</p>
        <p className={styles.statLine}>المتابعون: {dynamicStats.totalFollowers}</p>

      </div>

      <div className={styles.quickLinksCard}>
        <h3 className={styles.statsTitle}>روابط سريعة</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className={styles.quickLinkItem}>
              لوحة التحكم
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className={styles.quickLinkItem}>
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className={styles.quickLinkItem}>
              الإعدادات
            </Link>
          </li>
          <li>
            <button onClick={logout} className={styles.quickLinkItem}>
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
