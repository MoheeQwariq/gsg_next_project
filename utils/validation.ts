import { IFormData} from "@/types/auth";

 interface IValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}


export const validateForm = (data: IFormData): IValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.name.trim()) {
    errors.name = "الاسم الكامل مطلوب";
  } else if (data.name.trim().length < 4) {
    errors.name = "الاسم الكامل يجب أن يكون على الأقل 4 أحرف";
  }

 
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
  }


  if (!data.password) {
    errors.password = "كلمة المرور مطلوبة";
  } else if (data.password.length < 8) {
    errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
  } else {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      errors.password =
        "يجب أن تحتوي على حرف كبير، حرف صغير، رقم، وحرف خاص (@$!%*?&)";
    }
  }


  if (!data.confirmPassword) {
    errors.confirmPassword = "تأكيد كلمة المرور مطلوب";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "كلمات المرور غير متطابقة";
  }

  if (!data.birthday) {
    errors.birthday = "تاريخ الميلاد مطلوب";
  } else {
    const birthDate = new Date(data.birthday);
    const currentDate = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(currentDate.getFullYear() - 18);
    if (birthDate > minAgeDate) {
      errors.birthday = "يجب أن يكون عمرك 18 سنة على الأقل";
    }
  }
  
  if (!data.photo) {
    errors.photo = "الصورة الشخصية مطلوبة";
  } else {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(data.photo.type)) {
      errors.photo = "يجب أن تكون الصورة من نوع JPG, PNG, أو GIF";
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (data.photo.size > maxSize) {
      errors.photo = "حجم الصورة يجب أن لا يتجاوز 2MB";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
