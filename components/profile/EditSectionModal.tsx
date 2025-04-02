"use client";

import React, { useState } from "react";

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSection: {
    heading: string;
    content: string;
    imageUrl: string;
    alignment: "left" | "right";
  }) => void;
  currentData: {
    heading: string;
    content: string;
    imageUrl: string;
    alignment: "left" | "right";
  };
}

export default function EditSectionModal({
  isOpen,
  onClose,
  onSave,
  currentData,
}: EditSectionModalProps) {
  const [heading, setHeading] = useState(currentData.heading);
  const [content, setContent] = useState(currentData.content);
  const [imageUrl, setImageUrl] = useState(currentData.imageUrl);
  const [alignment, setAlignment] = useState<"left" | "right">(currentData.alignment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ heading, content, imageUrl, alignment });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold">تعديل القسم</h2>
          <button onClick={onClose} className="rounded-full p-2">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">المحتوى</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded p-2"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">رابط الصورة</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">اتجاه الصورة</label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value as "left" | "right")}
              className="w-full border rounded p-2"
            >
              <option value="left">إلى اليسار</option>
              <option value="right">إلى اليمين</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="border rounded px-4 py-2">
              إلغاء
            </button>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
