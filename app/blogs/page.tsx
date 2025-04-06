import AddBlogButton from "@/components/blog/AddBlogButton";
import Categories from "@/components/blog/Categories";
import IsOpenModal from "@/components/blog/IsOpenModal";
import SearchBlogs from "@/components/blog/SearchBlogs";
import React from "react";
import BlogsList from "@/components/blog/BlogsList";

const page = () => {
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">z
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]">
          المقالات
        </h1>

        <AddBlogButton />
      </div>
      <div className="mb-8 space-y-6">
        <SearchBlogs />
        <Categories />
      </div>
      <div className="space-y-6 ">
        <BlogsList />

      </div>

      <IsOpenModal />
    </>
  );
};

export default page;
