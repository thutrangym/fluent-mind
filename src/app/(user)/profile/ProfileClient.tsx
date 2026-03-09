"use client"

import Image from "next/image"
import Link from "next/link"
import { Sparkles, Flame, Clock, Trophy } from "lucide-react"
import avatarPlaceholder from "@/src/assets/avatar_placeholder.jpg"
import { useState } from "react"

type Progress = {
  id: string
  youtubeId: string
  progress: number
  completed: boolean
  lastTime: number
  mode: "dictation" | "shadowing"

  video: {
    youtubeId: string
    title: string | null
  }
}

type ProfileUser = {
  id: string
  name: string
  email: string
  image: string | null
  tier: "free" | "premium"
  level: string

  stats: {
    streak: number
    videos: number
    rank: number
    studyTime: number
  } | null

  progress: Progress[]
}

type Props = {
  user: ProfileUser | null
}

export default function ProfileClient({ user }: Props) {
  const [tab, setTab] = useState<"dictation" | "shadowing">("dictation")

  if (!user) return null

  const isFree = user.tier === "free"

  const filteredProgress = user.progress.filter(
    (p) => p.mode === tab
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">

      {/* HEADER */}
      <section className="rounded-3xl bg-gradient-to-r from-[#34DBC5]/10 to-[#88DF46]/10 p-6 flex flex-col md:flex-row items-center gap-6">

        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={user.image || avatarPlaceholder}
            alt="avatar"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <h1 className="text-2xl font-black">{user.name}</h1>

          <p className="text-sm text-gray-500">{user.email}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-600">
              {user.level}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                isFree
                  ? "bg-gray-200 text-gray-600"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {user.tier.toUpperCase()}
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

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <StatCard
          icon={Flame}
          label="Streak"
          value={`${user.stats?.streak ?? 0} days`}
        />

        <StatCard
          icon={Trophy}
          label="Videos"
          value={user.stats?.videos ?? 0}
        />

        <StatCard
          icon={Clock}
          label="Study Time"
          value={`${user.stats?.studyTime ?? 0} min`}
        />

        <StatCard
          icon={Sparkles}
          label="Rank"
          value={`#${user.stats?.rank ?? 0}`}
        />

      </section>

      {/* LESSON PROGRESS */}
      <section className="space-y-4">

        <h2 className="text-lg font-bold">
          Lesson Progress
        </h2>

        {/* Tabs */}
        <div className="flex gap-2">

          <button
            onClick={() => setTab("dictation")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              tab === "dictation"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Dictation
          </button>

          <button
            onClick={() => setTab("shadowing")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              tab === "shadowing"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Shadowing
          </button>

        </div>

        {/* Progress List */}
        {filteredProgress.length === 0 ? (

          <p className="text-sm text-gray-500">
            No lessons found
          </p>

        ) : (

          <div className="space-y-3">

            {filteredProgress.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >

                <Image
                  src={`https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`}
                  alt={item.video.title ?? "Video"}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />

                <div className="flex-1">

                  <p className="text-sm font-medium">
                    {item.video.title ?? "Untitled"}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-[#34DBC5]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                </div>

                {item.completed ? (
                  <span className="text-green-600 text-xs font-bold">
                    Completed
                  </span>
                ) : (
                  <span className="text-yellow-500 text-xs font-bold">
                    In Progress
                  </span>
                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 p-4 shadow-sm flex items-center gap-3">

      <Icon className="w-6 h-6 text-[#34DBC5]" />

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="font-bold">
          {value}
        </p>
      </div>

    </div>
  )
}