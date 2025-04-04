"use client";

import React from "react";
import { usePathname } from "next/navigation";

import AdminNavbar from './AdminNavbar';
import GeneralNavbar from './GeneralNavbar';

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }
  //TODO: here we need more validation to check if the user is admin  
  if (pathname.startsWith("/admin")) {
    return <AdminNavbar />;
  }
  return <GeneralNavbar />;
}
