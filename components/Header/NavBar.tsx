<<<<<<< HEAD
import Image from "next/image";
import Link from "next/link";
import React from "react";
import myPhoto from "../../public/myPhoto.jpg";
import NavLink from "./NavLink";

import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10  backdrop-blur-sm bg-[#EFEFEF] ">
=======
"use client";

import Image from "next/image";
import Link from "next/link";
import myPhoto from "../../public/myPhoto.jpg";
import NavLink from "./NavLink";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#EFEFEF]">
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-4 py-4 border-b-gray-900">
        {/* عنوان الموقع */}
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-transparent">
            حروف النازحين
          </span>
        </h1>

<<<<<<< HEAD
        {/* قوائم التنقل بين الصفحات */}
=======
        {/* القوائم */}
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869
        <nav className="flex space-x-8 rtl:space-x-reverse">
          <NavLink href="/">الصفحة الرئيسية</NavLink>
          <NavLink href="/blogs">المقالات</NavLink>
        </nav>

<<<<<<< HEAD
        {/* تسجيل الخروج و الصورة الشخصية */}
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ">
              <Image
                src={myPhoto}
                alt="فيصل أبو زكري"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden text-gray-800 font-medium md:inline-block">
              فيصل أبو زكري
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-x-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <span>تسجيل الخروج</span>
            <CiLogout className="h-4 w-4" />
          </Link>
=======
        {/* تسجيل الدخول / تسجيل الخروج */}
        <div className="flex items-center gap-x-4">
          {isLoggedIn && (
            <div className="flex items-center gap-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={myPhoto}
                  alt="فيصل أبو زكري"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-gray-800 font-medium md:inline-block">
                فيصل أبو زكري
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <span>تسجيل الخروج</span>
              <CiLogout className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-x-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <span>تسجيل الدخول</span>
              <CiLogout className="h-4 w-4" />
            </Link>
          )}
>>>>>>> 8c676f440b1f38fceee37d9a5826f264a54cf869
        </div>
      </div>
    </header>
  );
};

export default NavBar;
