"use client";
import React from "react";
import { useBlogDetails } from "@/services/useBlogDetails";
import Link from "next/link";
import photo from "../../public/myPhoto.jpg";
import { FaCalendarAlt, FaComment, FaEye, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { BlogId } from "@/types/type";
import { useTheme } from "@/context/ThemeContext";

// Extracted styles for ArticleInfo component
const articleInfoStyles = {
  light: {
    emptyContainer:
      "mx-auto max-w-6xl rounded-xl bg-white p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-2xl font-semibold text-gray-800",
    emptyText: "text-gray-600",
    emptyLink:
      "mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
    container:
      "mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm",
    headerContainer: "border-b border-gray-100 p-6 md:p-8",
    headerTop:
      "flex justify-between items-center mb-4",
    backLink:
      "p-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer",
    categoryBadge:
      "rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700",
    date:
      "flex items-center gap-1 text-sm text-gray-500",
    headerTitle:
      "mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl",
    authorSection:
      "flex items-center gap-3",
    authorImage:
      "relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-100",
    authorInfo: "",
    authorName: "font-medium text-gray-900",
    authorRole: "text-sm text-gray-500",
    metaContainer:
      "flex items-center gap-4 text-sm text-gray-500",
    metaItem: "flex items-center gap-1",
    metaIconEye: "h-4 w-4 text-gray-400",
    metaIconHeart: "h-4 w-4 text-red-400",
    metaIconComment: "h-4 w-4 text-blue-400",
    imageContainer:
      "relative h-64 w-full sm:h-80 md:h-96",
    image: "object-cover",
    contentContainer: "p-6 md:p-8",
    contentLabel: "text-2xl",
    contentText:
      "my-8 whitespace-pre-wrap leading-relaxed text-gray-700",
    tagsContainer: "mt-8 flex flex-wrap gap-2",
    tag: "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700",
  },
  dark: {
    emptyContainer:
      "mx-auto max-w-6xl rounded-xl bg-gray-800 p-8 text-center shadow-sm",
    emptyHeading: "mb-2 text-2xl font-semibold text-gray-100",
    emptyText: "text-gray-400",
    emptyLink:
      "mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
    container:
      "mx-auto max-w-6xl overflow-hidden rounded-xl bg-gray-800 shadow-sm",
    headerContainer: "border-b border-gray-700 p-6 md:p-8",
    headerTop:
      "flex justify-between items-center mb-4",
    backLink:
      "p-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 cursor-pointer",
    categoryBadge:
      "rounded-lg bg-blue-900 px-3 py-1 text-sm font-medium text-blue-300",
    date:
      "flex items-center gap-1 text-sm text-gray-400",
    headerTitle:
      "mb-6 text-3xl font-bold leading-tight text-gray-100 md:text-4xl",
    authorSection:
      "flex items-center gap-3",
    authorImage:
      "relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-300",
    authorInfo: "",
    authorName: "font-medium text-gray-100",
    authorRole: "text-sm text-gray-400",
    metaContainer:
      "flex items-center gap-4 text-sm text-gray-400",
    metaItem: "flex items-center gap-1",
    metaIconEye: "h-4 w-4 text-gray-300",
    metaIconHeart: "h-4 w-4 text-red-400",
    metaIconComment: "h-4 w-4 text-blue-300",
    imageContainer:
      "relative h-64 w-full sm:h-80 md:h-96",
    image: "object-cover",
    contentContainer: "p-6 md:p-8",
    contentLabel: "text-2xl",
    contentText:
      "my-8 whitespace-pre-wrap leading-relaxed text-gray-300",
    tagsContainer: "mt-8 flex flex-wrap gap-2",
    tag: "rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300",
  },
};

const ArticleInfo = ({ blogId }: BlogId) => {
  const { blog, likes, formatDate } = useBlogDetails(blogId);
  const { theme } = useTheme();
  const styles = articleInfoStyles[theme];

  if (!blog) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyHeading}>المقال غير موجود</h3>
        <p className={styles.emptyText}>
          لم يتم العثور على المقال المطلوب. قد يكون تم حذفه أو أن الرابط غير صحيح.
        </p>
        <Link href={"/blogs"} className={styles.emptyLink}>
          العودة للمقالات
        </Link>
      </div>
    );
  }
  return (
    <article className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTop}>
          <div className={styles.backLink}>
            <Link href={"/blogs"} className={styles.backLink}>
              <span>← العودة للمقالات</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className={styles.categoryBadge}>{blog.category}</span>
            <span className={styles.date}>
              <FaCalendarAlt className={styles.metaIconEye} />
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </div>
        <h1 className={styles.headerTitle}>{blog.title}</h1>
        <div className="flex items-center justify-between">
          <div className={styles.authorSection}>
            <div className={styles.authorImage}>
              <Image
                src={blog.author.image || photo}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className={styles.authorInfo}>
              <p className={styles.authorName}>{blog.author.name}</p>
              <p className={styles.authorRole}>كاتب ومدون</p>
            </div>
          </div>
          <div className={styles.metaContainer}>
            <span className={styles.metaItem}>
              <FaEye className={styles.metaIconEye} />
              100
            </span>
            <button className={`flex items-center gap-1 transition hover:text-red-500`}>
              <FaHeart className={styles.metaIconHeart} />
              {likes}
            </button>
            <span className={styles.metaItem}>
              <FaComment className={styles.metaIconComment} />
              10
            </span>
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={blog.imageUrl || photo}
          alt={blog.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className="prose prose-lg max-w-none">
          <span className={styles.contentLabel}>محتوى المقالة :</span>
          <div className={styles.contentText}>
            {blog.content}
          </div>
        </div>
        {blog.tags && (
          <div className={styles.tagsContainer}>
            {blog.tags.split(",").map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleInfo;
