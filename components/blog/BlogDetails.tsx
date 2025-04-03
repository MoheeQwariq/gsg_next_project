import React from "react";
import Comments from "./Comments";
import ArticleInfo from "./ArticleInfo";
import { BlogId } from "@/types/type";

const BlogDetails = ({ blogId }: BlogId) => {
  return (
    <>
      <ArticleInfo blogId={blogId} />
      <Comments />
    </>
  );
};

export default BlogDetails;
