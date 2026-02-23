import { requireAdmin } from "@/src/lib/auth";
import UsersClient from "./UsersClient";

/**
 * Admin – Manage Users Page (Server Component)
 */
export default async function ManageUserPage() {
  // 🔐 Bắt buộc admin
  await requireAdmin();

  return (
    <div className="space-y-6 bg-[#FAFFF6] ">
      <UsersClient />
    </div>
  );
}
