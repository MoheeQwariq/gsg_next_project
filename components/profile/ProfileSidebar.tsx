"use client";

import React, { useState } from "react";
import Image from "next/image";
import myPhoto from "../../public/myPhoto.jpg";
import ProfileStats from "./ProfileStats";
import ProfileInteractions from "./ProfileInteractions";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const ProfileSidebar = () => {
  const { profile } = useProfile();
  const { logout } = useAuth();

  const dynamicStats = {
    totalArticles: profile.articlesCount || 0,
    totalLikes: profile.starsCount || 0,
    totalComments: profile.commentsCount || 0,
  };

  const dynamicInteractions: { id: number; type: string; content?: string; articleId: number; }[] = [];

  const isOwner = true;

  const [statsPublic, setStatsPublic] = useState(true);
  const [interactionsPublic, setInteractionsPublic] = useState(true);

  const toggleStats = () => setStatsPublic((prev) => !prev);
  const toggleInteractions = () => setInteractionsPublic((prev) => !prev);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center gap-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={profile.avatarUrl || myPhoto}
              alt="الصورة الشخصية"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {profile.user.name || "مستخدم غير معروف"}
            </h3>
            <p className="text-sm text-gray-600">
              {profile.user.email || "بدون بريد إلكتروني"}
            </p>
          </div>
        </div>
      </div>

      {statsPublic && <ProfileStats stats={dynamicStats} />}

      {interactionsPublic && (
        <ProfileInteractions interactions={dynamicInteractions} />
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">روابط سريعة</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/profile" className="block text-blue-600 hover:underline">
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block text-blue-600 hover:underline">
              الإعدادات
            </Link>
          </li>
          <li>
            <button onClick={logout} className="block text-red-600 hover:underline">
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>

      {isOwner && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-900">الخصوصية</h3>
          <div className="space-y-2">
            <button
              onClick={toggleStats}
              className="w-full rounded-lg bg-blue-50 px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              {statsPublic ? "إخفاء الإحصائيات" : "إظهار الإحصائيات"}
            </button>
            <button
              onClick={toggleInteractions}
              className="w-full rounded-lg bg-blue-50 px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              {interactionsPublic ? "إخفاء التفاعلات" : "إظهار التفاعلات"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
