import React from "react";
import TrendingBlog from "./TrendingBlog";
const TrendingBlogs = () => {
  return (
    <div className=" bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 p-6 w-full max-w-md ">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        المقالات الرائجة
      </h3>
      <div>
        <TrendingBlog />
      </div>
    </div>
  );
};

export default TrendingBlogs;
