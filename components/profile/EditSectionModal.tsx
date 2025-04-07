"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import type { ProfileSection } from "@/types/profile";
import { updateProfileSection } from "@/services/profile/sections.service";
import { useTheme } from "@/context/ThemeContext";
import editSectionModalStyles from "@/styles/editSectionModal";
import { User } from "@/types/user";
import { InputField, FileUploadField, fileToBase64 } from "./FormComponents";

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSection: ProfileSection) => void;
  currentData: ProfileSection;
  user: User;
}

interface SectionFormState {
  title: string;
  content: string;
  imageDirection: "left" | "right";
}

export default function EditSectionModal({
  isOpen,
  onClose,
  onSave,
  currentData,
  user,
}: EditSectionModalProps) {
  const { theme } = useTheme();
  const modalStyles = editSectionModalStyles[theme];

  const [formState, setFormState] = useState<SectionFormState>({
    title: currentData.title,
    content: currentData.content,
    imageDirection: currentData.imageDirection || "left",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let base64Image = currentData.imageUrl;
    if (file) {
      base64Image = await fileToBase64(file);
    }
    const updatedSectionData: Omit<ProfileSection, "id"> = {
      title: formState.title,
      content: formState.content,
      imageUrl: base64Image || "",
      imageDirection: formState.imageDirection,
    };
    const updatedSection = await updateProfileSection(user.id, currentData.id, updatedSectionData);
    onSave(updatedSection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={modalStyles.overlay} onClick={onClose}>
      <div className={modalStyles.container} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.headerTitle}>تعديل القسم</h2>
          <button onClick={onClose} className={modalStyles.closeButton}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className={modalStyles.form} dir="rtl">
          <InputField
            label="العنوان"
            name="title"
            placeholder="أدخل عنوان القسم"
            value={formState.title}
            onChange={handleInputChange}
            required
            // modalStyles={modalStyles}
          />
          <InputField
            label="المحتوى"
            name="content"
            placeholder="اكتب وصفًا مختصرًا..."
            value={formState.content}
            onChange={handleInputChange}
            textarea
            required
            // modalStyles={modalStyles}
          />
          <FileUploadField
            label="صورة القسم"
            file={file}
            onFileChange={handleFileChange}
            // modalStyles={modalStyles}
          />
          <InputField
            label="اتجاه الصورة"
            name="imageDirection"
            value={formState.imageDirection}
            onChange={handleInputChange}
            select
            options={[
              { value: "right", label: "إلى اليسار" },
              { value: "left", label: "إلى اليمين" },
            ]}
            required
            // modalStyles={modalStyles}
          />
          <div className={modalStyles.buttonContainer}>
            <button type="button" onClick={onClose} className={modalStyles.cancelButton}>
              إلغاء
            </button>
            <button type="submit" className={modalStyles.submitButton}>
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
