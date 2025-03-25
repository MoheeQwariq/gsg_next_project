import CardBlog from "@/components/blog/CardBlog";
import Categories from "@/components/blog/Categories";
import TrendingBlogs from "@/components/blog/TrendingBlogs";
import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

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
      <div className="mb-8 space-y-6">
        {/* البحث عن مقالات */}
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 rtl:left-0 rtl:right-auto rtl:pl-3">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="ابحث عن مقال"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-10 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 "
          />
        </div>

        {/* مجموعة تصنيفات المقالات */}
        <Categories />
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
