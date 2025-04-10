"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import profileDropdownStyles from "@/styles/profileDropdownStyles";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const styles = profileDropdownStyles[theme];

  return (
    <div
      className={styles.container}
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button onClick={() => setOpen((prev) => !prev)} className={styles.button}>
        <div className={styles.imageWrapper}>
          <Image
            src={user.imageUrl || "/user.svg"}
            alt="صورة المستخدم"
            width={40}
            height={40}
            className={styles.image}
          />
        </div>
        <span className={styles.userName}>{user.name}</span>
      </button>
      {open && (
        <div className={styles.dropdown}>
          <ul className={styles.dropdownList}>
            <li>
              <Link
                href={`/profile/${user.username}`}
                onClick={() => setOpen(false)}
                className={styles.dropdownItem}
              >
                الملف الشخصي
              </Link>
            </li>
            <li className={styles.separator}></li>
            <li>
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className={styles.dropdownItem}
              >
                الإعدادات
              </Link>
            </li>
            <li className={styles.separator}></li>
            <li>
              <button
                onClick={async () => {
                  await logout();
                  setOpen(false);
                }}
                className={styles.dropdownItemFlex}
              >
                <CiLogout className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
