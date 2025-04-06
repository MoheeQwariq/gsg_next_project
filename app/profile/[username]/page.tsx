"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUserArticles, getProfileSections } from "@/services/profile.service";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSections from "@/components/profile/ProfileSections";
import ProfileArticles from "@/components/profile/ProfileArticles";
import profilePageStyles from "@/styles/profilePage";
import type { Post } from "@/types/post";
import type { ProfileSection } from "@/types/profile";
import { useTheme } from "@/context/ThemeContext";

export default function ProfilePage() {
  const { username } = useParams();
  const { user, profile } = useAuth();
  const isOwner = username === user.username;

  const [articles, setArticles] = useState<Post[]>([]);
  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const styles = profilePageStyles[theme];

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedArticles = await getUserArticles(user.id);
        const fetchedSections = await getProfileSections(user.profileId);
        setArticles(fetchedArticles);
        setSections(fetchedSections);
      } catch (err: any) {
        setError(err.message || "حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageHeading}>
          الملف الشخصي: {user.name}
        </h1>
      </div>
      <ProfileHeader profile={profile} isOwner={isOwner} />
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>نبذة عن المستخدم</h2>
        {sections.length > 0 ? (
          <ProfileSections sections={sections} />
        ) : (
          <div className={styles.emptyMessage}>
            لا توجد أقسام متاحة في الوقت الحالي.
          </div>
        )}
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeading}>مقالات المستخدم</h2>
        {articles.length > 0 ? (
          <ProfileArticles articles={articles} />
        ) : (
          <div className={styles.emptyMessage}>
            لا توجد مقالات متاحة في الوقت الحالي.
          </div>
        )}
      </div>
    </>
  );
}
