"use client";

import { useMemo } from "react";

export type UserRole = "guest" | "user" | "admin";
export type UserTier = "free" | "premium";

export interface AuthUser {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  tier: UserTier;
}

export function useAuth() {

  const user: AuthUser | null = {
    id: "u_001",
    name: "Trang",
    role: "admin",
    tier: "premium",
    avatar: "/src/assets/avatar_placeholder.jpg"
  };
  // const user: AuthUser | null = null;

  const auth = useMemo(() => {
    return {
      user,
      isLoggedIn: !!user,
      isGuest: !user,
      isAdmin: user?.role === "admin",
      isPremium: user?.tier === "premium",
    };
  }, [user]);

  return auth;
}
