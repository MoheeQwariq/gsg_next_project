"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface LikesCounterProps {
  blogId: string;
}

const LikesCounter = ({ blogId }: LikesCounterProps) => {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const storedLikes = localStorage.getItem(`likes-${blogId}`);
    const likedStatus = localStorage.getItem(`liked-${blogId}`);

    if (storedLikes) {
      setLikes(Number(storedLikes));
    }
    if (likedStatus === "true") {
      setLiked(true);
    }
  }, [blogId]);

  const handleLike = () => {
    if (liked) {
      const newLikes = likes - 1;
      setLikes(newLikes);
      setLiked(false);
      localStorage.setItem(`likes-${blogId}`, newLikes.toString());
      localStorage.setItem(`liked-${blogId}`, "false");
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setLiked(true);
      localStorage.setItem(`likes-${blogId}`, newLikes.toString());
      localStorage.setItem(`liked-${blogId}`, "true");
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 transition ${
        liked ? "text-red-500" : "text-gray-500"
      }`}
    >
      <FaHeart
        className={`h-4 w-4 ${liked ? "text-red-400" : "text-gray-400"}`}
      />
      {likes}
    </button>
  );
};

export default LikesCounter;
