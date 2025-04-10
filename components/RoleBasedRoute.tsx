"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ("user" | "admin" |"guest")[];
  redirectTo?: string;
}

export default function RoleBasedRoute({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
}: RoleBasedRouteProps) {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push(user.role === "admin" ? "/admin" : "/blogs");
    }
  }, [isLoggedIn, user, allowedRoles, router]);

  if (!isLoggedIn || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
