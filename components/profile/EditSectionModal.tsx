"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import type { ProfileSection } from "@/types/profile";
import { updateProfileSection } from "@/services/profile.service";
import editSectionModalStyles from "@/styles/editSectionModal";

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSection: ProfileSection) => void;
  currentData: ProfileSection;
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
}: EditSectionModalProps) {
  // Group text fields in one state.
  const [formState, setFormState] = useState<SectionFormState>({
    title: currentData.title,
    content: currentData.content,
    imageDirection: currentData.imageDirection || "left",
  });
  // Local state for file upload.
  const [file, setFile] = useState<File | null>(null);

  // Helper to convert file to base64.
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

  // Update form state.
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // File change handler.
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Submit form.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let base64Image = currentData.imageUrl;
    if (file) {
      base64Image = await fileToBase64(file);
    }
    const updatedSectionData = {
      title: formState.title,
      content: formState.content,
      imageUrl: base64Image || "",
      imageDirection: formState.imageDirection,
    };
    // Call service to update the section.
    const updatedSection = await updateProfileSection(
      currentData.id,
      updatedSectionData
    );
    onSave(updatedSection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={editSectionModalStyles.overlay}
      onClick={onClose}
    >
      <div
        className={editSectionModalStyles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={editSectionModalStyles.header}>
          <h2 className={editSectionModalStyles.headerTitle}>تعديل القسم</h2>
          <button
            onClick={onClose}
            className={editSectionModalStyles.closeButton}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className={editSectionModalStyles.form} dir="rtl">
          <InputField
            label="العنوان"
            name="title"
            placeholder="أدخل عنوان القسم"
            value={formState.title}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="المحتوى"
            name="content"
            placeholder="اكتب وصفًا مختصرًا..."
            value={formState.content}
            onChange={handleInputChange}
            textarea
            required
          />
          <FileUploadField
            label="صورة القسم"
            file={file}
            onFileChange={handleFileChange}
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
          />
          <div className={editSectionModalStyles.buttonContainer}>
            <button
              type="button"
              onClick={onClose}
              className={editSectionModalStyles.cancelButton}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={editSectionModalStyles.submitButton}
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable InputField component.
interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  textarea?: boolean;
  select?: boolean;
  options?: { value: string; label: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  textarea = false,
  select = false,
  options = [],
}) => {
  return (
    <div>
      <label className={editSectionModalStyles.label}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={editSectionModalStyles.textarea}
          rows={4}
        ></textarea>
      ) : select ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={editSectionModalStyles.select}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={editSectionModalStyles.input}
        />
      )}
    </div>
  );
};

// Reusable FileUploadField component.
interface FileUploadFieldProps {
  label: string;
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  file,
  onFileChange,
}) => {
  return (
    <div>
      <label className={editSectionModalStyles.label}>{label}</label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="edit-image-upload"
          className={editSectionModalStyles.fileUploadLabel}
        >
          {!file ? (
            <div className={editSectionModalStyles.fileUploadInner}>
              <MdOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
              <p className={editSectionModalStyles.fileUploadText}>
                <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG أو GIF (الحد الأقصى 2MB)
              </p>
            </div>
          ) : (
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
            id="edit-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
        </label>
      </div>
    </div>
  );
};
