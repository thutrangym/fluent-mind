import GuestReview from "@/src/components/reviews/guest-review";
import ReviewTabs from "@/src/components/reviews/review-tabs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;

  return (
    <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {isAuthenticated ? <ReviewTabs /> : <GuestReview />}
      </div>
    </main>
  );
}
