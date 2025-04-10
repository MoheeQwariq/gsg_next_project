"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import type { BlogDetail } from "@/types/blog";
import myPhoto from "@/public/myPhoto.jpg";

interface TrendingBlogProps {
  blog: BlogDetail;
}

const trendingBlogStyles = {
  light: {
    link: "group flex gap-3 rounded-lg p-2 transition hover:bg-gray-50",
    imageWrapper: "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg",
    image: "object-cover transition-transform group-hover:scale-105",
    content: "flex flex-col",
    title:
      "line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600",
    meta: "mt-auto flex items-center justify-between",
    authorContainer: "flex items-center gap-2",
    authorImageWrapper: "relative h-6 w-6 overflow-hidden rounded-full",
    authorName: "text-xs text-gray-600",
    date: "flex items-center gap-1 text-sm text-gray-500",
    calendarIcon: "h-4 w-4 text-gray-400",
    extraDate: "text-xs text-gray-500",
  },
  dark: {
    link: "group flex gap-3 rounded-lg p-2 transition hover:bg-gray-700",
    imageWrapper: "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg",
    image: "object-cover transition-transform group-hover:scale-105",
    content: "flex flex-col",
    title:
      "line-clamp-2 text-sm font-medium text-gray-100 group-hover:text-blue-400",
    meta: "mt-auto flex items-center justify-between",
    authorContainer: "flex items-center gap-2",
    authorImageWrapper: "relative h-6 w-6 overflow-hidden rounded-full",
    authorName: "text-xs text-gray-400",
    date: "flex items-center gap-1 text-sm text-gray-400",
    calendarIcon: "h-4 w-4 text-gray-300",
    extraDate: "text-xs text-gray-400",
  },
};

const TrendingBlog = ({ blog }: TrendingBlogProps) => {
  const { theme } = useTheme();
  const styles = trendingBlogStyles[theme];

  return (
    <Link href={`/blogs/${blog.blogId}`} className={styles.link}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.imageUrl || myPhoto}
          alt={blog.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{blog.title}</h4>
        <div className={styles.meta}>
          <div className={styles.authorContainer}>
            <div className={styles.authorImageWrapper}>
              <Image
                src={blog.author.image || myPhoto}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className={styles.authorName}>{blog.author.name}</span>
          </div>
          <span className={styles.date}>
            <FaCalendarAlt className={styles.calendarIcon} />
            {new Date(blog.createdAt).toLocaleDateString("ar-EG")}
          </span>
          <span className={styles.extraDate}>
            {new Date(blog.createdAt).toLocaleTimeString("ar-EG")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TrendingBlog;
