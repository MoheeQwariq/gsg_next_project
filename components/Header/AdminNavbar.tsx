"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import adminNavItems from "@/constant/adminNavItems";
import adminNavbarStyles from "@/styles/adminNavbarStyles";
import { useTheme } from "@/context/ThemeContext";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const styles = adminNavbarStyles[theme];
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const getDesktopItemClasses = (href: string) => {
    const base = styles.desktopItemBase;
    if (pathname === href) {
      return `${base} ${styles.desktopActive}`;
    }
    return `${base} ${styles.desktopInactive}`;
  };

  const getMobileItemClasses = (href: string) => {
    const base = styles.mobileItemBase;
    if (pathname === href) {
      return `${base} ${styles.mobileActive}`;
    }
    return `${base} ${styles.mobileInactive}`;
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.wrapper}>
        <div className={styles.navRow}>
          <Link href="/admin" className={styles.brand}>
            <span className="ml-2">🚀</span>
            <span>لوحة الأدمن</span>
          </Link>

          <div className={styles.desktopNav}>
            {adminNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={getDesktopItemClasses(item.href)}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}

            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link href="/auth/login" className={styles.loginDesktop}>
                تسجيل الدخول
              </Link>
            )}
          </div>

          <button onClick={toggleMobileMenu} className={styles.mobileToggle}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenuContainer}>
          <div className={styles.mobileItemsWrapper}>
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className={getMobileItemClasses(item.href)}>
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}

            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link
                href="/auth/login"
                className={styles.loginMobile}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
