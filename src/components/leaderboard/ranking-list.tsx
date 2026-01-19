import { leaderboardUsers } from "./../../data/leaderboard.mock";

type Props = {
  limit?: number;
};

export default function RankingList({ limit }: Props) {
  const users = limit
    ? leaderboardUsers.slice(0, limit)
    : leaderboardUsers;

  return (
    <ul className="space-y-3">
      {users.map((user) => (
        <li
          key={user.rank}
          className={`flex items-center justify-between rounded-xl border p-4 transition ${
            user.rank <= 3
              ? "border-yellow-300 bg-yellow-50"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="w-6 text-sm font-bold">
              {user.rank}
            </span>

            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">
                ⏱ {user.time} • ✍ {user.sentences} sentences
              </p>
            </div>
          </div>

          <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
            #{user.rank}
          </span>
        </li>
      ))}
    </ul>
  );
}
