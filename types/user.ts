export interface User {
  id: number;
  name: string;
  email: string;
  password:string
  role: UserRole;
  imageUrl?: string | null; 
  username:string;
  profileId: number;
  }
    
   

export type UserRole = "admin" | "user" | "guest";

export const defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    username: "",
    password:"",
    role: "guest",
    imageUrl: "/user.svg", 
    profileId: 0,
};
