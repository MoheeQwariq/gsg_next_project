import React from "react";
import { FaHome, FaNewspaper, FaTachometerAlt } from "react-icons/fa";

const generalNavItems = [
  {
    name: "الصفحة الرئيسية",
    href: "/",
    icon: React.createElement(FaHome, { className: "text-blue-500" }),
  },
  {
    name: "المقالات",
    href: "/blogs",
    icon: React.createElement(FaNewspaper, { className: "text-green-500" }),
  },
  {
    name: "لوحة التحكم",
    href: "/dashboard",
    icon: React.createElement(FaTachometerAlt, { className: "text-purple-500" }),
  },
];

export default generalNavItems;
