"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getUserInteractions } from "@/services/profile/interactions.service";
import type { Interaction } from "@/types/dashboardStats";
const dashboardActivityStyles = {
  light: {
    container: "bg-white p-6 rounded-lg shadow",
    title: "text-xl font-bold mb-4 text-gray-900",
    list: "space-y-2",
    listItem: "border-b border-gray-200 pb-2 text-gray-700",
  },
  dark: {
    container: "bg-gray-800 p-6 rounded-lg shadow",
    title: "text-xl font-bold mb-4 text-gray-100",
    list: "space-y-2",
    listItem: "border-b border-gray-700 pb-2 text-gray-300",
  },
};

export default function DashboardActivity() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const styles = dashboardActivityStyles[theme];

  useEffect(() => {
    async function fetchData() {
      if (user.id) {
        const data = await getUserInteractions(user.id);
        setInteractions(data);
      }
    }
    fetchData();
  }, [user.id]);

  return (
    <div className={styles.container} dir="rtl">
      <h3 className={styles.title}>آخر الأنشطة</h3>
      {interactions.length === 0 ? (
        <p className="text-sm text-gray-500">لا توجد أنشطة متوفرة</p>
      ) : (
        <ul className={styles.list}>
          {interactions.map((act) => (
            <li key={act.id} className={styles.listItem}>
              {act.type === "comment"
                ? `علق على مقالة رقم ${act.articleId}: ${act.content}`
                : act.type === "like"
                ? `أعجب بمقالة رقم ${act.articleId}`
                : `تفاعل آخر: ${act.content}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
