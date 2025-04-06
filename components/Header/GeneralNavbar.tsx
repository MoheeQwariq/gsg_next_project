"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import generalNavItems from "@/constant/generalNavItems";
import generalNavbarStyles from "@/styles/generalNavbarStyles";
import { useTheme } from "@/context/ThemeContext";

export default function GeneralNavbar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const styles = generalNavbarStyles[theme];
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const getItemClasses = (href: string, isMobile = false) => {
    let classString = `${styles.itemBase} ${
      isMobile ? styles.spacingMobile : styles.spacingDesktop
    }`;

    if (pathname === href) {
      classString += ` ${styles.activeItem}`;
    } else {
      classString += ` ${styles.inactiveItem}`;
    }

    return classString;
  };

  return (
    <nav className={styles.navContainer}>
      <div className={styles.mainWrapper}>
        <div className={styles.navRow}>
          <Link href="/" className={styles.brand}>
            حروف النازحين
          </Link>

          <div className={styles.desktopNav}>
            {generalNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className={getItemClasses(item.href, false)}>
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
          {generalNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className={getItemClasses(item.href, true)}>
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
      )}
    </nav>
  );
}
