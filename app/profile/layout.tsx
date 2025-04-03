import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="order-1 lg:col-span-3">{children}</div>
        <div className="order-2 lg:sticky lg:top-24 lg:self-start">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
