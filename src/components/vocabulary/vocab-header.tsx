export default function VocabHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Learn English Vocabulary</h1>
        <p className="text-sm text-gray-500">
          Master English vocabulary with spaced repetition
        </p>
      </div>

      <div className="flex gap-3">
        <button className="rounded-lg border px-4 py-2 text-sm">
          Saved Vocabulary
        </button>
        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white">
          What is Spaced Repetition?
        </button>
      </div>
    </div>
  );
}
