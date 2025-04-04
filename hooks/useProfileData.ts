"use client";

import { useEffect, useState } from "react";
import { getProfileData, getUserArticles } from "@/services/profile.service";
import type { Article } from "@/types/blog";
import type { ProfileSection, UserProfile } from "@/types/profile";

interface UseProfileDataResult {
  profileData: UserProfile;
  articles: Article[];
  sections: ProfileSection[];
  loading: boolean;
  error: string;
}

export default function useProfileData(
  username: string,
  isOwner: boolean,
  defaultProfile: UserProfile
): UseProfileDataResult {
  const [profileData, setProfileData] = useState<UserProfile>(defaultProfile);
  const [articles, setArticles] = useState<Article[]>([]);
  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        if (!isOwner && typeof username === "string") {
          const fetchedProfile = await getProfileData(username);
          setProfileData(fetchedProfile);
          const fetchedArticles = await getUserArticles(fetchedProfile.user.id);
          setArticles(fetchedArticles);
          // Optionally, fetch sections if applicable.
          // setSections(await getProfileSections(fetchedProfile.user.id));
        } else {
          const fetchedArticles = await getUserArticles(defaultProfile.user.id);
          setArticles(fetchedArticles);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching profile data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username, isOwner, defaultProfile]);

  return { profileData, articles, sections, loading, error };
}
