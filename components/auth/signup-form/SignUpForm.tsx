"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import FormInput from "@/components/auth/input-field/FormInput";
import PhotoUpload from "@/components/auth/input-field/PhotoUpload";
import { validateForm } from "@/utils/validation";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthday: "",
  photo: null as File | null,
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, files } = e.target;
  if (error) {
    setError("");
  }
  if (name === "photo" && files && files.length > 0) {
    setFormData({ ...formData, photo: files[0] });
    setPreviewUrl(URL.createObjectURL(files[0]));
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  const result = validateForm(formData);

  if (!result.isValid) {
    const errorMessages = Object.values(result.errors).join(" - ");
    setError(errorMessages || "حدث خطأ غير متوقع");
    return;
  }

  console.log("تم التسجيل بنجاح", formData);
  setFormData(initialFormData);
  setPreviewUrl(null);
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rtl">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              إنشاء حساب جديد
            </h1>
            <p className="text-gray-500">انضم إلينا لمشاركة قصتك</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm border border-red-100 text-right">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="أدخل اسمك الرباعي"
              label="الاسم الكامل"
              icon={<User size={20} />}
              onChange={handleChange}
            />

            <FormInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="example@email.com"
              label="البريد الإلكتروني"
              icon={<Mail size={20} />}
              onChange={handleChange}
            />

            <FormInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              placeholder="********"
              label="كلمة المرور"
              icon={<Lock size={20} />}
              rightIcon={
                showPassword ? <EyeOff size={18} /> : <Eye size={18} />
              }
              onChange={handleChange}
              onRightIcon={() => setShowPassword(!showPassword)}
            />

            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              label="تأكيد كلمة المرور"
              icon={<Lock size={20} />}
              rightIcon={
                showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />
              }
              onChange={handleChange}
              onRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <FormInput
              id="birthday"
              name="birthday"
              type="date"
              label="تاريخ الميلاد"
              onChange={handleChange}
            />

            <PhotoUpload
              previewUrl={previewUrl}
              onChange={handleChange}
              label="الصورة الشخصية"
            />

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              إنشاء الحساب
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            لديك حساب بالفعل؟
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-medium mr-1"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <div className="w-1/2 hidden md:block relative">
          <Image
            src="/blog-image.jpg"
            alt="Blog"
            width={600}
            height={800}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
