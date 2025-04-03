import React from "react";
import TrendingBlog from "./TrendingBlog";
const TrendingBlogs = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 border-b border-gray-100 pb-2 text-xl font-bold text-gray-900">
        المقالات الرائجة
      </h3>
      <div className="space-y-4">
        <TrendingBlog />
        <TrendingBlog />
        <TrendingBlog />
      </div>
    </div>
  );
};

export default TrendingBlogs;
