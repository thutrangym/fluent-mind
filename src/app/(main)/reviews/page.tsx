import GuestReview from "@/src/components/review/guest-review";
import ReviewTabs from "@/src/components/review/review-tabs";

export default function ReviewPage() {
  const isAuthenticated = true; // MOCK ONLY

  return (
    <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {isAuthenticated ? <ReviewTabs /> : <GuestReview />}
      </div>
    </main>
  );
}
