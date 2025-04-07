"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserProfileData } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getUserInteractions } from "@/services/profile/interactions.service";
import profileSidebarStyles from "@/styles/profile/profileSidebarStyles";
import ProfileStats from "./ProfileStats";
import ProfileInteractions from "./ProfileInteractions";
import UserCard from "./../UserCard";
import { defaultUser } from "@/types/user";

const ProfileSidebar = () => {
  const { user, profile, isOwner } = useUserProfileData();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const styles = profileSidebarStyles[theme];

  const dynamicStats = {
    totalArticles: profile?.articlesCount || 0,
    totalLikes: profile?.starsCount || 0,
    totalComments: profile?.commentsCount || 0,
    totalFollowers: profile?.followersCount || 0,
  };

  const [interactions, setInteractions] = useState<
    { id: number; type: string; content?: string; articleId: number }[]
  >([]);

  useEffect(() => {
    async function fetchInteractions() {
      try {
        if (user && user.id) {
          const data = await getUserInteractions(user.id);
          setInteractions(data);
        }
      } catch (error) {
        console.error("Error fetching interactions", error);
      }
    }
    fetchInteractions();
  }, [user?.id]);

  return (
    <div className={styles.container}>
      <UserCard user={user || defaultUser} styles={styles} />
      <ProfileStats stats={dynamicStats} isOwner={isOwner} />
      <ProfileInteractions interactions={interactions} />
      <div className={styles.quickLinksCard}>
        <h3 className={styles.quickLinkTitle}>روابط سريعة</h3>
        <ul className="space-y-2">
          <li>
            <Link href={`/profile/${user?.username}`} className={styles.quickLinkItem}>
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link href="/settings" className={styles.quickLinkItem}>
              الإعدادات
            </Link>
          </li>
          <li>
            <button onClick={logout} className={styles.quickLinkItem}>
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
