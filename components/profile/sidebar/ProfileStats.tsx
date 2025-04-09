"use client";
import React from "react";
import { FaRegNewspaper, FaHeart, FaComment, FaUsers } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

interface Stats {
  totalArticles: number;
  totalLikes: number;
  totalComments: number;
  totalFollowers: number;
}

interface ProfileStatsProps {
  stats: Stats;
  isOwner?: boolean;
}

const profileStatsStyles = {
  light: {
    container: "overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
    header: "flex items-center justify-between mb-4",
    heading: "text-xl font-bold text-gray-900",
    list: "flex flex-col space-y-3 text-gray-700",
    item: "flex items-center gap-2",
    newspaperIcon: "text-blue-500",
    heartIcon: "text-red-500",
    commentIcon: "text-green-500",
    usersIcon: "text-purple-500",
    moreButton:
      "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer",
  },
  dark: {
    container: "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm",
    header: "flex items-center justify-between mb-4",
    heading: "text-xl font-bold text-gray-100",
    list: "flex flex-col space-y-3 text-gray-300",
    item: "flex items-center gap-2",
    newspaperIcon: "text-blue-400",
    heartIcon: "text-red-400",
    commentIcon: "text-green-400",
    usersIcon: "text-purple-400",
    moreButton:
      "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer",
  },
};

export default function ProfileStats({ stats, isOwner = false }: ProfileStatsProps) {
  const { theme } = useTheme();
  const styles = profileStatsStyles[theme];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.heading}>إحصائياتي</h3>
        {isOwner && (
          <Link href="/dashboard" className={styles.moreButton}>
            <span>المزيد</span>
          </Link>
        )}
      </div>
      <div className={styles.list}>
        <div className={styles.item}>
          <FaRegNewspaper className={styles.newspaperIcon} />
          <span>المقالات: {stats.totalArticles}</span>
        </div>
        <div className={styles.item}>
          <FaHeart className={styles.heartIcon} />
          <span>الإعجابات: {stats.totalLikes}</span>
        </div>
        <div className={styles.item}>
          <FaComment className={styles.commentIcon} />
          <span>التعليقات: {stats.totalComments}</span>
        </div>
        <div className={styles.item}>
          <FaUsers className={styles.usersIcon} />
          <span>المتابعون: {stats.totalFollowers}</span>
        </div>
      </div>
    </div>
  );
}
