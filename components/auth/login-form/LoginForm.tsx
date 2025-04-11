"use client";

import React, { useState } from "react";
import FormInput from "@/components/auth/input-field/FormInput";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { validateLoginForm } from "@/utils/validation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

import loginFormStyles from "@/styles/auth/loginFormStyles"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, user } = useAuth(); 
  const router = useRouter();

  const { theme } = useTheme();
  const styles = loginFormStyles[theme];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateLoginForm(formData);
    if (!result.isValid) {
      const messages = Object.values(result.errors).join(" - ");
      setError(messages || "Error");
      return;
    }
    try {
      const result =await login({ email: formData.email, password: formData.password });
      if ( result === null)
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      else {
        if (result ==="admin")
          router.push("/admin");
        else 
          router.push("/blogs");
        
      }
    } catch (err) {
      console.error(err);
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>تسجيل الدخول</h1>
        <p className={styles.subtitle}>مرحبًا بك مجددًا في المنصة</p>
        {error && <div className={styles.errorBox}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id="email"
            name="email"
            type="email"
            label="البريد الإلكتروني"
            placeholder="you@example.com"
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
          <button type="submit" className={styles.submitButton}>
            تسجيل الدخول
          </button>
        </form>
        <p className={styles.signupMessage}>
          ليس لديك حساب؟{" "}
          <Link href="/auth/SignUp" className={styles.signupLink}>
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
