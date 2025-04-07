"use client";
import React from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

type Interaction = {
  id: number;
  type: string;
  content?: string;
  articleId: number;
};

interface ProfileInteractionsProps {
  interactions: Interaction[];
}

const profileInteractionsStyles = {
  light: {
    container: "overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
    heading: "mb-4 text-xl font-bold text-gray-900",
    listItem: "flex items-center gap-2 text-gray-700",
    commentIcon: "text-blue-500",
    likeIcon: "text-red-500",
  },
  dark: {
    container: "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-sm",
    heading: "mb-4 text-xl font-bold text-gray-100",
    listItem: "flex items-center gap-2 text-gray-300",
    commentIcon: "text-blue-400",
    likeIcon: "text-red-400",
  },
};

export default function ProfileInteractions({ interactions }: ProfileInteractionsProps) {
  const { theme } = useTheme();
  const styles = profileInteractionsStyles[theme];
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>التفاعلات الأخيرة</h3>
      <ul className="space-y-4">
        {interactions.map((interaction) => (
          <li key={interaction.id} className={styles.listItem}>
            {interaction.type === "comment" ? (
              <>
                <FaComment className={styles.commentIcon} />
                <span>
                  <span className="font-medium">علق على المقال رقم {interaction.articleId}:</span>{" "}
                  {interaction.content}
                </span>
              </>
            ) : interaction.type === "like" ? (
              <>
                <FaHeart className={styles.likeIcon} />
                <span className="font-medium">أعجب بالمقال رقم {interaction.articleId}</span>
              </>
            ) : (
              <span>{interaction.type}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
