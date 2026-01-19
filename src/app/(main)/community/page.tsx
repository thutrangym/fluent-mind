import CommunityHeader from "@/src/components/community/community-header";
import CommentForm from "@/src/components/community/comment-form";
import CommentList from "@/src/components/community/comment-list";

export default function CommunityPage() {
  const isAuthenticated = true;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <CommunityHeader />

        {isAuthenticated ? (
          <CommentForm />
        ) : (
          <div className="rounded-xl border bg-white p-6 text-center">
            <p className="text-gray-600">
              Sign in to join the discussion and share your thoughts ✨
            </p>
            <a
              href="/login"
              className="mt-4 inline-block rounded-lg bg-[#34DBC5] px-6 py-2 font-medium text-white"
            >
              Sign in
            </a>
          </div>
        )}

        <CommentList />
      </div>
    </main>
  );
}
