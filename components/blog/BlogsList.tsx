"use client";
import CardBlog from "./CardBlog";
import { useBlogs } from "@/services/useBlogs";

const BlogsList = () => {
  const { blogs, categoryFilter } = useBlogs();

  if (blogs.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          لا توجد مقالات
        </h3>
        <p className="text-gray-600">
          {categoryFilter && categoryFilter !== "الكل"
            ? `لا توجد مقالات في تصنيف "${categoryFilter}"`
            : "لم يتم إضافة أي مقالات بعد. كن أول من يضيف مقالاً!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <CardBlog key={blog.blogId || blog.title} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsList;
