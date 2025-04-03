// components/profile/ProfileStats.tsx
"use client";
import React from "react";
import { FaRegNewspaper, FaHeart, FaComment } from "react-icons/fa";

interface Stats {
  totalArticles: number;
  totalLikes: number;
  totalComments: number;
}

interface ProfileStatsProps {
  stats: Stats;
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-bold text-gray-900">إحصائياتي</h3>
      <div className="flex flex-col space-y-3 text-gray-700">
        <div className="flex items-center gap-2">
          <FaRegNewspaper className="text-blue-500" />
          <span>المقالات: {stats.totalArticles}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-500" />
          <span>الإعجابات: {stats.totalLikes}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaComment className="text-green-500" />
          <span>التعليقات: {stats.totalComments}</span>
        </div>
      </div>
    </div>
  );
}
