export default function CommunityDecks() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Browse Community Decks</h2>
        <button className="text-sm text-blue-500">Explore</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          "1000 Common English Words",
          "Conversational English Vocabulary",
        ].map((title) => (
          <div key={title} className="rounded-lg border p-4">
            <p className="font-medium">{title}</p>
            <button className="mt-3 w-full rounded-lg bg-gray-900 py-2 text-sm text-white">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
