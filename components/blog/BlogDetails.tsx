import Image from "next/image";
import React from "react";
import photo from "../../public/myPhoto.jpg";
import gaza from "../../public/Gaza.jpg";
import { FaCalendarAlt, FaComment, FaEye, FaHeart } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comments from "./Comments";
const BlogDetails = () => {
  return (
    <>
      <article className="mx-auto max-w-6xl overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <div className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition">
              <BsThreeDotsVertical size={20} className="text-gray-600" />
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                الصنف
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                قبل 12 ساعة
              </span>
            </div>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            عنوان المقالة
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-100">
                <Image
                  src={photo}
                  alt={"فيصل ابو زكري"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">فيصل ابو زكري</p>
                <p className="text-sm text-gray-500">كاتب ومدون</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaEye className="h-4 w-4 text-gray-400" />
                100
              </span>
              <span className="flex items-center gap-1">
                <FaHeart className="h-4 w-4 text-red-400" />
                50
              </span>
              <span className="flex items-center gap-1">
                <FaComment className="h-4 w-4 text-blue-400" />
                10
              </span>
            </div>
          </div>
        </div>

        <div className="relative h-64 w-full sm:h-80 md:h-96">
          <Image
            src={gaza}
            alt={"عنوان المقالة"}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="prose prose-lg max-w-none">
            <span className="text-2xl">محتوى المقالة :</span>
            <blockquote className="my-8 border-r-4 border-blue-500 bg-blue-50 p-4 pr-6 italic text-gray-700">
              وسط الدمار والصعوبات، يظل الأمل هو الشعلة التي تنير دربنا. فحتى في
              أحلك الظروف، تبقى قوة الإرادة قادرة على صنع المعجزات. نحن لا نختار
              الظروف التي نولد فيها، ولكننا نختار كيف نواجهها. قد يبدو الطريق
              طويلاً ومليئًا بالعقبات، لكن كل خطوة نخطوها نحو المستقبل تحمل في
              طياتها نورًا جديدًا. الأمل ليس مجرد حلم، بل هو قرار نأخذه كل يوم
              لنواصل المسير، رغم كل ما نواجهه من تحديات
            </blockquote>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              #قصص
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              #تجارب
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              #حياة
            </span>
          </div>
        </div>
      </article>
      <Comments />
    </>
  );
};

export default BlogDetails;
