"use server"

import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const existing = await prisma.user.findUnique({
    where: { email }
  })

  if (existing) {
    return { error: "Email already exists" }
  }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: "user",
      stats: {
        create: {}
      }
    }
  })

  return { success: true }
}