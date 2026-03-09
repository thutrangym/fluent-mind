"use client";

import { useEffect, useState } from "react";

type Props = {
  limit?: number;
};

type LeaderboardUser = {
  id: string;
  xp: number;
  user: {
    name: string | null;
    email: string;
  };
};

export default function RankingList({ limit }: Props) {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();

      setUsers(limit ? data.slice(0, limit) : data);
      setLoading(false);
    }

    loadLeaderboard();
  }, [limit]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading leaderboard...</p>;
  }

  return (
    <ul className="space-y-3">
      {users.map((item, index) => {
        const rank = index + 1;

        return (
          <li
            key={item.id}
            className={`flex items-center justify-between rounded-xl border p-4 transition ${
              rank <= 3
                ? "border-yellow-300 bg-yellow-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 text-sm font-bold">{rank}</span>

              <div>
                <p className="font-medium">
                  {item.user.name || item.user.email}
                </p>

                <p className="text-xs text-gray-500">
                  ⭐ {item.xp} XP
                </p>
              </div>
            </div>

            <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
              #{rank}
            </span>
          </li>
        );
      })}
    </ul>
  );
}