export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    role: UserRole;
  }

export type UserRole = "admin" | "user" | "guest";