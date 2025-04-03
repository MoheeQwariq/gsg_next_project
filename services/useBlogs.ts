import { BlogDetail } from "@/types/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogDetail[]>([]);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  useEffect(() => {
    try {
      const storedBlogs = localStorage.getItem("articles");
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs);
        if (categoryFilter && categoryFilter !== "الكل") {
          const filteredBlogs = parsedBlogs.filter(
            (blog: BlogDetail) => blog.category === categoryFilter
          );
          setBlogs(filteredBlogs);
        } else {
          setBlogs(parsedBlogs);
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [categoryFilter]);
  return { blogs, categoryFilter };
};
