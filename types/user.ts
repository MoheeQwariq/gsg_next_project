export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    role: UserRole;
    imageUrl: string;
    profileId: number;
}

export type UserRole = "admin" | "user" | "guest";

export const defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    username: "",
    role: "guest",
    imageUrl: "/user.svg", 
    profileId: 0,
};
