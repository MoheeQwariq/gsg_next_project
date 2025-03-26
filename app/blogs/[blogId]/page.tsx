import React from "react";

import BlogDetails from "@/components/blog/BlogDetails";
import SocialMedia from "@/components/blog/SocialMedia";
import User from "@/components/blog/User";
const page = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between ">
        <User />
        <SocialMedia />
      </div>

      <div>
        <BlogDetails />
      </div>
    </div>
  );
};

export default page;
