import LeaderboardHeader from "@/src/components/leaderboard/leaderboard-header";
import Countdown from "@/src/components/leaderboard/countdown";
import MonthlyRewards from "@/src/components/leaderboard/monthly-rewards";
import RankingList from "@/src/components/leaderboard/ranking-list";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <LeaderboardHeader />
        <Countdown />
        <MonthlyRewards />
        <RankingList />
      </div>
    </main>
  );
}
