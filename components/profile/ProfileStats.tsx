import React from "react";

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
      <div className="flex flex-col space-y-2 text-gray-700">
        <div>المقالات: {stats.totalArticles}</div>
        <div>الإعجابات: {stats.totalLikes}</div>
        <div>التعليقات: {stats.totalComments}</div>
      </div>
    </div>
  );
}
