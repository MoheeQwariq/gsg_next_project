"use client";

import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

interface AddSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (newSection: {
    heading: string;
    content: string;
    imageUrl: string;
    alignment: "left" | "right";
  }) => void;
}

export default function AddSectionModal({
  isOpen,
  onClose,
  onAddSection,
}: AddSectionModalProps) {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [alignment, setAlignment] = useState<"left" | "right">("left");
  const [file, setFile] = useState<File | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("فشل في قراءة الملف"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let base64Image = "";
    if (file) {
      base64Image = await fileToBase64(file);
    }
    onAddSection({
      heading,
      content,
      imageUrl: base64Image,
      alignment,
    });
    setHeading("");
    setContent("");
    setAlignment("left");
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-xl font-bold text-gray-900">إضافة قسم</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العنوان
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="أدخل عنوان القسم"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المحتوى
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="اكتب وصفًا مختصرًا..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              صورة القسم
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {!file && (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG أو GIF (الحد الأقصى 2MB)
                    </p>
                  </div>
                )}
                {file && (
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-600">
                      تم اختيار الملف: {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      اضغط هنا لاختيار ملف آخر
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اتجاه الصورة
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={alignment}
              onChange={(e) =>
                setAlignment(e.target.value as "left" | "right")
              }
            >
              <option value="right">إلى اليسار</option>
              <option value="left">إلى اليمين</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
