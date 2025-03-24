"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Upload, User, Mail, Lock } from "lucide-react";
import { useState } from "react";

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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.birthday
    ) {
      setError(".جميع الحقول مطلوبة");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(".كلمات المرور غير متطابقة");
      return;
    }

    console.log("Success", formData);
    setFormData(initialFormData);
    setPreviewUrl(null);
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4 rtl">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
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
            <div className="space-y-2 text-right">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                الاسم الكامل
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="أدخل اسمك الرباعي"
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  onChange={handleChange}
                />
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  onChange={handleChange}
                />
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="********"
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 text-right  focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all pr-10"
                  onChange={handleChange}
                />
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium"
              >
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-right pr-10"
                  onChange={handleChange}
                />

                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <label
                htmlFor="birthday"
                className="block text-gray-700 font-medium"
              >
                تاريخ الميلاد
              </label>
              <div className="relative">
                <input
                  id="birthday"
                  type="date"
                  name="birthday"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-right pr-3"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2 text-right">
              <label
                htmlFor="photo"
                className="block text-gray-700 font-medium"
              >
                الصورة الشخصية
              </label>
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="relative h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-emerald-200">
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
                    className="cursor-pointer flex items-center justify-center gap-2 p-4 border-2 border-dashed border-emerald-200 rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">
                      اختر صورة
                    </span>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              إنشاء الحساب
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
             لديك حساب بالفعل؟
            <Link
              href="/auth/login"
              className="text-emerald-600 hover:text-emerald-800 font-medium mr-1"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <div className="w-1/2 hidden md:block">
          <Image
            src="/blog-image.jpg"
            alt="Blog"
            width={600}
            height={600}
            className="h-full w-full object-fit rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
