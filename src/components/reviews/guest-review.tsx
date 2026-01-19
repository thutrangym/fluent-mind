export default function GuestReview() {
  return (
    <div className="rounded-2xl border bg-white p-12 text-center shadow-lg">
      <h1 className="text-3xl font-bold">
        Unlock Your Review Journey
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-gray-500">
        Sign in to track your progress and review your learned sentences.
        Our spaced repetition system will help you remember better.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          "Track your learning progress",
          "Review sentences at the perfect time",
          "Build long-term memory effectively",
        ].map((text, i) => (
          <div
            key={i}
            className="rounded-xl border p-6 text-left"
          >
            <div className="mb-3 text-xl font-bold text-[#34DBC5]">
              {i + 1}
            </div>
            <p className="font-medium">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/login"
          className="inline-block rounded-xl bg-gradient-to-r from-[#88DF46] to-[#34DBC5] px-10 py-4 font-semibold text-white"
        >
          Sign in to Start Reviewing
        </a>
      </div>
    </div>
  );
}
