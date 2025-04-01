// components/Header/ProfileDropdown.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import myPhoto from "../../public/myPhoto.jpg";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-x-3 focus:outline-none"
      >
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={myPhoto}
            alt="صورة المستخدم"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="hidden text-gray-800 font-medium md:inline-block">
          فيصل أبو زكري
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-48 max-w-xs rounded-lg bg-white border border-gray-200 shadow-lg">
          <ul className="py-2">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                الملف الشخصي
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                الإعدادات
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="flex items-center gap-x-1.5 block px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <CiLogout className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
