import Image from "next/image";
import React from "react";
import { FaHeart, FaRegClock, FaReply } from "react-icons/fa";
import myPhoto from "@/public/myPhoto.jpg";
const Comment = () => {
  return (
    <div className="divide-y divide-gray-100">
      <div className="border-b border-gray-300 py-6">
        <div className="flex gap-4">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-blue-100">
            <Image
              src={myPhoto}
              alt={"فيصل ابو زكري"}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium text-gray-900">فيصل أبو زكري</h4>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <FaRegClock className="h-3 w-3" />
                منذ 12 ساعة
              </span>
            </div>

            <p className="text-gray-700">
              الله يفرجها عليكم و تنتهي هالحرب بأسرع وفت و يكون عيدكم عيدين
              بانتهاء حربكم
            </p>
            <div className="mt-3 flex items-center gap-4">
              <button className="flex items-center gap-1 text-xs text-gray-500 transition hover:text-red-500">
                <FaHeart className="h-3 w-3" />
                <span> 10</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
