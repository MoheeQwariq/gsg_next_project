import CardBlog from "@/components/blog/CardBlog";
import TrendingBlogs from "@/components/blog/TrendingBlogs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <TrendingBlogs />
      <CardBlog />
    </div>
  );
};

export default page;
