import Image from "next/image";
import React from "react";
import { PiChatDots } from "react-icons/pi";
import photo from "../../public/myPhoto.jpg";
import Link from "next/link";
import { BlogDetail } from "@/types/type";
import LikesCounter from "./LikesCounter";
import { formatDate } from "@/services/formateDate";

const CardBlog = ({ blog }: { blog: BlogDetail }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Link href={`/blogs/${blog.blogId}`} className="block">
          <div className="relative h-60 w-full md:h-full">
            <Image
              src={blog.imageUrl || photo}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="flex flex-col p-5 md:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {blog.category}
            </span>
            <span className="text-xs text-gray-500">
              {" "}
              {formatDate(blog.createdAt)}{" "}
            </span>
          </div>

          <h2 className="mb-2 text-xl font-bold text-gray-900">{blog.title}</h2>

          <p className="mb-4 text-gray-600">
            {blog.content.length > 150
              ? blog.content.substring(0, 150) + "..."
              : blog.content}
          </p>

          <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image
                  src={blog.author.image || photo}
                  alt={blog.author.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                />
                <span className="font-medium text-gray-900">
                  {" "}
                  {blog.author.name}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <LikesCounter blogId={blog.blogId} />

                <Link href={`/blogs/${blog.blogId}`}>
                  <div className="flex items-center gap-1 transition-colors hover:text-blue-600">
                    <PiChatDots
                      className="text-blue-500 cursor-pointer"
                      size={20}
                    />
                    <span>1</span>
                  </div>
                </Link>
              </div>
            </div>

            <Link
              href={`/blogs/${blog.blogId}`}
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
