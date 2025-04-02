"use client";

import React from "react";
import Image from "next/image";
import { FaPhone, FaEnvelope } from "react-icons/fa";

type User = {
  id: number;
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  phone?: string;
  email?: string;
};

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" dir="rtl">
      {user.coverUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={user.coverUrl}
            alt="صورة الغلاف"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="relative p-6">
        <div className="absolute -top-12 right-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
            <Image
              src={user.avatarUrl}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-12 text-right">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="mt-2 text-gray-600 text-right">{user.bio}</p>
          {(user.phone || user.email) && (
            <div className="mt-4 flex flex-col items-end text-sm text-gray-500">
              {user.phone && (
                <div className="flex items-center gap-1">
                  <FaPhone className="text-blue-500" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-1">
                  <FaEnvelope className="text-green-500" />
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
