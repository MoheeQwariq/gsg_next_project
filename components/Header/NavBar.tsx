import Image from "next/image";
import Link from "next/link";
import React from "react";
import myPhoto from "../../public/myPhoto.jpg";
import NavLink from "./NavLink";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 shadow-md">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-6 py-4">
        {/* موقع العنوان */}
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-transparent">
            حروف النازحين
          </span>
        </h1>

        {/* قوائم التنقل بين الصفحات */}
        <nav className="hidden md:flex space-x-8 rtl:space-x-reverse text-lg font-medium">
          <NavLink href="/">الصفحة الرئيسية</NavLink>
          <NavLink href="/blogs">المقالات</NavLink>
        </nav>

        {/* تسجيل الخروج و الصورة الشخصية */}
        <div className="flex items-center gap-x-5">
          {/* صورة المستخدم */}
          <div className="flex items-center gap-x-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[rgb(49,54,219)] shadow-lg">
              <Image
                src={myPhoto}
                alt="فيصل أبو زكري"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden md:inline-block text-gray-800 font-semibold">
              فيصل أبو زكري
            </span>
          </div>

          {/* زر تسجيل الخروج */}
          <Link
            href="/"
            className="flex items-center gap-x-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-200 hover:scale-105"
          >
            <span>تسجيل الخروج</span>
            <CiLogout className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};


export default NavBar;