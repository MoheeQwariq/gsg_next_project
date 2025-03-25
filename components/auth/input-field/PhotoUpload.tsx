"use client";

import type React from "react";
import Image from "next/image";
import { Upload, User } from "lucide-react";

interface IPhotoUploadProps {
  previewUrl: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const PhotoUpload = ({ previewUrl, onChange, label }: IPhotoUploadProps) => {
  return (
    <div className="space-y-2 text-right">
      <label htmlFor="photo-upload" className="block text-gray-700 font-medium">
        {label}
      </label>
      <div className="flex items-center gap-4 flex-row-reverse">
        <div className="relative h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-blue-200">
          {previewUrl ? (
            <Image
              src={previewUrl || "/placeholder.svg"}
              alt="صورة المستخدم"
              fill
              className="object-cover"
            />
          ) : (
            <User className="h-10 w-10 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <Upload className="h-5 w-5 text-blue-500" />
            <span className="text-blue-600 font-medium">اختر صورة</span>
          </label>
          <input
            id="photo-upload"
            type="file"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
