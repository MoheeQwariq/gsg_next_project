"use client";

import React, { useState } from "react";

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
  const [imageUrl, setImageUrl] = useState("");
  const [alignment, setAlignment] = useState<"left" | "right">("left");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSection({ heading, content, imageUrl, alignment });
    setHeading("");
    setContent("");
    setImageUrl("");
    setAlignment("left");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold">إضافة قسم</h2>
          <button onClick={onClose} className="rounded-full p-2">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">العنوان</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="أدخل عنوان القسم"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">المحتوى</label>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              placeholder="اكتب وصفًا مختصرًا..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">رابط الصورة</label>
            <input
              type="url"
              className="w-full border rounded p-2"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">اتجاه الصورة</label>
            <select
              className="w-full border rounded p-2"
              value={alignment}
              onChange={(e) =>
                setAlignment(e.target.value as "left" | "right")
              }
            >
              <option value="left">إلى اليسار</option>
              <option value="right">إلى اليمين</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="border rounded px-4 py-2">
              إلغاء
            </button>
            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
