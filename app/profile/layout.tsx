"use client";
import React, { Suspense } from "react";
import ProfileSidebar from "@/components/profile/sidebar/ProfileSidebar";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import SideBarPageSkeleton from "@/components/profile/SideBarSkeleton";
import profileLayoutStyles from "@/styles/profileLayout";
import { UserProfileDataProvider } from "@/context/ProfileContext";
import { useTheme } from "@/context/ThemeContext";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = profileLayoutStyles[theme];
  
  return (
    <UserProfileDataProvider>
      <div className={styles.container} dir={styles.dir}>
        <div className={styles.grid}>
          <div className={styles.main}>
            <Suspense fallback={<ProfileSkeleton />}>
              {children}
            </Suspense>
          </div>
          <div className={styles.sidebar}>
            <Suspense fallback={<SideBarPageSkeleton />}>
              <ProfileSidebar />
            </Suspense>
          </div>
        </div>
      </div>
    </UserProfileDataProvider>
  );
}
