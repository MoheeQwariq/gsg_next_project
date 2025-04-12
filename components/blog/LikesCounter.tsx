"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { addLoveToBlog } from "@/services/blog/comment.service";

interface LikesCounterProps {
  blogId: string;
  likes: number;
}

const LikesCounter = ({ blogId, likes }: LikesCounterProps) => {
  // Initialize the count with the value that comes from props.
  const [likesCount, setLikesCount] = useState<number>(likes);
  // Use local storage only to store the liked status.
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked-${blogId}`);
    setLiked(likedStatus === "true");
  }, [blogId]);

  const handleLike = async () => {
    try {
      if (liked) {
        // Call API to remove like, then decrement the count.
        await addLoveToBlog(blogId, "unlike");
        setLikesCount((prev) => prev - 1);
        setLiked(false);
        localStorage.setItem(`liked-${blogId}`, "false");
      } else {
        // Call API to add like, then increment the count.
        await addLoveToBlog(blogId, "like");
        setLikesCount((prev) => prev + 1);
        setLiked(true);
        localStorage.setItem(`liked-${blogId}`, "true");
      }
    } catch (error) {
      console.error("Error updating love to blog:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 transition ${
        liked ? "text-red-500" : "text-gray-500"
      }`}
      title={liked ? "إزالة الاعجاب" : "أضف إعجاب"}
    >
      <FaHeart className={`h-4 w-4 ${liked ? "text-red-400" : "text-gray-400"}`} />
      {likesCount}
    </button>
  );
};

export default LikesCounter;
