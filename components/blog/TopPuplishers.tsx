"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import type { User } from "@/types/user";
import type { UserProfile } from "@/types/profile";
import { getTrendUsers } from "@/services/user/user.service";
import { getProfile } from "@/services/profile/profile.service";
import TopPublisher from "./TopPuplisher";

interface PublisherWithProfile {
  user: User;
  profile: UserProfile | null;
}

const topPublishersStyles = {
  light: {
    container: "mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900",
    list: "space-y-4",
    skeleton: "animate-pulse rounded-lg bg-gray-200 h-12 mb-4",
    noData: "text-center text-gray-600",
  },
  dark: {
    container: "mt-6 rounded-xl border border-gray-700 bg-gray-800 p-5 shadow-sm",
    heading:
      "mb-4 border-b border-gray-600 pb-2 text-xl font-bold text-gray-100",
    list: "space-y-4",
    skeleton: "animate-pulse rounded-lg bg-gray-600 h-12 mb-4",
    noData: "text-center text-gray-400",
  },
};

const TopPuplishers = () => {
  const { theme } = useTheme();
  const styles = topPublishersStyles[theme];
  const [publishers, setPublishers] = useState<PublisherWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const users = await getTrendUsers();
        const publishersWithProfiles = await Promise.all(
          users.map(async (user) => {
            try {
              const profile = await getProfile(user.profileId);
              return { user, profile };
            } catch (e) {
              console.error("Error fetching profile for user", user.id, e);
              return { user, profile: null };
            }
          })
        );
        setPublishers(publishersWithProfiles);
      } catch (error) {
        console.error("Error fetching top publishers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>أفضل الناشرين</h3>
        <div className={styles.list}>
          {[1, 2, 3].map((item) => (
            <div key={item} className={styles.skeleton} />
          ))}
        </div>
      </div>
    );
  }

  if (publishers.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.heading}>أفضل الناشرين</h3>
        <div className={styles.noData}>لا يتوفر ناشرون</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>أفضل الناشرين</h3>
      <div className={styles.list}>
        {publishers.map((publisher) => (
          <TopPublisher
            key={publisher.user.id}
            name={publisher.user.name}
            articles={publisher.profile?.articlesCount || 0}
            followers={publisher.profile?.followersCount || 0}
            imageSrc={publisher.user.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPuplishers;
