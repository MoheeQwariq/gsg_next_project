"use client";
import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import FormInput from "@/components/auth/input-field/FormInput";
import PhotoUpload from "@/components/auth/input-field/PhotoUpload";
import { validateRegisterForm } from "@/utils/validation";
import { useTheme } from "@/context/ThemeContext";
import signUpFormStyles from "@/styles/auth/signUpFormStyles";
import { registerUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

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
  const { theme } = useTheme();
  const styles = signUpFormStyles[theme];
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (error) setError("");
    if (name === "photo" && files && files.length > 0) {
      setFormData({ ...formData, photo: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = validateRegisterForm(formData);
    if (!result.isValid) {
      const errorMessages = Object.values(result.errors).join(" - ");
      setError(errorMessages || "حدث خطأ غير متوقع");
      return;
    }
    try {
      const username = formData.email.split("@")[0];
      const payload = { ...formData, username };
      const resultreq = await registerUser(payload);
      if (typeof resultreq === "string") {
        setError(resultreq);
        return;
      }
      if (resultreq === null) {
        setError("حدث خطأ غير متوقع");
        return;
      }
      setError("تم التسجيل بنجاح");
      setFormData(initialFormData);
      setPreviewUrl(null);
      setTimeout(() => {
        router.push("/auth/login");
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("An unknown error occurred");
        setError("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formSection}>
          <div className={styles.headerContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.logoSvg}
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
            <h1 className={styles.title}>إنشاء حساب جديد</h1>
            <p className={styles.subtitle}>انضم إلينا لمشاركة قصتك</p>
          </div>
          {error && (
            <div className={error === "تم التسجيل بنجاح" ? styles.successBox : styles.errorBox}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
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
              rightIcon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              rightIcon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
            <button type="submit" className={styles.submitButton}>
              إنشاء الحساب
            </button>
          </form>
          <p className={styles.footerText}>
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className={styles.footerLink}>
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
