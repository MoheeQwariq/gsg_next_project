"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export interface UserProfile {
  name: string;
  bio: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold">تعديل الملف الشخصي</h2>
          <button onClick={onClose} className="rounded-full p-2">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              النبذة
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
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
};

export default ProfileEditModal;
