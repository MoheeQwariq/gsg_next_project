import React from "react";
import { FaChartBar, FaUsers, FaBook } from "react-icons/fa";

const adminNavItems = [
  {
    name: "لوحة التحكم",
    href: "/admin",
    icon: React.createElement(FaChartBar, { className: "text-amber-400" }),
  },
  {
    name: "المستخدمون",
    href: "/admin/Users",
    icon: React.createElement(FaUsers, { className: "text-blue-400" }),
  },
  {
    name: "القصص",
    href: "/admin/stories",
    icon: React.createElement(FaBook, { className: "text-purple-500" }),
  },
];

export default adminNavItems;
