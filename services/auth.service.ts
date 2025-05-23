// import { defaultUserProfile, UserProfile } from "@/types/profile";
// import { createProfile } from "./profile/profile.service";

export interface RegisterData {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    photo?: File | null;
  }
  export interface RegisterResponse {
    message: string;
  }

  export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    let response;

    if (data.photo) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("birthday", data.birthday);
      formData.append("photo", data.photo);
      
      response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: formData,
      });
    } else {
      response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
          confirmPassword: data.confirmPassword,
          birthday: data.birthday,
        }),
      });
    }

    const result = await response.json();
    if (!response.ok) {
      return (result.error || "حدث خطا غير متوقع");
    }
  //   const dealtProfile: UserProfile = {
  //     ...defaultUserProfile,
  //     id: result.user.id,        
  //     userId: result.user.id,   
  //     bio: "",           
  //   };
    
  //   try {
  //     await createProfile(dealtProfile);
  //     return {
  //       message: "تم إنشاء الحساب بنجاح",
  //     };
  //   } catch (error) {
  //     console.error("Error creating profile:", error);
  //   return result;
  // }
  return result;
}
