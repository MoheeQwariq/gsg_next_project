import React from "react";
import myPhoto from "@/public/myPhoto.jpg";
import Image from "next/image";
import { SlUserFollow } from "react-icons/sl";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaStar } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import BlogDetails from "@/components/blog/BlogDetails";
const page = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-4 border-blue-800">
            <Image
              src={myPhoto}
              alt="فيصل أبو زكري"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl text-gray-600">فيصل أبو زكري</span>
          <span>
            <FaStar color="#f5d300" size={20} />
          </span>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer">
            <SlUserFollow className="w-4 h-4" />
            <span> متابعة</span>
          </button>
        </div>
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
      </div>

      <div>
        <BlogDetails />
      </div>
    </div>
  );
};

export default page;
