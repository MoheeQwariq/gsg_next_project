import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSections from "../../components/profile/ProfileSections";
import ProfileArticles from "../../components/profile/ProfileArticles";

export default function ProfilePage() {
  const user = {
    id: 1,
    name: "فيصل أبو زكري",
    bio: "كاتب ومطور شغوف. أحب استكشاف التقنيات الجديدة.",
    avatarUrl: "/myPhoto.jpg",
    coverUrl: "/myPhoto.jpg",
  };

  const articles = [
    {
      id: 1,
      title: "Next.js 13 استكشاف",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 42,
      commentsCount: 10,
    },
    {
      id: 2,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 3,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 4,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 5,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 6,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },   {
      id: 7,
      title: "Next.js 13 استكشاف",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 42,
      commentsCount: 10,
    },
    {
      id: 8,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 9,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 10,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 11,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 12,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },   {
      id: 13,
      title: "Next.js 13 استكشاف",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 42,
      commentsCount: 10,
    },
    {
      id: 14,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 15,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 16,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 16,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },  {
      id: 17,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },
    {
      id: 18,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },{
      id: 19,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },{
      id: 20,
      title: "TypeScript فهم",
      imageUrl: "/myPhoto.jpg",
      content: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      likes: 30,
      commentsCount: 5,
    },
  ];

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]">
          الملف الشخصي
        </h1>
      </div>
      <ProfileHeader user={user} isOwner={true} />

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5] text-right">نبذة عن المستخدم</h2>
        <ProfileSections />
      </div>

      <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5] text-right">مقالات المستخدم</h2>
        <ProfileArticles articles={articles} />
      </div>
    </>
  );
}
