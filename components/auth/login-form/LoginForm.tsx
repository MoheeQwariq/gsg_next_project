"use client";

import React, { useState } from "react";
import FormInput from "@/components/auth/input-field/FormInput";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/utils/validation";
import { useAuth } from "@/context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateLoginForm(formData);

    if (!result.isValid) {
      const messages = Object.values(result.errors).join(" - ");
      setError(messages || "ُError");
      return;
    }

    if (
      formData.email === "lama2015678@gmail.com" &&
      formData.password === "Lama1234@@"
    ) {
      login();
      router.push("/blogs");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rtl">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          تسجيل الدخول
        </h1>
        <p className="text-gray-500 text-center mb-6">
          مرحبًا بك مجددًا في المنصة
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm border border-red-100 text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            icon={<Mail size={20} />}
            value={formData.email}
            onChange={handleChange}
          />

          <FormInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            label="كلمة المرور"
            placeholder="********"
            icon={<Lock size={20} />}
            rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            onRightIcon={() => setShowPassword(!showPassword)}
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          ليس لديك حساب؟{" "}
          <Link
            href="/auth/SignUp"
            className="text-blue-600 hover:text-blue-800 font-medium mr-1"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
