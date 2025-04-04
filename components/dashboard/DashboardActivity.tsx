"use client";

import React from "react";

export default function DashboardActivity() {
  const activities = [
    { id: 1, activity: "قام بنشر مقالة جديدة عن Next.js." },
    { id: 2, activity: "تم تحديث بيانات الملف الشخصي." },
    { id: 3, activity: "علق على مقالة حول React." },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow" dir="rtl">
      <h3 className="text-xl font-bold mb-4">آخر الأنشطة</h3>
      <ul className="space-y-2">
        {activities.map((act) => (
          <li key={act.id} className="border-b border-gray-200 pb-2">
            {act.activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
