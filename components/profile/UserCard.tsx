"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaUserPlus, FaStar } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { followUserByEmail, starUserByEmail } from "@/services/user/action.service";

interface UserCardProps {
  user: {
    imageUrl: string;
    name: string;
    email: string;
  };
  styles: {
    card: string;
    headerCard: string;
    avatarContainer: string;
    image: string;
    nameText: string;
    emailText: string;
    iconButton?: string;
    iconContainer?: string;
  };
}

export default function UserCard({ user, styles }: UserCardProps) {
  const { isLoggedIn, user: loggedInUser } = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const showActions = isLoggedIn && loggedInUser.email !== user.email;

  const handleFollow = async () => {
    try {
      await followUserByEmail(user.email, loggedInUser.email);
      setIsFollowed(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleStar = async () => {
    try {
      await starUserByEmail(user.email, loggedInUser.email);
      setIsStarred(true);
    } catch (error) {
      console.error("Error starring user:", error);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerCard}>
        <div className={styles.avatarContainer}>
          <Image
            src={user.imageUrl}
            alt="الصورة الشخصية"
            width={48}
            height={48}
            className={styles.image}
          />
        </div>
        <div>
          <h3 className={styles.nameText}>
            {user.name || "مستخدم غير معروف"}
          </h3>
          <p className={styles.emailText}>
            {user.email || "بدون بريد إلكتروني"}
          </p>
          {showActions && (
            <div className={styles.iconContainer || "flex gap-2 mt-2"}>
              <button
                onClick={handleFollow}
                className={styles.iconButton || "text-blue-500 hover:text-blue-700"}
                title="Follow"
                disabled={isFollowed}
              >
                <FaUserPlus size={16} />
              </button>
              <button
                onClick={handleStar}
                className={styles.iconButton || "text-yellow-500 hover:text-yellow-700"}
                title="Star"
                disabled={isStarred}
              >
                <FaStar size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
