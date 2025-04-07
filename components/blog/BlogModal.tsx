"use client";
import React, { useState, ChangeEvent } from "react";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
import { FaTimes } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import { categories } from "@/constant/constant";
import type { BlogDetail } from "@/types/type";
import Image from "next/image";

interface BlogModalProps {
  onAddBlog: (blogData: Partial<BlogDetail>) => void;
}

const blogModalStyles = {
  light: {
    overlay:
      "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4",
    modal:
      "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl",
    header: "mb-6 flex items-center justify-between border-b border-gray-200 pb-4",
    headerTitle: "text-2xl font-bold text-gray-900",
    closeButton:
      "rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700",
    label: "mb-2 block text-sm font-medium text-gray-700",
    input:
      "w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    textarea:
      "w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    fileLabel:
      "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
    fileLabelIcon: "w-10 h-10 mb-3 text-gray-400",
    fileLabelText: "mb-2 text-sm text-gray-500",
    fileLabelSubtext: "text-xs text-gray-500",
    cancelButton:
      "rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50",
    submitButton:
      "cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-700 hover:to-indigo-700",
    imagePreviewContainer: "relative w-full h-64",
    imagePreview: "h-full w-full object-cover rounded-lg",
    imagePreviewRemove:
      "absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600",
  },
  dark: {
    overlay:
      "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4",
    modal:
      "relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-gray-800 p-6 shadow-xl",
    header: "mb-6 flex items-center justify-between border-b border-gray-700 pb-4",
    headerTitle: "text-2xl font-bold text-gray-100",
    closeButton:
      "rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-gray-300",
    label: "mb-2 block text-sm font-medium text-gray-300",
    input:
      "w-full rounded-lg border border-gray-600 p-3 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    textarea:
      "w-full rounded-lg border border-gray-600 p-3 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    fileLabel:
      "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600",
    fileLabelIcon: "w-10 h-10 mb-3 text-gray-300",
    fileLabelText: "mb-2 text-sm text-gray-300",
    fileLabelSubtext: "text-xs text-gray-300",
    cancelButton:
      "rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700",
    submitButton:
      "cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-300 hover:from-blue-600 hover:to-indigo-600",
    imagePreviewContainer: "relative w-full h-64",
    imagePreview: "h-full w-full object-cover rounded-lg",
    imagePreviewRemove:
      "absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600",
  },
};

const BlogModal = ({ onAddBlog }: BlogModalProps) => {
  const { isOpen, handleModal } = useModal();
  const { theme } = useTheme();
  const styles = blogModalStyles[theme];

  const [formData, setFormData] = useState<
    Omit<BlogDetail, "blogId" | "createdAt" | "author">
  >({
    title: "",
    category: categories[0] || "",
    content: "",
    tags: "",
    imageUrl: "",
    like: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

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

  const ImagehandleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return;
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
      onAddBlog(formData);
      setFormData({
        title: "",
        category: categories[0] || "",
        content: "",
        tags: "",
        imageUrl: "",
        like: 0,
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
    <div className={styles.overlay} onClick={handleModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>إضافة مقال جديد</h2>
          <button onClick={handleModal} className={styles.closeButton}>
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className={styles.label}>
              عنوان المقال
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={titlehandleChange}
              placeholder="أدخل عنوان المقال..."
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor="category" className={styles.label}>
              التصنيف
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={CategoryhandleChange}
              className={styles.input}
            >
              {categories.map((category: string) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className={styles.label}>
              صورة المقال
            </label>
            <div className="flex items-center justify-center w-full">
              {imagePreview ? (
                <div className={styles.imagePreviewContainer}>
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="معاينة الصورة"
                    fill
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, imageUrl: "" }));
                    }}
                    className={styles.imagePreviewRemove}
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label htmlFor="image-upload" className={styles.fileLabel}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className={styles.fileLabelIcon} />
                    <p className={styles.fileLabelText}>
                      <span className="font-semibold">اضغط للرفع</span>
                    </p>
                    <p className={styles.fileLabelSubtext}>
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
            <label htmlFor="content" className={styles.label}>
              محتوى المقال
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={ContenthandleChange}
              rows={8}
              placeholder="اكتب محتوى المقال هنا..."
              className={styles.textarea}
            ></textarea>
          </div>
          <div>
            <label htmlFor="tags" className={styles.label}>
              الوسوم (افصل بين الوسوم بفاصلة)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={tagshandleChange}
              placeholder="مثال: قصص، تجارب، حياة"
              className={styles.input}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleModal}
              className={styles.cancelButton}
              disabled={isSubmitting}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={styles.submitButton}
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
