import CardBlog from "@/components/blog/CardBlog";
import TrendingBlogs from "@/components/blog/TrendingBlogs";
import React from "react";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-6 pb-4">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]">
          المقالات
        </h1>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg">
          <FaPlus className="w-4 h-4" />
          <span>أضف مقال</span>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* مجموعة المقالات  */}
        <div className="space-y-6 lg:col-span-2">
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
          <CardBlog />
        </div>

        {/* المقالات الرائجة */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <TrendingBlogs />
        </div>
      </div>
    </div>
  );
};

export default page;
