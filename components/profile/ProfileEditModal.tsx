"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export interface UserProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  x?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  phone?: string;
  email?: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: UserProfile) => void;
  currentData: UserProfile;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentData,
}) => {
  const [formData, setFormData] = useState<UserProfile>(currentData);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">تعديل الملف الشخصي</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل الاسم..."
              required
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-medium text-gray-700">
              النبذة التعريفية
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="اكتب نبذة قصيرة عنك..."
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="x" className="mb-2 block text-sm font-medium text-gray-700">
              X
            </label>
            <input
              type="url"
              id="x"
              name="x"
              value={formData.x || ""}
              onChange={handleChange}
              placeholder="رابط X"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="facebook" className="mb-2 block text-sm font-medium text-gray-700">
              فيسبوك
            </label>
            <input
              type="url"
              id="facebook"
              name="facebook"
              value={formData.facebook || ""}
              onChange={handleChange}
              placeholder="رابط فيسبوك"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="instagram" className="mb-2 block text-sm font-medium text-gray-700">
              انستجرام
            </label>
            <input
              type="url"
              id="instagram"
              name="instagram"
              value={formData.instagram || ""}
              onChange={handleChange}
              placeholder="رابط انستجرام"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="mb-2 block text-sm font-medium text-gray-700">
              لينكد إن
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              placeholder="رابط لينكد إن"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="أدخل رقم الهاتف"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="أدخل البريد الإلكتروني"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-indigo-700"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
