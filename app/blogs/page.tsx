"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import blogPageStyles from "@/styles/blog/blogPageStyles";
import AddBlogButton from "@/components/blog/AddBlogButton";
import Categories from "@/components/blog/Categories";
import IsOpenModal from "@/components/blog/IsOpenModal";
import SearchBlogs from "@/components/blog/SearchBlogs";
import BlogsList from "@/components/blog/BlogsList";
import { getBlogs, addBlog } from "@/services/blog/blog.service";
import type { BlogDetail } from "@/types/blog";

const Page = () => {
  const { theme } = useTheme();
  const styles = blogPageStyles[theme];

  const [blogs, setBlogs] = useState<BlogDetail[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("الكل");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      (blog.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "الكل" || blog.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleAddBlog = async (newBlogData: Partial<BlogDetail>) => {
    try {
      const newBlog = await addBlog(newBlogData);
      setBlogs((prev) => [newBlog, ...prev]);
    } catch (error) {
      console.error("Error adding blog", error);
    }
  };

  if (loadingBlogs) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>المقالات</h1>
          <AddBlogButton />
        </div>
        <div className={styles.content}>
          <div className={styles.skeleton.search}></div>
          <div className={styles.skeleton.categories}></div>
        </div>
        <div className={styles.blogsList}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeleton.blog}></div>
          ))}
        </div>
        <IsOpenModal onAddBlog={handleAddBlog} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>المقالات</h1>
        <AddBlogButton />
      </div>
      <div className={styles.content}>
        <SearchBlogs onSearch={handleSearch} />
        <Categories
          onCategoryChange={handleCategoryChange}
          currentCategory={categoryFilter}
        />
      </div>
      <div className={styles.blogsList}>
        <BlogsList blogs={filteredBlogs} />
      </div>
      <IsOpenModal onAddBlog={handleAddBlog} />
    </div>
  );
};

export default Page;
