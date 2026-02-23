"use server";

import { prisma } from "@/src/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";

export async function login(
  formData: FormData
): Promise<{ error?: string }> {
  try {
const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        name: true,
      },
    });

    if (!existingUser || !existingUser.password) {
      return { error: "Invalid email or password" };
    }

    const validPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!validPassword) {
      return { error: "Invalid email or password" };
    }


    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Authentication failed." };
    }

    // Redirect theo role
    if (existingUser.role === "admin") {
      redirect("/admin");
    }

    redirect("/dashboard");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
}