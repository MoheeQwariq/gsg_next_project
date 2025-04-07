"use client";

import React, { Suspense } from "react";
import { useTheme } from "@/context/ThemeContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import SideBarPageSkeleton from "@/components/dashboard/SideBarPageSkeleton";
const dashboardLayoutStyles = {
  light: {
    container: "container mx-auto px-4 py-8 bg-white text-gray-900",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    main: "order-1 lg:col-span-3",
    sidebar: "order-2 lg:sticky lg:top-24 lg:self-start",
    dir: "rtl",
  },
  dark: {
    container: "container mx-auto px-4 py-8 bg-gray-900 text-gray-100",
    grid: "grid grid-cols-1 gap-8 lg:grid-cols-4",
    main: "order-1 lg:col-span-3",
    sidebar: "order-2 lg:sticky lg:top-24 lg:self-start",
    dir: "rtl",
  },
};


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = dashboardLayoutStyles[theme];

  return (
    <div className={styles.container} dir={styles.dir}>
      <div className={styles.grid}>
        <div className={styles.main}>
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </div>
        <div className={styles.sidebar}>
          <Suspense fallback={<SideBarPageSkeleton />}>
            <DashboardSidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
