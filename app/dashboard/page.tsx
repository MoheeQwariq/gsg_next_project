"use client";

import React from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ArticleCountChart from "@/components/dashboard/ArticleCountChart";
import FollowerCountChart from "@/components/dashboard/FollowerCountChart";
import LovesChart from "@/components/dashboard/LovesChart";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
import CommentCountChart from "@/components/dashboard/CommentsChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6" dir="rtl">
      <DashboardOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArticleCountChart />
        <FollowerCountChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CommentCountChart />
      <LovesChart />
      </div>
      <DashboardActivity />
    </div>
  );
}
