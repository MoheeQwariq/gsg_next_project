"use client";
import React from "react";
import Image from "next/image";
import { Upload, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import photoUploadStyles from "@/styles/auth/photoUploadStyles";

interface IPhotoUploadProps {
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const PhotoUpload = ({ previewUrl, onChange, label }: IPhotoUploadProps) => {
  const { theme } = useTheme();
  const styles = photoUploadStyles[theme];

  return (
    <div className={styles.container}>
      <label htmlFor="photo-upload" className={styles.label}>
        {label}
      </label>
      <div className={styles.mainRow}>
        <div className={styles.imageWrapper}>
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="صورة المستخدم"
              fill
              className={styles.image}
            />
          ) : (
            <User className={styles.userIcon} />
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="photo-upload" className={styles.fileLabel}>
            <Upload className={styles.fileLabelIcon} />
            <span className={styles.fileLabelText}>اختر صورة</span>
          </label>
          <input
            id="photo-upload"
            type="file"
            name="photo"
            accept="image/*"
            className={styles.input}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
