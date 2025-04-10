import { BlogDetail } from "@/types/blog";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogDetail[]>([]);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    try {
      const storedBlogs = localStorage.getItem("articles");
      if (storedBlogs) {
        let parsedBlogs: BlogDetail[] = JSON.parse(storedBlogs);

        if (categoryFilter && categoryFilter !== "الكل") {
          parsedBlogs = parsedBlogs.filter(
            (blog) => blog.category === categoryFilter
          );
        }

        if (searchQuery) {
          parsedBlogs = parsedBlogs.filter(
            (blog) =>
              blog.title.toLowerCase().includes(searchQuery) ||
              blog.content.toLowerCase().includes(searchQuery)
          );
        }

        setBlogs(parsedBlogs);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [categoryFilter, searchQuery]);

  return { blogs, categoryFilter };
};
