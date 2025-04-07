"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import blogPageStyles from "@/styles/blog/blogPageStyles";
import AddBlogButton from "@/components/blog/AddBlogButton";
import Categories from "@/components/blog/Categories";
import IsOpenModal from "@/components/blog/IsOpenModal";
import SearchBlogs from "@/components/blog/SearchBlogs";
import BlogsList from "@/components/blog/BlogsList";

const Page = () => {
  const { theme } = useTheme();
  const styles = blogPageStyles[theme];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>المقالات</h1>
        <AddBlogButton />
      </div>
      <div className={styles.content}>
        <SearchBlogs />
        <Categories />
      </div>
      <div className={styles.blogsList}>
        <BlogsList />
      </div>
      <IsOpenModal />
    </div>
  );
};

export default Page;
