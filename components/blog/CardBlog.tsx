"use client";

import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { PiChatDots } from "react-icons/pi";
import Link from "next/link";
import type { Article } from "@/types/blog";

interface CardBlogProps {
  article: Article;
}

const CardBlog: React.FC<CardBlogProps> = ({ article }) => {
  const articleLink = `/blogs/${article.id}`;
  const category = article.category || "الصنف";
  const createdAt = article.createdAt || "قبل 12 ساعة";
  const excerpt =
    article.content.length > 100
      ? article.content.slice(0, 100) + "..."
      : article.content;
  const authorName = article.author?.name || "المؤلف";
  const authorAvatar = article.author?.avatarUrl || "/default-author.jpg";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Link href={articleLink} className="block">
          <div className="relative h-60 w-full md:h-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="flex flex-col p-5 md:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {category}
            </span>
            <span className="text-xs text-gray-500">{createdAt}</span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-gray-900">
            {article.title}
          </h2>

          <p className="mb-4 text-gray-600">{excerpt}</p>

          <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                  src={authorAvatar}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                />
                <span className="font-medium text-gray-900">
                  {authorName}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 transition-colors hover:text-red-600">
                  <CiHeart className="text-red-500 cursor-pointer" size={20} />
                  <span>{article.likes}</span>
                </div>

                <Link href={articleLink}>
                  <div className="flex items-center gap-1 transition-colors hover:text-blue-600">
                    <PiChatDots
                      className="text-blue-500 cursor-pointer"
                      size={20}
                    />
                    <span>{article.commentsCount}</span>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href={articleLink}
              className="mt-4 block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:from-blue-700 hover:to-indigo-700"
            >
              اقرأ المزيد
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;
