// components/profile/ProfileSidebar.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import myPhoto from "../../public/myPhoto.jpg";
import ProfileStats from "./ProfileStats";
import ProfileInteractions from "./ProfileInteractions";

const ProfileSidebar = () => {
  const stats = {
    totalArticles: 2,
    totalLikes: 72,
    totalComments: 15,
  };

  const interactions = [
    { id: 1, type: "comment", content: "تعليق رائع", articleId: 1 },
    { id: 2, type: "like", articleId: 2 },
  ];

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
              src={myPhoto}
              alt="الصورة الشخصية"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">جين دو</h3>
            <p className="text-sm text-gray-600">
              كاتبة ومطورة شغوفة. أحب استكشاف التقنيات الجديدة.
            </p>
          </div>
        </div>
      </div>

      {statsPublic && <ProfileStats stats={stats} />}
      {interactionsPublic && <ProfileInteractions interactions={interactions} />}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">روابط سريعة</h3>
        <ul className="space-y-2">
          <li>
            <a href="/profile" className="block text-blue-600 hover:underline">
              الملف الشخصي
            </a>
          </li>
          <li>
            <a href="/settings" className="block text-blue-600 hover:underline">
              الإعدادات
            </a>
          </li>
          <li>
            <a href="/logout" className="block text-red-600 hover:underline">
              تسجيل الخروج
            </a>
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
