"use client";
import React from "react";
import { useUserProfileData } from "@/context/ProfileContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";
import ProfileArticles from "@/components/profile/ProfileArticles";
import profilePageStyles from "@/styles/profilePage";
import { useTheme } from "@/context/ThemeContext";
import UserNotFound from "@/components/profile/UserNotFound";

export default function ProfilePage() {
  const { user, profile, isOwner
    // , loading 
  } = useUserProfileData();
  const { theme } = useTheme();
  const styles = profilePageStyles[theme];

  // if (loading) {
  //   // return <div>Loading...</div>;
  // }

  if (!user || !profile) {
    return <UserNotFound />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageHeading}>الملف الشخصي: {user.name}</h1>
      </div>
      <ProfileHeader isOwner={isOwner} user={user} profile={profile} />
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>نبذة عن المستخدم</h2>
        <ProfileSections isOwner={isOwner} user={user} />
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>مقالات المستخدم</h2>
        <ProfileArticles userId={user.id} />
      </div>
    </div>
  );
}
