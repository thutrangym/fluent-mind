import LearningStats from "@/src/components/vocabulary/LearningStats";
import MyDecks from "@/src/components/vocabulary/MyDeck";
import CommunityDecks from "@/src/components/vocabulary/CommunityDecks";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";
import GuestReview from "@/src/components/reviews/guest-review";
import { redirect } from "next/navigation";
import prisma from "@/src/lib/prisma";

export default async function VocabularyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
      return (
        <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <GuestReview />
          </div>
        </main>
      );
    }
  
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
  
    if (!user) redirect("/login");
  return (
    <main className="bg-[#FAFFF6]">
      <div className=" p-8 max-w-7xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Vocabulary Dashboard</h1>
          <p className="text-gray-500">Track your learning progress and manage your vocabulary decks.</p>
        </header>

        <section>
          <LearningStats />
        </section>

        <div className="h-px bg-gray-200 w-full" />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">My Decks</h2>
            <Link
              href="/vocabulary/decks"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create / Manage Decks
            </Link>
          </div>
          <MyDecks />
        </section>

        <div className="h-px bg-gray-200 w-full" />

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Community Decks</h2>
            <span className="text-sm text-gray-500">Discover public decks from other learners</span>
          </div>
          <CommunityDecks />
        </section>
      </div>

    </main>
  );
}