import ProfileClient from "./ProfileClient";
import { getCurrentUser } from "@/src/lib/auth"; // server function

export default async function ProfilePage() {
  const user = await getCurrentUser(); // fetch từ session / DB

  return (
    <div className="space-y-6 bg-[#FAFFF6]">
      <ProfileClient user={user} />
    </div>
  );
}
