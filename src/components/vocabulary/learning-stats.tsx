export default function LearningStats() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold">Learning Statistics</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Cards", value: 22 },
          { label: "Total Reviews", value: 22 },
          { label: "Due", value: 2 },
          { label: "Accuracy", value: "100%" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white">
        Review Now (2)
      </button>
    </div>
  );
}
