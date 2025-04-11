"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegClock, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import myPhoto from "@/public/myPhoto.jpg";
import { getUser } from "@/services/user/user.service";
import { defaultUser, type User } from "@/types/user";
import type { Comment as CommentType } from "@/types/comment";
import { addLoveToComment } from "@/services/blog/comment.service";

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
    deleteButton:
      "flex items-center gap-1 text-xs text-red-500 transition hover:text-red-700",
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
    deleteButton:
      "flex items-center gap-1 text-xs text-red-400 transition hover:text-red-600",
  },
};

interface CommentProps {
  comment: CommentType;
  canDelete?: boolean;
  onDelete?: (commentId: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, canDelete, onDelete }) => {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  const styles = commentStyles[theme];

  const [author, setAuthor] = useState<User>(defaultUser);
  const [hasLoved, setHasLoved] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  useEffect(() => {
    let isMounted = true;
    async function fetchAuthor() {
      try {
        const fetchedUser = await getUser(comment.authorId);
        if (isMounted) setAuthor(fetchedUser);
      } catch (error) {
        console.error("Error fetching comment's author by id:", error);
        
        if (comment.userEmail) {
          const username = comment.authorEmail.split("@")[0];
          try {
            const fetchedUserByUsername = await getUserByUsername(username);
            if (isMounted) setAuthor(fetchedUserByUsername);
          } catch (usernameError) {
            console.error("Error fetching comment's author by username:", usernameError);
          }
        }
      }
    }
    fetchAuthor();
    return () => {
      isMounted = false;
    };
  }, [comment.authorId, comment.authorEmail]);
  

  const handleToggleLove = async () => {
    try {
      const updatedComment = await addLoveToComment(comment.id);
      setLikes(updatedComment.likes);
      setHasLoved((prev) => !prev);
    } catch (error) {
      console.error("Error toggling love for comment:", error);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment.id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.commentWrapper}>
        <div className="flex gap-4">
          <div className={styles.imageWrapper}>
            <Image
              src={author.imageUrl || myPhoto}
              alt={`Avatar of ${author.name || `User ${comment.authorId}`}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h4 className={styles.name}>
                {author.name || `User ${comment.authorId}`}
              </h4>
              <span className={styles.time}>
                <FaRegClock className="h-3 w-3" />
                {comment.createdAt}
              </span>
            </div>
            <p className={styles.text}>{comment.content}</p>
            <div className="mt-3 flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  className={styles.likeButton}
                  onClick={handleToggleLove}
                  title={hasLoved ? "Remove Love" : "Add Love"}
                >
                  <FaHeart className="h-3 w-3" />
                  <span>{likes}</span>
                </button>
              ) : (
                <div className={styles.likeButton}>
                  <FaHeart className="h-3 w-3" />
                  <span>{likes}</span>
                </div>
              )}
              {canDelete && (
                <button
                  className={styles.deleteButton}
                  onClick={handleDelete}
                  title="Delete Comment"
                >
                  <FaTrash className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
