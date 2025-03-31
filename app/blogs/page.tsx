<<<<<<< HEAD
import AddBlogButton from "@/components/blog/AddBlogButton";
import CardBlog from "@/components/blog/CardBlog";
import Categories from "@/components/blog/Categories";
import IsOpenModal from "@/components/blog/IsOpenModal";
import SearchBlogs from "@/components/blog/SearchBlogs";
import React from "react";
=======
import CardBlog from "@/components/blog/CardBlog";
import Categories from "@/components/blog/Categories";
import SearchBlogs from "@/components/blog/SearchBlogs";
import React from "react";
import { FaPlus } from "react-icons/fa";
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869

const page = () => {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]">
          المقالات
        </h1>
<<<<<<< HEAD
        <AddBlogButton />
=======
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer">
          <FaPlus className="w-4 h-4" />
          <span>أضف مقال</span>
        </button>
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869
      </div>
      <div className="mb-8 space-y-6">
        <SearchBlogs />
        <Categories />
      </div>
      <div className="space-y-6 ">
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
<<<<<<< HEAD
      <IsOpenModal />
=======
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869
    </>
  );
};

export default page;
