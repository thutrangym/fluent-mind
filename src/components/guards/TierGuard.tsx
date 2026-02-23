"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

type Tier = "free" | "premium";

interface TierGuardProps {
  allow: Tier[];

  fallback?: ReactNode;

  children: ReactNode;
}

export default function TierGuard({
  allow,
  fallback = null,
  children,
}: TierGuardProps) {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  const userTier: Tier =
    isLoggedIn && session?.user?.role === "premium"
      ? "premium"
      : "free";

  if (isLoading) return null;

  if (!allow.includes(userTier)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}