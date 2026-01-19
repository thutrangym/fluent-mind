export default function MyDecks() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">My Decks</h2>
        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white">
          + Create Deck
        </button>
      </div>

      <div className="rounded-lg border p-4">
        <p className="font-medium">test</p>
        <p className="text-sm text-gray-500">3 cards • 0 students</p>
      </div>
    </div>
  );
}
