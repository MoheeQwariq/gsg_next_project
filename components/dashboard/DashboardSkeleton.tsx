"use client";

import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
      <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
      <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
      <div className="h-6 bg-gray-200 w-2/3 rounded"></div>
    </div>
  );
}
