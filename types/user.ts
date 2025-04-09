export interface User {
  id: number;
  name: string;
  email: string;
  password:string
  role: UserRole;
  avatar?: string | null; 
  username:string
  }

export type UserRole = "admin" | "user" | "guest";