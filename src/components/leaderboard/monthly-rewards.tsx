"use client";

import { useEffect, useState } from "react";

type LeaderboardUser = {
  id: string;
  xp: number;
  user: {
    name: string | null;
    email: string;
  };
};

export default function MonthlyRewards() {
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopUsers() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();

      setTopUsers(data.slice(0, 3));
      setLoading(false);
    }

    loadTopUsers();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border bg-purple-50 p-6 text-center">
        Loading rewards...
      </div>
    );
  }

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="rounded-xl border bg-purple-50 p-6 text-center">
      <h2 className="mb-4 flex items-center justify-center gap-2 font-semibold">
        🏆 Monthly Rewards
      </h2>

      <div className="flex justify-center gap-6">
        {topUsers.map((user, index) => (
          <div key={user.id}>
            <div className="mb-2 text-3xl">{medals[index]}</div>

            <p className="text-sm font-medium">
              {user.user.name || user.user.email}
            </p>

            <p className="text-xs text-gray-500">
              ⭐ {user.xp} XP
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        ✨ Top learners receive badges, avatar frames and diamonds at the end of the month ✨
      </p>
    </div>
  );
}