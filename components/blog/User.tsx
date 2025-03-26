import React from "react";
import myPhoto from "@/public/myPhoto.jpg";
import Image from "next/image";
import { SlUserFollow } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
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
      <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md transition duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg cursor-pointer">
        <SlUserFollow className="w-4 h-4" />
        <span> متابعة</span>
      </button>
    </div>
  );
};

export default User;
