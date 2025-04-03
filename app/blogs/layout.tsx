import TrendingBlogs from "@/components/blog/TrendingBlogs";
import React from "react";
import TopPuplishers from "@/components/blog/TopPuplishers";
const Bloglayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="order-2 lg:order-1 lg:col-span-3">{children}</div>
        <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-6 ">
            <TrendingBlogs />
            <TopPuplishers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bloglayout;
