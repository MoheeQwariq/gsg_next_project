"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";   
import { useProfile } from "@/context/ProfileContext";

export default function DashboardSidebar() {
  const authContext = useAuth();
  const user = authContext?.user;
  const logout = authContext?.logout;

  const dynamicStats = {
    totalArticles: 12,
    totalLikes: 45,
    totalComments: 30,
  };

  const [statsPublic, setStatsPublic] = useState(true);

  const toggleStats = () => setStatsPublic((prev) => !prev);

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <div className="flex items-center gap-x-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/default-avatar.png"
              alt="الصورة الشخصية"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {user?.name || "مستخدم"}
            </h3>
            <p className="text-sm text-gray-600">
              {user?.email || "بدون بريد إلكتروني"}
            </p>
          </div>
        </div>
      </div>

      {statsPublic && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <h3 className="mb-2 text-lg font-bold text-gray-900">إحصائياتي</h3>
          <p>مقالات: {dynamicStats.totalArticles}</p>
          <p>الإعجابات: {dynamicStats.totalLikes}</p>
          <p>التعليقات: {dynamicStats.totalComments}</p>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">روابط سريعة</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block text-blue-600 hover:underline">
              لوحة التحكم
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="block text-blue-600 hover:underline">
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="block text-blue-600 hover:underline">
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4">
        <h3 className="mb-2 text-lg font-bold text-gray-900">الخصوصية</h3>
        <button
          onClick={toggleStats}
          className="w-full rounded-lg bg-blue-50 px-4 py-2 text-gray-700 hover:bg-blue-100"
        >
          {statsPublic ? "إخفاء الإحصائيات" : "إظهار الإحصائيات"}
        </button>
      </div>
    </div>
  );
}
