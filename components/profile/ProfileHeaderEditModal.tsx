"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import type { UserProfile } from "@/types/profile";
import profileHeaderEditModalStyles from "@/styles/profileHeaderEditModal";

interface ProfileFormData {
  name: string;
  bio?: string;
  XUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  phoneNumber?: string;
  email: string;
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
  const [formData, setFormData] = useState<ProfileFormData>({
    name: currentData.user.name,
    bio: currentData.bio || "",
    XUrl: currentData.XUrl || "",
    facebookUrl: currentData.facebookUrl || "",
    linkedinUrl: currentData.linkedinUrl || "",
    phoneNumber: currentData.phoneNumber || "",
    email: currentData.user.email,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Error reading file"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let avatarBase64 = currentData.avatarUrl;
    if (avatarFile) {
      avatarBase64 = await fileToBase64(avatarFile);
    }
    let coverBase64 = currentData.coverUrl;
    if (coverFile) {
      coverBase64 = await fileToBase64(coverFile);
    }
    const updatedProfile: UserProfile = {
      ...currentData,
      bio: formData.bio,
      XUrl: formData.XUrl,
      facebookUrl: formData.facebookUrl,
      linkedinUrl: formData.linkedinUrl,
      phoneNumber: formData.phoneNumber,
      avatarUrl: avatarBase64,
      coverUrl: coverBase64,
      user: {
        ...currentData.user,
        name: formData.name,
        email: formData.email,
      },
    };
    onSave(updatedProfile);
  };

  return (
    <div
      className={profileHeaderEditModalStyles.overlay}
      onClick={onClose}
    >
      <div
        className={profileHeaderEditModalStyles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={profileHeaderEditModalStyles.header}>
          <h2 className={profileHeaderEditModalStyles.headerTitle}>
            تعديل الملف الشخصي
          </h2>
          <button
            onClick={onClose}
            className={profileHeaderEditModalStyles.closeButton}
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={profileHeaderEditModalStyles.form}>
          <div>
            <label htmlFor="name" className={profileHeaderEditModalStyles.label}>
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
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="bio" className={profileHeaderEditModalStyles.label}>
              النبذة التعريفية
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              placeholder="اكتب نبذة قصيرة عنك..."
              className={profileHeaderEditModalStyles.input}
            ></textarea>
          </div>
          <div>
            <label htmlFor="XUrl" className={profileHeaderEditModalStyles.label}>
              X
            </label>
            <input
              type="url"
              id="XUrl"
              name="XUrl"
              value={formData.XUrl || ""}
              onChange={handleChange}
              placeholder="رابط X"
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="facebookUrl" className={profileHeaderEditModalStyles.label}>
              فيسبوك
            </label>
            <input
              type="url"
              id="facebookUrl"
              name="facebookUrl"
              value={formData.facebookUrl || ""}
              onChange={handleChange}
              placeholder="رابط فيسبوك"
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="linkedinUrl" className={profileHeaderEditModalStyles.label}>
              لينكد إن
            </label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl || ""}
              onChange={handleChange}
              placeholder="رابط لينكد إن"
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className={profileHeaderEditModalStyles.label}>
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="أدخل رقم الهاتف"
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="email" className={profileHeaderEditModalStyles.label}>
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="أدخل البريد الإلكتروني"
              required
              className={profileHeaderEditModalStyles.input}
            />
          </div>
          <div>
            <label htmlFor="avatarUpload" className={profileHeaderEditModalStyles.label}>
              صورة الملف الشخصي
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="avatarUpload"
                className={profileHeaderEditModalStyles.fileUploadLabel}
              >
                <div className={profileHeaderEditModalStyles.fileUploadInner}>
                  <p className={profileHeaderEditModalStyles.fileUploadText}>
                    {currentData.avatarUrl ? "تحديث الصورة" : "اضغط للرفع"}
                  </p>
                </div>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAvatarFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="coverUpload" className={profileHeaderEditModalStyles.label}>
              صورة الغلاف
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="coverUpload"
                className={profileHeaderEditModalStyles.fileUploadLabel}
              >
                <div className={profileHeaderEditModalStyles.fileUploadInner}>
                  <p className={profileHeaderEditModalStyles.fileUploadText}>
                    {currentData.coverUrl ? "تحديث صورة الغلاف" : "اضغط للرفع"}
                  </p>
                </div>
                <input
                  id="coverUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className={profileHeaderEditModalStyles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={profileHeaderEditModalStyles.cancelButton}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={profileHeaderEditModalStyles.submitButton}
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
