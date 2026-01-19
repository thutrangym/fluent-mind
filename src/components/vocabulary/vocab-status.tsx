export default function VocabStatus() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold">Vocabulary Status</h2>

      <div className="grid grid-cols-4 gap-4 text-center text-sm">
        {[
          { label: "Learning", value: 2, color: "bg-cyan-400" },
          { label: "Reviewing", value: 0, color: "bg-blue-500" },
          { label: "Mastered", value: 0, color: "bg-green-500" },
          { label: "Total", value: 2, color: "bg-red-400" },
        ].map((item) => (
          <div key={item.label}>
            <div className={`h-2 rounded-full ${item.color}`} />
            <p className="mt-2 font-medium">{item.value}</p>
            <p className="text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
