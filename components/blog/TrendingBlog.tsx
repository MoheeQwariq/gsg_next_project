import Image from "next/image";
import React from "react";
import myPhoto from "@/public/myPhoto.jpg";
import Link from "next/link";
const TrendingBlog = () => {
  return (
    <Link
      href="#"
      className="group flex gap-3 rounded-lg p-2 transition hover:bg-gray-50"
    >
      {/* Blog thumbnail */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={myPhoto}
          alt="عنوان المقالة"
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Blog content */}
      <div className="flex flex-col">
        <h4 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
          عنوان المقالة الرائجة هنا يمكن أن يكون طويلاً
        </h4>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={myPhoto}
                alt="فيصل أبو زكري"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs text-gray-600">فيصل أبو زكري</span>
          </div>
          <span className="text-xs text-gray-500">قبل 3 أيام</span>
        </div>
      </div>
    </Link>
  );
};

export default TrendingBlog;
