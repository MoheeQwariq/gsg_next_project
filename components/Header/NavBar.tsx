import React from "react";
import NavLink from "./NavLink";
import ProfileDropdown from "./ProfileDropdown"; 

const NavBar = () => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#EFEFEF]">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-4 py-4 border-b-gray-900">
        {/* عنوان الموقع */}
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-transparent">
            حروف النازحين
          </span>
        </h1>

        {/* قوائم التنقل بين الصفحات */}
        <nav className="flex space-x-8 rtl:space-x-reverse">
          <NavLink href="/">الصفحة الرئيسية</NavLink>
          <NavLink href="/blogs">المقالات</NavLink>
        </nav>

        {/* استخدم القائمة المنسدلة للملف الشخصي */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default NavBar;