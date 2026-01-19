export default function Countdown() {
  return (
    <div className="rounded-xl border bg-purple-50 p-6 text-center">
      <p className="mb-3 text-sm text-purple-600">
        Leaderboard closes in:
      </p>

      <div className="flex justify-center gap-4 text-sm">
        {[
          { label: "Days", value: "14" },
          { label: "Hours", value: "15" },
          { label: "Minutes", value: "05" },
          { label: "Seconds", value: "51" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-white px-4 py-2 shadow"
          >
            <p className="text-xl font-bold text-purple-700">
              {item.value}
            </p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <button className="rounded-lg border px-3 py-1">
          ← Previous Month
        </button>
        <span className="font-medium text-purple-600">
          January 2026
        </span>
        <button className="rounded-lg border px-3 py-1">
          Next Month →
        </button>
      </div>
    </div>
  );
}
