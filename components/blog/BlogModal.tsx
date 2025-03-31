"use client";
import { useModal } from "@/context/ModalContext";
import { FaTimes } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";

const BlogModal = () => {
  const { isOpen, handleModal } = useModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4"
      onClick={handleModal}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">إضافة مقال جديد</h2>
          <button
            onClick={handleModal}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              عنوان المقال
            </label>
            <input
              type="text"
              id="title"
              placeholder="أدخل عنوان المقال..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              التصنيف
            </label>
            <select
              id="category"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">اختر تصنيف...</option>
              <option value="personal">قصص شخصية</option>
              <option value="martyrs">قصص شهداء ومفقودين</option>
              <option value="displacement">قصص النزوح واللجوء</option>
              <option value="education">التعليم وسط الحرب</option>
              <option value="media">قصص من الاعلام والصحافة</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              صورة المقال
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">اضغط للرفع</span> أو اسحب
                    وأفلت
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG or GIF (الحد الأقصى 2MB)
                  </p>
                </div>
                <input id="image-upload" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              محتوى المقال
            </label>
            <textarea
              id="content"
              rows={8}
              placeholder="اكتب محتوى المقال هنا..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              الوسوم (افصل بين الوسوم بفاصلة)
            </label>
            <input
              type="text"
              id="tags"
              placeholder="مثال: قصص، تجارب، حياة"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleModal}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-700 hover:to-indigo-700"
            >
              نشر المقال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
