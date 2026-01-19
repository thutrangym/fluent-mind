import LeaderboardHeader from "./leaderboard-header";
import Countdown from "./countdown";
import MonthlyRewards from "./monthly-rewards";
import RankingList from "./ranking-list";

export default function LeaderboardFull() {
  return (
    <div className="space-y-8">
      <LeaderboardHeader />
      <Countdown />
      <MonthlyRewards />

      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Monthly Ranking</h2>
          <span className="text-xs text-gray-500">
            Last updated: 17/01/2026 07:01
          </span>
        </div>

        <RankingList />
      </div>
    </div>
  );
}
