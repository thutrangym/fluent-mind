import RankingList from "./ranking-list";

export default function LeaderboardCard() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Leaderboard</h2>
          <p className="text-xs text-gray-500">
            Top learners this month
          </p>
        </div>

        <a
          href="/leaderboard"
          className="text-sm font-medium text-[#34DBC5] hover:underline"
        >
          View all →
        </a>
      </div>

      <RankingList limit={3} />
    </div>
  );
}
