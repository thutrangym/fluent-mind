export default function MonthlyRewards() {
  return (
    <div className="rounded-xl border bg-purple-50 p-6 text-center">
      <h2 className="mb-4 flex items-center justify-center gap-2 font-semibold">
        🏆 Monthly Rewards
      </h2>

      <div className="flex justify-center gap-6">
        {[
          { rank: "#1", medal: "🥇" },
          { rank: "#2", medal: "🥈" },
          { rank: "#3", medal: "🥉" },
          { rank: "#50", medal: "🏅" },
        ].map((item) => (
          <div key={item.rank}>
            <div className="mb-2 text-3xl">{item.medal}</div>
            <p className="text-sm font-medium">{item.rank}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        ✨ Receive badges, avatar frames and diamonds at the end of the month ✨
      </p>
    </div>
  );
}
