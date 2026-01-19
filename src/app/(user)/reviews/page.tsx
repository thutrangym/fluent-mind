import GuestReview from "@/src/components/reviews/guest-review";
import ReviewTabs from "@/src/components/reviews/review-tabs";

export default function ReviewPage() {
  const isAuthenticated = true; 

  return (
    <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {isAuthenticated ? <ReviewTabs /> : <GuestReview />}
      </div>
    </main>
  );
}
