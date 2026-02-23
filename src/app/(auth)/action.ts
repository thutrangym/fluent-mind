"use server"

import { requireUser } from "@/src/lib/auth"
import { redirect } from "next/navigation"

export async function redirectAfterLogin() {
  try {
    const user = await requireUser()

    if (user.role === "admin") {
      redirect("/admin")
    }

    redirect("/dashboard")
  } catch {
    redirect("/login")
  }
}