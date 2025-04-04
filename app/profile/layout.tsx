import React, { Suspense } from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import SideBarPageSkeleton from "@/components/profile/SideBarSkeleton";
import profileLayoutStyles from "@/styles/profileLayout";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={profileLayoutStyles.container} dir={profileLayoutStyles.dir}>
      <div className={profileLayoutStyles.grid}>
        <div className={profileLayoutStyles.main}>
          <Suspense fallback={<ProfileSkeleton />}>
            {children}
          </Suspense>
        </div>
        <div className={profileLayoutStyles.sidebar}>
          <Suspense fallback={<SideBarPageSkeleton />}>
            <ProfileSidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
