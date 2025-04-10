import { useEffect, useState } from "react";
import { BlogDetail } from "@/types/blog";

export const useBlogDetails = (blogId: string) => {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [likes, setLikes] = useState<number>(0);

  const fetchBlog = () => {
    try {
      const storedBlogs = localStorage.getItem("articles");
      if (storedBlogs) {
        const parsedBlogs = JSON.parse(storedBlogs);
        const foundBlog = parsedBlogs.find(
          (b: BlogDetail) => b.blogId === blogId
        );
        if (foundBlog) {
          setBlog(foundBlog);
        }
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  useEffect(() => {
    fetchBlog();
    const storedLikes = localStorage.getItem(`likes-${blogId}`);
    setLikes(storedLikes ? parseInt(storedLikes, 10) : 0);
  }, [blogId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return { blog, likes, formatDate };
};
