"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfileIndex() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn && user) {
      router.replace(`/profile/${user.username}`);
    }
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn) {
    return <div>Please log in to view your profile.</div>;
  }

  return null; 
}
