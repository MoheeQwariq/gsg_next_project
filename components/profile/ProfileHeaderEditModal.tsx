"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaTimes } from "react-icons/fa";
import type { UserProfile } from "@/types/profile";
import type { User } from "@/types/user";
import { useTheme } from "@/context/ThemeContext";
import profileHeaderEditModalStyles from "@/styles/profileHeaderEditModal";
import { InputField, FileUploadField, fileToBase64 } from "./FormComponents";

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
  onSave: (updatedUser: User, updatedProfile: UserProfile) => void;
  user: User;
  profile: UserProfile;
  isOwner: boolean;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  user,
  profile,
  isOwner,
}) => {
  const { theme } = useTheme();
  const styles = profileHeaderEditModalStyles[theme];



  const [formData, setFormData] = useState<ProfileFormData>({
    name: user.name,
    bio: profile.bio || "",
    XUrl: profile.XUrl || "",
    facebookUrl: profile.facebookUrl || "",
    linkedinUrl: profile.linkedinUrl || "",
    phoneNumber: profile.phoneNumber || "",
    email: user.email,
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  if (!isOwner) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.headerTitle}>ليس لديك إذن لتحرير الملف الشخصي</h2>
            <button onClick={onClose} className={styles.closeButton}>
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let avatarBase64 = user.imageUrl;
    if (avatarFile) {
      avatarBase64 = await fileToBase64(avatarFile);
    }
    let coverBase64 = profile.coverUrl;
    if (coverFile) {
      coverBase64 = await fileToBase64(coverFile);
    }
    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      imageUrl: avatarBase64,
    };
    const updatedProfile: UserProfile = {
      ...profile,
      bio: formData.bio,
      XUrl: formData.XUrl,
      facebookUrl: formData.facebookUrl,
      linkedinUrl: formData.linkedinUrl,
      phoneNumber: formData.phoneNumber,
      coverUrl: coverBase64,
    };
    onSave(updatedUser, updatedProfile);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>تعديل الملف الشخصي</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            label="الاسم"
            name="name"
            placeholder="أدخل الاسم..."
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="النبذة التعريفية"
            name="bio"
            placeholder="اكتب نبذة قصيرة عنك..."
            value={formData.bio || ""}
            onChange={handleInputChange}
            textarea
          />
          <InputField
            label="X"
            name="XUrl"
            placeholder="رابط X"
            value={formData.XUrl || ""}
            onChange={handleInputChange}
          />
          <InputField
            label="فيسبوك"
            name="facebookUrl"
            placeholder="رابط فيسبوك"
            value={formData.facebookUrl || ""}
            onChange={handleInputChange}
          />
          <InputField
            label="لينكد إن"
            name="linkedinUrl"
            placeholder="رابط لينكد إن"
            value={formData.linkedinUrl || ""}
            onChange={handleInputChange}
          />
          <InputField
            label="رقم الهاتف"
            name="phoneNumber"
            placeholder="أدخل رقم الهاتف"
            value={formData.phoneNumber || ""}
            onChange={handleInputChange}
          />
          <InputField
            label="البريد الإلكتروني"
            name="email"
            placeholder="أدخل البريد الإلكتروني"
            value={formData.email || ""}
            onChange={handleInputChange}
            required
          />
          <FileUploadField
            label="صورة الملف الشخصي"
            file={avatarFile}
            onFileChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setAvatarFile(e.target.files[0]);
              }
            }}
          />
          <FileUploadField
            label="صورة الغلاف"
            file={coverFile}
            onFileChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files[0]) {
                setCoverFile(e.target.files[0]);
              }
            }}
          />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              إلغاء
            </button>
            <button type="submit" className={styles.submitButton}>
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
