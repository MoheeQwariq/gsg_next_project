"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import dashboardPageStyles from "@/styles/dashboard/dashboardPageStyles";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ArticleCountChart from "@/components/dashboard/ArticleCountChart";
import FollowerCountChart from "@/components/dashboard/FollowerCountChart";
import LovesChart from "@/components/dashboard/LovesChart";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
import CommentCountChart from "@/components/dashboard/CommentsChart";
import { getUserStats } from "@/services/dashboard/dashboardAnalytics.service";
import type { UserStats } from "@/types/dashboardStats";
import ChartSkeleton from "@/components/dashboard/ChartSkeleton";

export default function DashboardPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = dashboardPageStyles[theme];
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const fetchedStats = await getUserStats(user.id);
        setStats(fetchedStats);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    }
    if (user.id) {
      fetchStats();
    }
  }, [user.id]);

  return (
    <div className={styles.container} dir="rtl">
      <DashboardOverview />
      <div className={styles.gridTwoCol}>
     
      <Suspense fallback={<ChartSkeleton />}>

        <ArticleCountChart data={stats?.articleCounts || []} />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>

        <FollowerCountChart data={stats?.followerCounts || []} />
        </Suspense>

      </div>
      <div className={styles.gridTwoCol}>
      <Suspense fallback={<ChartSkeleton />}>

        <CommentCountChart data={stats?.commentCounts || []} />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>

        <LovesChart data={stats?.loveCounts || []} />
        </Suspense>

      </div>
      <DashboardActivity />
    </div>
  );
}
