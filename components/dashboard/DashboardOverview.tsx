"use client";

import React from "react";

export default function DashboardOverview() {
  const overviewData = {
    articles: 10,
    comments: 25,
    likes: 5,
    followers: 100,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-2xl font-bold mb-4">مرحباً، أحمد!</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 bg-blue-100 rounded">
          <p className="text-xl font-semibold">{overviewData.articles}</p>
          <p className="text-sm">مقالات</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p className="text-xl font-semibold">{overviewData.comments}</p>
          <p className="text-sm">تعليقات</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <p className="text-xl font-semibold">{overviewData.likes}</p>
          <p className="text-sm">إعجابات</p>
        </div>
        <div className="p-4 bg-purple-100 rounded">
          <p className="text-xl font-semibold">{overviewData.followers}</p>
          <p className="text-sm">متابعين</p>
        </div>
      </div>
    </div>
  );
}
