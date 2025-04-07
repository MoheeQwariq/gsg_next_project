"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const dashboardOverviewStyles = {
  light: {
    container:
      "p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-lg",
    header: "text-3xl font-bold text-blue-800 mb-2",
    subheader: "text-lg text-indigo-700 mb-4",
    statsContainer:
      "mt-4 grid grid-cols-2 md:grid-cols-4 gap-4",
  },
  dark: {
    container:
      "p-6 bg-gradient-to-r from-gray-700 to-indigo-900 rounded-lg shadow-lg",
    header: "text-3xl font-bold text-gray-100 mb-2",
    subheader: "text-lg text-gray-300 mb-4",
    statsContainer:
      "mt-4 grid grid-cols-2 md:grid-cols-4 gap-4",
  },
};

const statColors = {
  followers: {
    light: "bg-green-50 text-green-700 border border-green-100",
    dark: "bg-green-900 text-green-200 border border-green-700",
  },
  likes: {
    light: "bg-red-50 text-red-700 border border-red-100",
    dark: "bg-red-900 text-red-200 border border-red-700",
  },
  comments: {
    light: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    dark: "bg-yellow-900 text-yellow-200 border border-yellow-700",
  },
  articles: {
    light: "bg-blue-50 text-blue-700 border border-blue-100",
    dark: "bg-blue-900 text-blue-200 border border-blue-700",
  },
};

interface StatCardProps {
  title: string;
  value: number;
  colorClass: string;
}

function StatCard({ title, value, colorClass }: StatCardProps) {
  return (
    <div className={`p-4 rounded-lg shadow ${colorClass}`}>
      <div className="text-base font-semibold">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

export default function DashboardOverview() {
  const { user, profile } = useAuth();
  const { theme } = useTheme();
  const styles = dashboardOverviewStyles[theme];

  const stats = {
    followers: profile?.followersCount || 0,
    likes: profile?.starsCount || 0,
    comments: profile?.commentsCount || 0,
    articles: profile?.articlesCount || 0,
  };

  return (
    <div className={styles.container} dir="rtl">
      <h1 className={styles.header}>مرحباً, {user.name}</h1>
      <p className={styles.subheader}>نظرة عامة على بياناتك</p>
      <div className={styles.statsContainer}>
        <StatCard
          title="متابعين"
          value={stats.followers}
          colorClass={statColors.followers[theme]}
        />
        <StatCard
          title="إعجابات"
          value={stats.likes}
          colorClass={statColors.likes[theme]}
        />
        <StatCard
          title="تعليقات"
          value={stats.comments}
          colorClass={statColors.comments[theme]}
        />
        <StatCard
          title="مقالات"
          value={stats.articles}
          colorClass={statColors.articles[theme]}
        />
      </div>
    </div>
  );
}
