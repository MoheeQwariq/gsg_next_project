"use client";
import React, { ChangeEvent } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import formComponentsStyles from "../../styles/formComponentsStyles";

export interface InputFieldProps {
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

export const InputField: React.FC<InputFieldProps> = ({
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
  const { theme } = useTheme();
  const styles = formComponentsStyles[theme];
  return (
    <div>
      <label className={styles.label}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={styles.textarea}
          rows={4}
        />
      ) : select ? (
        <select name={name} value={value} onChange={onChange} required={required} className={styles.select}>
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
          className={styles.input}
        />
      )}
    </div>
  );
};

export interface FileUploadFieldProps {
  label: string;
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, file, onFileChange }) => {
  const { theme } = useTheme();
  const styles = formComponentsStyles[theme];
  return (
    <div>
      <label className={styles.label}>{label}</label>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="file-upload" className={styles.fileUploadLabel}>
          {!file ? (
            <div className={styles.fileUploadInner}>
              <MdOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
              <p className={styles.fileUploadText}>
                <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG أو GIF (الحد الأقصى 2MB)
              </p>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-sm text-gray-600">تم اختيار الملف: {file.name}</p>
              <p className="text-xs text-gray-400">اضغط هنا لاختيار ملف آخر</p>
            </div>
          )}
          <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>
      </div>
    </div>
  );
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Error reading file"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
