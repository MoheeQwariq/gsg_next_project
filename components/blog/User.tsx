import React from "react";
import myPhoto from "@/public/myPhoto.jpg";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Follow from "./Follow";
const User = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-12 w-12 overflow-hidden rounded-full border-4 border-blue-800">
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
      <Follow />
    </div>
  );
};

export default User;
