"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import type { ProfileSection } from "@/types/profile";
import { useTheme } from "@/context/ThemeContext";
import { addUserSection } from "@/services/profile/sections.service";
import addSectionModalStylesRaw from "@/styles/addSectionModalStyles";
import { User } from "@/types/user";
import { InputField, FileUploadField } from "./FormComponents";
interface SectionFormState {
  title: string;
  content: string;
  imageDirection: "left" | "right";
}

interface AddSectionModalProps {
  user:User
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (newSection: ProfileSection) => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
  user,
  isOpen,
  onClose,
  onAddSection,
}) => {
  const { theme } = useTheme();
  const modalStyles = addSectionModalStylesRaw[theme];

  const [formState, setFormState] = useState<SectionFormState>({
    title: "",
    content: "",
    imageDirection: "left",
  });
  const [file, setFile] = useState<File | null>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("فشل في قراءة الملف"));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

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
    let base64Image = "";
    if (file) base64Image = await fileToBase64(file);
    const newSectionData: Omit<ProfileSection, "id"> = {
      title: formState.title,
      content: formState.content,
      imageUrl: base64Image,
      imageDirection: formState.imageDirection,
    };
    const savedSection = await addUserSection(user.id, newSectionData);
    onAddSection(savedSection);
    setFormState({ title: "", content: "", imageDirection: "left" });
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={modalStyles.overlay} onClick={onClose}>
      <div className={modalStyles.container} onClick={(e) => e.stopPropagation()}>
        <div className={modalStyles.header}>
          <h2 className={modalStyles.headerTitle}>إضافة قسم</h2>
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
            <button
              type="button"
              onClick={onClose}
              className={modalStyles.cancelButton}
            >
              إلغاء
            </button>
            <button type="submit" className={modalStyles.submitButton}>
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default AddSectionModal;
