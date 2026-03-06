"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Flame, Clock, Trophy } from "lucide-react";
import { User } from "@prisma/client"

type Props = {
  user: User | null
}

export default function ProfileClient({ user }: Props) {
const isFree = user?.tier === "free";
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">

      {/* ===== HEADER ===== */}
      <section className="rounded-3xl bg-gradient-to-r from-[#34DBC5]/10 to-[#88DF46]/10 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={user?.image || "/avatar-placeholder.png"}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <h1 className="text-2xl font-black">{user?.name}</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600">
              Level {user?.level}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isFree
                  ? "bg-gray-200 text-gray-600"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {user?.tier.toUpperCase()}
            </span>
          </div>
        </div>

        {isFree && (
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 transition"
          >
            <Sparkles className="w-4 h-4" />
            Upgrade
          </Link>
        )}
      </section>

      {/* ===== STATS ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Streak" value={`${user.stats.streak} days`} />
        <StatCard icon={Trophy} label="Videos" value={user.stats.videos} />
        <StatCard icon={Clock} label="Study Time" value={user.stats.studyTime} />
        <StatCard icon={Sparkles} label="Rank" value={`#${user.stats.rank}`} />
      </section>

      {/* ===== LEARNING PROGRESS ===== */}
      <section className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <h2 className="font-bold text-lg">Continue Learning</h2>

        <div className="rounded-xl bg-gray-100 dark:bg-gray-800 p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Daily Conversation Shadowing</p>
            <p className="text-xs text-gray-500">Progress: 80%</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#34DBC5] text-white font-bold">
            Continue
          </button>
        </div>

        {isFree && (
          <p className="text-xs text-amber-600">
            ⚠️ Shadowing is limited to 10 sessions/day on Free plan.
          </p>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 shadow-sm flex items-center gap-3">
      <Icon className="w-6 h-6 text-[#34DBC5]" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}
