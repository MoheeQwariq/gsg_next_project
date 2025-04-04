"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";
import ProfileArticles from "@/components/profile/ProfileArticles";
import profilePageStyles from "@/styles/profilePage";
import useProfileData from "@/hooks/useProfileData";

export default function ProfilePage() {
  const { username } = useParams();
  const { profile } = useProfile();
  const isOwner = username === profile.user.username;

  const { profileData, articles, sections, loading, error } = useProfileData(
    username as string,
    isOwner,
    profile
  );

  // if (loading) {
  //   return <div>Loading...</div>; 
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      <div className={profilePageStyles.headerContainer}>
        <h1 className={profilePageStyles.pageHeading}>
          الملف الشخصي: {profileData.user.name}
        </h1>
      </div>
      <ProfileHeader profile={profileData} isOwner={isOwner} />

      <div className={profilePageStyles.sectionContainer}>
        <h2 className={profilePageStyles.sectionHeading}>نبذة عن المستخدم</h2>
        {(isOwner || (!isOwner && sections.length !== 0)) ? (
          <ProfileSections profile={profileData} />
        ) : (
          <div className={profilePageStyles.emptyMessage}>
            لا توجد أقسام متاحة في الوقت الحالي.
          </div>
        )}
      </div>

      <div className={profilePageStyles.sectionContainer}>
        <h2 className={profilePageStyles.sectionHeading}>مقالات المستخدم</h2>
        {articles.length === 0 ? (
          isOwner ? (
            <div className={profilePageStyles.emptyMessage}>
              يبدو أنك لم تقم بنشر مقالات بعد. قم بإنشاء مقالة جديدة لبدء المشاركة.
            </div>
          ) : (
            <div className={profilePageStyles.emptyMessage}>
              المستخدم لم يقم بنشر أي مقالات حتى الآن.
            </div>
          )
        ) : (
          <ProfileArticles articles={articles} />
        )}
      </div>
    </>
  );
}
