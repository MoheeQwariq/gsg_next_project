"use client";
import React from "react";
import { useBlogDetails } from "@/services/useBlogDetails";
import Link from "next/link";
import photo from "../../public/myPhoto.jpg";
import { FaCalendarAlt, FaComment, FaEye, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { BlogId } from "@/types/type";

const ArticleInfo = ({ blogId }: BlogId) => {
  const { blog, likes, formatDate } = useBlogDetails(blogId);
  if (!blog) {
    return (
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h3 className="mb-2 text-2xl font-semibold text-gray-800">
          المقال غير موجود
        </h3>
        <p className="text-gray-600">
          لم يتم العثور على المقال المطلوب. قد يكون تم حذفه أو أن الرابط غير
          صحيح.
        </p>
        <Link
          href={"/blogs"}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          العودة للمقالات
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="p-4">
            <Link
              href={"/blogs"}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <span>← العودة للمقالات</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {blog.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <FaCalendarAlt className="h-4 w-4 text-gray-400" />
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </div>
        <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
          {blog.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-100">
              <Image
                src={blog.author.image || photo}
                alt={blog.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-900">{blog.author.name}</p>
              <p className="text-sm text-gray-500">كاتب ومدون</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaEye className="h-4 w-4 text-gray-400" />
              100
            </span>
            <button className="flex items-center gap-1 transition hover:text-red-500">
              <FaHeart className="h-4 w-4 text-red-400" />
              {likes}
            </button>
            <span className="flex items-center gap-1">
              <FaComment className="h-4 w-4 text-blue-400" />
              10
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-80 md:h-96">
        <Image
          src={blog.imageUrl || photo}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="prose prose-lg max-w-none">
          <span className="text-2xl">محتوى المقالة :</span>
          <div className="my-8 whitespace-pre-wrap leading-relaxed text-gray-700">
            {blog.content}
          </div>
        </div>
        {blog.tags && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.split(",").map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
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
