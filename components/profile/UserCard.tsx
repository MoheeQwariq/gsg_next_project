"use client";
import React from "react";
import Image from "next/image";

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
  };
}

export default function UserCard({ user, styles }: UserCardProps) {
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
          <h3 className={styles.nameText}>{user.name || "مستخدم غير معروف"}</h3>
          <p className={styles.emailText}>{user.email || "بدون بريد إلكتروني"}</p>
        </div>
      </div>
    </div>
  );
}
