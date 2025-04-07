export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  avatar?: string | null; 
  username:string
  }

export type UserRole = "admin" | "user" | "guest";