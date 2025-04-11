"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import photo from "../../public/myPhoto.jpg";
import {
  FaCalendarAlt,
  FaComment,
  FaEye,
  FaHeart,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import Image from "next/image";
import type { BlogDetail } from "@/types/blog";
import { useTheme } from "@/context/ThemeContext";
import articleInfoStyles from "@/styles/blog/blogDetailsStyles";
import { formatDate } from "@/utils/formateDate";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addLoveToBlog } from "@/services/blog/comment.service";
import { deleteBlog } from "@/services/blog/blog.service";
import EditBlogModal from "./EditBlogModal";

interface ArticleInfoProps {
  blog: BlogDetail | null;
}

const ArticleInfo: React.FC<ArticleInfoProps> = ({ blog }) => {
  const { theme } = useTheme();
  const styles = articleInfoStyles[theme];
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const [localBlog, setLocalBlog] = useState<BlogDetail | null>(blog);
  const [loveCount, setLoveCount] = useState<number>(blog?.like || 0);
  const [isLoved, setIsLoved] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  if (!localBlog) {
    return (
      <div className={styles.emptyContainer}>
        <h3 className={styles.emptyHeading}>المقال غير موجود</h3>
        <p className={styles.emptyText}>
          لم يتم العثور على المقال المطلوب. قد يكون تم حذفه أو أن الرابط غير
          صحيح.
        </p>
        <Link href={"/blogs"} className={styles.emptyLink}>
          العودة للمقالات
        </Link>
      </div>
    );
  }

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked-${localBlog.blogId}`);
    setIsLoved(likedStatus === "true");
  }, [localBlog.blogId]);

  const handleToggleLove = async () => {
    try {
      if (isLoved) {
        await addLoveToBlog(localBlog.blogId, "unlike");
        setLoveCount((prevCount) => prevCount - 1);
        setIsLoved(false);
        localStorage.setItem(`liked-${localBlog.blogId}`, "false");
      } else {
        // If  liked, call "like", then increase the count.
        await addLoveToBlog(localBlog.blogId, "like");
        setLoveCount((prevCount) => prevCount + 1);
        setIsLoved(true);
        localStorage.setItem(`liked-${localBlog.blogId}`, "true");
      }
    } catch (error) {
      console.error("Error toggling love to blog:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("هل أنت متأكد أنك تريد حذف المقال؟")) return;
    try {
      await deleteBlog(localBlog.blogId);
      router.push("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditClick = () => {
    console.log("Edit button clicked – opening modal");
    setIsEditOpen(true);
  };

  const isAuthor = isLoggedIn && user.id === localBlog.author.id;
  console.log("Is Author:", isAuthor);

  return (
    <>
      <article className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTop}>
            <div className={styles.backLink}>
              <Link href={"/blogs"} className={styles.backLink}>
                <span>← العودة للمقالات</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className={styles.categoryBadge}>{localBlog.category}</span>
              <span className={styles.date}>
                <FaCalendarAlt className={styles.metaIconEye} />
                {formatDate(localBlog.createdAt)}
              </span>
            </div>
          </div>
          <h1 className={styles.headerTitle}>{localBlog.title}</h1>
          <div className="flex items-center justify-between">
            <div className={styles.authorSection}>
              <div className={styles.authorImage}>
                <Image
                  src={localBlog.author.image || photo}
                  alt={localBlog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{localBlog.author.name}</p>
                <p className={styles.authorRole}>كاتب ومدون</p>
              </div>
            </div>
            <div className={styles.metaContainer}>
              <span className={styles.metaItem}>
                <FaEye className={styles.metaIconEye} />
                100
              </span>

              {isLoggedIn ? (
                <button
                  onClick={handleToggleLove}
                  className={`flex items-center gap-1 transition ${
                    isLoved ? "text-red-500" : "text-gray-500"
                  }`}
                  title={isLoved ? "إزالة الاعجاب" : "أضف إعجاب"}
                >
                  <FaHeart
                    className={`${styles.metaIconHeart} ${
                      isLoved ? "text-red-500" : "text-gray-500"
                    }`}
                  />
                  {loveCount}
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <FaHeart className={styles.metaIconHeart} />
                  {loveCount}
                </div>
              )}

              <span className={styles.metaItem}>
                <FaComment className={styles.metaIconComment} />
                {blog?.commentsCount || 0}
              </span>

              {isAuthor && (
                <div className="flex items-center gap-3 ml-4">
                  <button
                    onClick={handleEditClick}
                    title="تعديل المقال"
                    className="transition hover:text-blue-600"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    title="حذف المقال"
                    className="transition hover:text-red-600"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={localBlog.imageUrl || photo}
            alt={localBlog.title}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.contentContainer}>
          <div className="prose prose-lg max-w-none">
            <span className={styles.contentLabel}>محتوى المقالة :</span>
            <div className={styles.contentText}>{localBlog.content}</div>
          </div>
          {localBlog.tags && (
            <div className={styles.tagsContainer}>
              {localBlog.tags.split(",").map((tag, index) => (
                <span key={index} className={styles.tag}>
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {isEditOpen && (
        <EditBlogModal
          blog={localBlog}
          onClose={() => setIsEditOpen(false)}
          onBlogEdited={(updatedBlog) => {
            setLocalBlog(updatedBlog);
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
};

export default ArticleInfo;
