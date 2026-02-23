/* =========================
   AUTH TYPES
========================= */

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth-options"
import { prisma } from "@/src/lib/prisma"

export type UserRole = "guest" | "user" | "admin"
export type UserTier = "free" | "premium"

export type AuthUser = {
  id: string
  name: string
  email: string
  image?: string
  role: UserRole
  tier: UserTier
  level: string
  stats: {
    streak: number
    videos: number
    rank: number
    studyTime: string
  }
}

/* =========================
   SERVER FUNCTIONS
========================= */

/** Get current user from session */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) return null

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!dbUser) return null

  return {
    id: dbUser.id,
    name: dbUser.name ?? "User",
    email: dbUser.email,
    image: dbUser.image ?? "/avatar-placeholder.png",
    role: dbUser.role.toLowerCase() as UserRole,
    tier: dbUser.tier.toLowerCase() as UserTier,
    level: dbUser.level ?? "Beginner",
    stats: {
      streak: 0,
      videos: 0,
      rank: 0,
      studyTime: "0h"
    }
  }
}

/** Require login */
export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

/** Require admin */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireUser()
  if (user.role !== "admin") {
    throw new Error("Forbidden")
  }
  return user
}

/* =========================
   SHARED HELPERS
========================= */

export function isAdmin(user: AuthUser | null) {
  return user?.role === "admin"
}

export function isPremium(user: AuthUser | null) {
  return user?.tier === "premium"
}