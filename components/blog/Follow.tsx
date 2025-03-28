"use client";
import React from "react";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
const Follow = () => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  return (
    <button
      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer"
      onClick={() => setIsFollowing(!isFollowing)}
    >
      <span>
        {" "}
        {isFollowing ? (
          <span className="flex items-center gap-2">
            <SlUserFollow className="w-4 h-4" /> متابعة
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <SlUserFollowing className="w-4 h-4" /> أتابع
          </span>
        )}
      </span>
    </button>
  );
};

export default Follow;
