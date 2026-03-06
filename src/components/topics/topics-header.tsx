"use client"

import clsx from "clsx"

export type LevelType = "beginner" | "experienced"

interface Props {
  level: LevelType
  onChange: (level: LevelType) => void
}

export default function TopicsHeader({ level, onChange }: Props) {

  return (

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <button
        onClick={() => onChange("beginner")}
        className={clsx(
          "group relative rounded-2xl border p-6 text-left transition",
          level === "beginner"
            ? "border-[#88DF46] bg-[#88DF46]/10"
            : "border-muted"
        )}
      >
        <h3 className="font-semibold text-lg">
          🌱 Beginner
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          A1 - A2 basic listening
        </p>

      </button>

      <button
        onClick={() => onChange("experienced")}
        className={clsx(
          "group relative rounded-2xl border p-6 text-left transition",
          level === "experienced"
            ? "border-[#34DBC5] bg-[#34DBC5]/10"
            : "border-muted"
        )}
      >
        <h3 className="font-semibold text-lg">
          🚀 Experienced
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          B1 - C2 advanced listening
        </p>

      </button>

    </section>

  )

}