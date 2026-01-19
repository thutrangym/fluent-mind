import VocabHeader from "@/src/components/vocabulary/vocab-header";
import LearningStats from "@/src/components/vocabulary/learning-stats";
import VocabStatus from "@/src/components/vocabulary/vocab-status";
import MyDecks from "@/src/components/vocabulary/my-decks";
import CommunityDecks from "@/src/components/vocabulary/community-decks";
import LeaderboardCard from "@/src/components/leaderboard/leaderboard-card";

export default function VocabularyPage() {
  const isAuthenticated = true; 

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <VocabHeader />

        {isAuthenticated && <LearningStats />}

        <VocabStatus />

        <LeaderboardCard />

        {isAuthenticated && <MyDecks />}

        <CommunityDecks />
      </div>
    </main>
  );
}
