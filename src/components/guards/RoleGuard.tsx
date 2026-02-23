"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

type Role = "guest" | "user" | "admin";

interface RoleGuardProps {
  allow: Role[];

  fallback?: ReactNode;

  children: ReactNode;
}

export default function RoleGuard({
  allow,
  fallback = null,
  children,
}: RoleGuardProps) {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";
  const user = session?.user ?? null;

  const currentRole: Role = !isLoggedIn
    ? "guest"
    : user?.role === "admin"
    ? "admin"
    : "user";

  if (isLoading) return null;

  if (!allow.includes(currentRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
