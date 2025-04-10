"use client";
import Image from "next/image";
import React from "react";
import { PiChatDots } from "react-icons/pi";
import photo from "../../public/myPhoto.jpg";
import Link from "next/link";
import { BlogDetail } from "@/types/blog";
import LikesCounter from "./LikesCounter";
import { formatDate } from "@/services/formateDate";
import { useTheme } from "@/context/ThemeContext";

const cardBlogStyles = {
  light: {
    container:
      "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
    grid: "grid grid-cols-1 md:grid-cols-3",
    linkBlock: "block",
    imageContainer: "relative h-60 w-full md:h-full",
    image: "object-cover",
    contentContainer: "flex flex-col p-5 md:col-span-2",
    header: "mb-2 flex items-center justify-between",
    badge: "rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700",
    date: "text-xs text-gray-500",
    title: "mb-2 text-xl font-bold text-gray-900",
    content: "mb-4 text-gray-600",
    footer: "mt-auto",
    footerRow:
      "flex items-center justify-between border-t border-gray-100 pt-4",
    authorSection: "flex items-center space-x-3 rtl:space-x-reverse",
    authorImage: "h-10 w-10 rounded-full border border-gray-200 object-cover",
    authorName: "font-medium text-gray-900",
    metaContainer: "flex items-center gap-4 text-sm text-gray-500",
    chatLink: "flex items-center gap-1 transition-colors hover:text-blue-600",
    chatIcon: "text-blue-500 cursor-pointer",
    readMore:
      "mt-4 block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:from-blue-700 hover:to-indigo-700",
  },
  dark: {
    container:
      "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm transition-all hover:shadow-md",
    grid: "grid grid-cols-1 md:grid-cols-3",
    linkBlock: "block",
    imageContainer: "relative h-60 w-full md:h-full",
    image: "object-cover",
    contentContainer: "flex flex-col p-5 md:col-span-2",
    header: "mb-2 flex items-center justify-between",
    badge: "rounded-lg bg-blue-900 px-3 py-1 text-xs font-medium text-blue-300",
    date: "text-xs text-gray-400",
    title: "mb-2 text-xl font-bold text-gray-100",
    content: "mb-4 text-gray-400",
    footer: "mt-auto",
    footerRow:
      "flex items-center justify-between border-t border-gray-700 pt-4",
    authorSection: "flex items-center space-x-3 rtl:space-x-reverse",
    authorImage: "h-10 w-10 rounded-full border border-gray-600 object-cover",
    authorName: "font-medium text-gray-100",
    metaContainer: "flex items-center gap-4 text-sm text-gray-400",
    chatLink: "flex items-center gap-1 transition-colors hover:text-blue-400",
    chatIcon: "text-blue-400 cursor-pointer",
    readMore:
      "mt-4 block rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:from-blue-600 hover:to-indigo-600",
  },
};

const CardBlog = ({ blog }: { blog: BlogDetail }) => {
  const { theme } = useTheme();
  const styles = cardBlogStyles[theme];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Link href={`/blogs/${blog.blogId}`} className={styles.linkBlock}>
          <div className={styles.imageContainer}>
            <Image
              src={blog.imageUrl || photo}
              alt={blog.title}
              fill
              className={styles.image}
            />
          </div>
        </Link>

        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <span className={styles.badge}>{blog.category}</span>
            <span className={styles.date}>{formatDate(blog.createdAt)}</span>
          </div>

          <h2 className={styles.title}>{blog.title}</h2>

          <p className={styles.content}>
            {blog.content.length > 150
              ? blog.content.substring(0, 150) + "..."
              : blog.content}
          </p>

          <div className={styles.footer}>
            <div className={styles.footerRow}>
              <div className={styles.authorSection}>
                <Image
                  src={blog.author.image || photo}
                  alt={blog.author.name}
                  width={40}
                  height={40}
                  className={styles.authorImage}
                />
                <span className={styles.authorName}>{blog.author.name}</span>
              </div>

              <div className={styles.metaContainer}>
                <LikesCounter blogId={blog.blogId} />

                <Link href={`/blogs/${blog.blogId}`}>
                  <div className={styles.chatLink}>
                    <PiChatDots className={styles.chatIcon} size={20} />
                    <span>1</span>
                  </div>
                </Link>
              </div>
            </div>

            <Link href={`/blogs/${blog.blogId}`} className={styles.readMore}>
              اقرأ المزيد
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
