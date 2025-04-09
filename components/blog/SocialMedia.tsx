"use client";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const socialMediaStyles = {
  light: {
    container: "flex items-center gap-3",
    facebook: "cursor-pointer rounded-full p-2 text-[#1877F2] transition-all hover:bg-[#1877F2]/10",
    instagram: "cursor-pointer rounded-full p-2 text-[#E4405F] transition-all hover:bg-[#E4405F]/10",
    linkedin: "cursor-pointer rounded-full p-2 text-[#0A66C2] transition-all hover:bg-[#0A66C2]/10",
    twitter: "cursor-pointer rounded-full p-2 text-[#000000] transition-all hover:bg-[#000000]/10",
  },
  dark: {
    container: "flex items-center gap-3",
    facebook: "cursor-pointer rounded-full p-2 text-[#1877F2] transition-all hover:bg-[#1877F2]/20",
    instagram: "cursor-pointer rounded-full p-2 text-[#E4405F] transition-all hover:bg-[#E4405F]/20",
    linkedin: "cursor-pointer rounded-full p-2 text-[#0A66C2] transition-all hover:bg-[#0A66C2]/20",
    twitter: "cursor-pointer rounded-full p-2 text-[#FFFFFF] transition-all hover:bg-[#FFFFFF]/20",
  },
};

const SocialMedia = () => {
  const { theme } = useTheme();
  const styles = socialMediaStyles[theme];

  return (
    <div className={styles.container}>
      <Link
        href={"facebook"}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.facebook}
      >
        <FaFacebook size={20} />
      </Link>
      <Link
        href={"instagram"}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instagram}
      >
        <FaInstagram size={20} />
      </Link>
      <Link
        href={"linkedin"}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkedin}
      >
        <FaLinkedinIn size={20} />
      </Link>
      <Link
        href={"twitter"}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.twitter}
      >
        <FaXTwitter size={20} />
      </Link>
    </div>
  );
};

export default SocialMedia;
