import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { PiChatDots } from "react-icons/pi";
import photo from "../../public/myPhoto.jpg";
const page = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 p-4 w-full max-w-md">
      {/* صورة المقالة*/}
      <div className="w-full h-48 relative">
        <Image
          src={photo}
          alt="عنوان المقالة"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* محتوى المقالة */}
      <div className="mt-4">
        {/* العنوان و وقت النشر */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">عنوان المقالة</h2>
          <span className="text-sm text-gray-500">قبل 12 ساعة</span>
        </div>

        {/* نبذة قصيرة عن المقالة */}
        <p className="text-gray-700 mt-2 text-sm leading-relaxed">
          نص المقالة يذهب هنا. يمكنك وضع نبذة مختصرة عن المقال لجذب القراء...
        </p>

        {/* صاحب المقالة */}
        <div className="flex items-center mt-4">
          <Image
            src={photo}
            alt="فيصل أبو زكري"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
          <span className="ml-2 text-gray-900 font-medium">فيصل أبو زكري</span>
        </div>

        {/* تصنيف المقالة و التفاعل معها */}
        <div className="mt-4 flex justify-between items-center text-gray-600 text-sm">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg">
            الصنف
          </span>
          <div className="flex gap-4">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>1</span>

              <CiHeart className="text-red-500" size={20} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>1</span>
              <PiChatDots className="text-blue-500" size={20} />
            </div>
          </div>
        </div>

        {/* اقرأ المزيد */}
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          اقرأ المزيد
        </button>
      </div>
    </div>
  );
};

export default page;
