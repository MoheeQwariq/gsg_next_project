"use client";
import React, { useEffect, useState, FC } from "react";
import { useParams } from "next/navigation";
import SocialMedia from "@/components/blog/SocialMedia";
import UserCard from "@/components/profile/UserCard";
import Comments from "@/components/blog/Comments";
import type { BlogDetail } from "@/types/blog";
import { defaultUser, type User } from "@/types/user";
import { getBlog } from "@/services/blog/blog.service";
import { getUser } from "@/services/user/user.service";
import {
  getBlogComments,
  addComment,
  deleteComment,
} from "@/services/blog/comment.service";
import type { Comment, CommentData } from "@/types/comment";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import ArticleInfo from "@/components/blog/ArticleInfo";
import { useAuth } from "@/context/AuthContext";

const Page: FC = () => {
  const { blogId } = useParams() as { blogId: string };
  const { theme } = useTheme();
  const { user } = useAuth();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [userOwner, setUser] = useState<User>(defaultUser);
  // Initialize comments as an empty array.
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogAndUser = async () => {
      try {
        const blogData = await getBlog(blogId);
        console.log("Blog data:", blogData);
        setBlog(blogData);
        const userData = await getUser(blogData.author.id);
        setUser(userData);
        console.log("User data:", userData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "حدث خطأ أثناء جلب البيانات");
        } else {
          setError("حدث خطأ أثناء جلب البيانات");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndUser();
  }, [blogId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Here we expect the API to return an object with a "data" property
        const response = await getBlogComments(blogId);
        // Extract the array of comments from the response
        setComments(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching comments:", error.message);
        } else {
          console.error("Error fetching comments");
        }
      }
    };

    fetchComments();
  }, [blogId]);

  const stylesObj = {
    light: {
      userCard: {
        card: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm p-4",
        headerCard: "flex items-center gap-x-4",
        avatarContainer: "relative h-12 w-12 overflow-hidden rounded-full",
        image: "object-cover",
        nameText: "text-lg font-bold text-gray-900",
        emailText: "text-sm text-gray-600",
      },
      errorContainer:
        "rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center",
      errorText: "text-gray-800",
    },
    dark: {
      userCard: {
        card: "overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm p-4",
        headerCard: "flex items-center gap-x-4",
        avatarContainer: "relative h-12 w-12 overflow-hidden rounded-full",
        image: "object-cover",
        nameText: "text-lg font-bold text-gray-100",
        emailText: "text-sm text-gray-300",
      },
      errorContainer:
        "rounded-xl border border-gray-700 bg-gray-800 shadow-sm p-8 text-center",
      errorText: "text-gray-100",
    },
  };

  const skeletonStyles = {
    light: {
      userCard: "animate-pulse h-12 w-48 bg-gray-200 rounded-lg",
      socialMedia: "animate-pulse h-8 w-24 bg-gray-200 rounded-lg",
      articleInfo: "animate-pulse h-64 w-full bg-gray-200 rounded-lg mb-4",
      comments: "animate-pulse h-40 w-full bg-gray-200 rounded-lg",
    },
    dark: {
      userCard: "animate-pulse h-12 w-48 bg-gray-700 rounded-lg",
      socialMedia: "animate-pulse h-8 w-24 bg-gray-700 rounded-lg",
      articleInfo: "animate-pulse h-64 w-full bg-gray-700 rounded-lg mb-4",
      comments: "animate-pulse h-40 w-full bg-gray-700 rounded-lg",
    },
  };

  const userCardStyles = stylesObj[theme].userCard;
  const errorContainer = stylesObj[theme].errorContainer;
  const errorText = stylesObj[theme].errorText;
  const skeleton = skeletonStyles[theme];

  const userForCard = {
    imageUrl: userOwner.imageUrl,
    name: userOwner.name,
    email: userOwner.email,
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-between mb-4">
          <div className={skeleton.userCard} />
          <div className={skeleton.socialMedia} />
        </div>
        <div className={skeleton.articleInfo} />
        <div className={skeleton.comments} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={errorContainer}>
        <h1 className="text-2xl font-bold mb-2 text-red-500">خطأ</h1>
        <p className={errorText}>حدث خطأ أو المقال غير موجود</p>
        <Link
          href="/blogs"
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          العودة للمقالات
        </Link>
      </div>
    );
  }

  const handleAddComment = async (commentData: CommentData) => {
    try {
      const response = await addComment(blogId, commentData, user.email);
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding comment:", error.message);
      } else {
        console.error("Error adding comment");
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(blogId, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting comment:", error.message);
      } else {
        console.error("Error deleting comment");
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <UserCard user={userForCard} styles={userCardStyles} />
        <SocialMedia />
      </div>
      <div>
        <ArticleInfo blog={blog} />
        <Comments
          comments={comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
};

export default Page;
