import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
const SocialMedia = () => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={"facebook"}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-full p-2 text-[#1877F2] transition-all hover:bg-[#1877F2]/10"
      >
        <FaFacebook size={20} />
      </Link>
      <Link
        href={"instagram"}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-full p-2 text-[#E4405F] transition-all hover:bg-[#E4405F]/10"
      >
        <FaInstagram size={20} />
      </Link>
      <Link
        href={"linkedin"}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-full p-2 text-[#0A66C2] transition-all hover:bg-[#0A66C2]/10"
      >
        <FaLinkedinIn size={20} />
      </Link>
      <Link
        href={"twitter"}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer rounded-full p-2 text-[#000000] transition-all hover:bg-[#000000]/10"
      >
        <FaXTwitter size={20} />
      </Link>
    </div>
  );
};

export default SocialMedia;
