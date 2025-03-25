"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
    >
      {children}
    </Link>
  );
};
export default NavLink;
