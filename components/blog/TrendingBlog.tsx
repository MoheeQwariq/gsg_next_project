import Image from "next/image";
import React from "react";
import myPhoto from "@/public/myPhoto.jpg";
const TrendingBlog = () => {
  return (
    <div className="flex  ">
      <div className=" h-28 w-24 relative">
        <Image
          src={myPhoto}
          alt="عنوان المقالة"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <p>
          {" "}
          نص المقالة يذهب هنا. يمكنك وضع نبذة مختصرة عن المقال لجذب القراء...
        </p>
        <div className="flex">
          <div className="flex items-center mt-4">
            <Image
              src={myPhoto}
              alt="فيصل أبو زكري"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <span className="ml-2 text-gray-900 font-medium">
              فيصل أبو زكري
            </span>
          </div>
          <span className="px-1 py-1 bg-gray-100 text-gray-700 ">الصنف</span>
          <span className="text-sm text-gray-500">قبل 12 ساعة</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingBlog;
