import React, { Suspense } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import dashboardLayoutStyles from "@/styles/dashboardLayoutStyles"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={dashboardLayoutStyles.container} dir={dashboardLayoutStyles.dir}>
      <div className={dashboardLayoutStyles.grid}>
        <div className={dashboardLayoutStyles.main}>
          <Suspense fallback={<DashboardSkeleton />}>
            {children}
          </Suspense>
        </div>
        <div className={dashboardLayoutStyles.sidebar}>
          <Suspense fallback={<div>جاري تحميل الشريط الجانبي...</div>}>
            <DashboardSidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
