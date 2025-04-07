"use client";
import Image from "next/image";
import React from "react";
import { FaHeart, FaRegClock } from "react-icons/fa";
import myPhoto from "@/public/myPhoto.jpg";
import { useTheme } from "@/context/ThemeContext";

// Extracted styles for Comment component
const commentStyles = {
  light: {
    container: "divide-y divide-gray-100",
    commentWrapper: "border-b border-gray-300 py-6",
    imageWrapper:
      "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-100",
    name: "font-medium text-gray-900",
    time: "flex items-center gap-1 text-xs text-gray-500",
    text: "text-gray-700",
    likeButton:
      "flex items-center gap-1 text-xs text-gray-500 transition hover:text-red-500",
  },
  dark: {
    container: "divide-y divide-gray-700",
    commentWrapper: "border-b border-gray-600 py-6",
    imageWrapper:
      "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-300",
    name: "font-medium text-gray-100",
    time: "flex items-center gap-1 text-xs text-gray-400",
    text: "text-gray-300",
    likeButton:
      "flex items-center gap-1 text-xs text-gray-400 transition hover:text-red-400",
  },
};

const Comment = () => {
  const { theme } = useTheme();
  const styles = commentStyles[theme];

  return (
    <div className={styles.container}>
      <div className={styles.commentWrapper}>
        <div className="flex gap-4">
          <div className={styles.imageWrapper}>
            <Image
              src={myPhoto}
              alt="فيصل ابو زكري"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h4 className={styles.name}>فيصل أبو زكري</h4>
              <span className={styles.time}>
                <FaRegClock className="h-3 w-3" />
                منذ 12 ساعة
              </span>
            </div>

            <p className={styles.text}>
              الله يفرجها عليكم و تنتهي هالحرب بأسرع وفت و يكون عيدكم عيدين بانتهاء حربكم
            </p>

            <div className="mt-3 flex items-center gap-4">
              <button className={styles.likeButton}>
                <FaHeart className="h-3 w-3" />
                <span>10</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
