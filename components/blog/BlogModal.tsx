"use client";
import { useModal } from "@/context/ModalContext";
import { FaTimes } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { categories } from "@/constant/constant";
import { ChangeEvent, useState } from "react";
interface ArticleFormData {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string;
  imageUrl: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}
const BlogModal = () => {
  const { isOpen, handleModal } = useModal();
  if (!isOpen) return null;
  const [formData, setFormData] = useState<
    Omit<ArticleFormData, "id" | "createdAt" | "author">
  >({
    title: "",
    category: "",
    content: "",
    tags: "",
    imageUrl: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const titlehandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const CategoryhandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };
  const ContenthandleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };
  const tagshandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value,
    }));
  };

  const ImagehandleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFormData((prev) => ({
        ...prev,
        imageUrl: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.title || !formData.category || !formData.content) {
        setIsSubmitting(false);
        return;
      }
      const newArticle: ArticleFormData = {
        ...formData,
        id: `article_${Date.now()}`,
        createdAt: new Date().toISOString(),
        author: {
          name: "فيصل أبو زكري",
          image: "/placeholder.svg?height=40&width=40",
        },
      };
      const existingArticles = JSON.parse(
        localStorage.getItem("articles") || "[]"
      );
      const updatedArticles = [newArticle, ...existingArticles];
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      setFormData({
        title: "",
        category: "",
        content: "",
        tags: "",
        imageUrl: "",
      });
      setImagePreview(null);
      handleModal();
    } catch (error) {
      console.error("Error saving article:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
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

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              name="title"
              value={formData.title}
              onChange={titlehandleChange}
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
              name="category"
              value={formData.category}
              onChange={CategoryhandleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categories.map((category: string) => {
                return (
                  <option value={category} key={category}>
                    {category}
                  </option>
                );
              })}
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
              {imagePreview ? (
                <div className="relative w-full h-64">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="معاينة الصورة"
                    className="h-full w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">اضغط للرفع</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (الحد الأقصى 2MB)
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={ImagehandleUpload}
                    className="hidden"
                  />
                </label>
              )}
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
              name="content"
              value={formData.content}
              onChange={ContenthandleChange}
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
              name="tags"
              value={formData.tags}
              onChange={tagshandleChange}
              placeholder="مثال: قصص، تجارب، حياة"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleModal}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-700 hover:to-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري النشر..." : "نشر المقال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
