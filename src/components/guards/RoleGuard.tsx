"use client";

import { ReactNode } from "react";
import { useAuth } from "@/src/hooks/useAuth";

type Role = "guest" | "user" | "admin";

interface RoleGuardProps {
  /** Các role được phép truy cập */
  allow: Role[];

  /** Nội dung hiển thị khi KHÔNG đủ role */
  fallback?: ReactNode;

  children: ReactNode;
}

export default function RoleGuard({
  allow,
  fallback = null,
  children,
}: RoleGuardProps) {
  const { user, isLoggedIn } = useAuth();

  const currentRole: Role = !isLoggedIn
    ? "guest"
    : user?.role === "admin"
    ? "admin"
    : "user";

  if (!allow.includes(currentRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
