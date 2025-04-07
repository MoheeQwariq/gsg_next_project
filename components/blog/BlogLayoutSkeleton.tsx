"use client";
import React from "react";

const BlogLayoutSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content Skeleton */}
        <div className="order-2 lg:order-1 lg:col-span-3 space-y-4">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        {/* Sidebar Skeleton */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start space-y-6">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogLayoutSkeleton;
