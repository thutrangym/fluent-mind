"use client";

export default function CommentForm() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold">Leave a comment</h2>

      <textarea
        placeholder="Write your comment here..."
        className="h-32 w-full rounded-lg border p-4 text-sm focus:ring-2 focus:ring-[#34DBC5]"
      />

      <div className="mt-4 flex justify-end">
        <button className="rounded-lg bg-[#34DBC5] px-6 py-2 font-medium text-white">
          Post Comment
        </button>
      </div>
    </div>
  );
}
