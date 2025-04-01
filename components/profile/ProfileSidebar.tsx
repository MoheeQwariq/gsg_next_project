import React from "react";
import ProfileStats from "./ProfileStats";
import ProfileInteractions from "./ProfileInteractions";

const ProfileSidebar = () => {
  const stats = {
    totalArticles: 2,
    totalLikes: 72,
    totalComments: 15,
  };

  const interactions = [
    { id: 1, type: "comment", content: "تعليق رائع", articleId: 1 },
    { id: 2, type: "like", articleId: 2 },
  ];

  return (
    <div className="space-y-6">
      <ProfileStats stats={stats} />
      <ProfileInteractions interactions={interactions} />
    </div>
  );
};

export default ProfileSidebar;
