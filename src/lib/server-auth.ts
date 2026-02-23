import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";

export async function validateRequest() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { user: null };
  }

  return {
    user: session.user,
  };
}

export async function requireUser() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}