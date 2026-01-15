"use client";

import clsx from "clsx";
import { LevelType } from "./topics-page";

interface Props {
  level: LevelType;
  onChange: (level: LevelType) => void;
}

export default function TopicsHeader({ level, onChange }: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Beginner */}
      <button
        onClick={() => onChange("beginner")}
        className={clsx(
          "group relative rounded-2xl border p-6 text-left transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg",
          level === "beginner"
            ? "border-[#88DF46] bg-gradient-to-br from-[#88DF46]/15 to-[#34DBC5]/10 shadow-md"
            : "border-muted hover:border-[#88DF46]/60"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-xl text-xl transition",
              level === "beginner"
                ? "bg-[#88DF46] text-white"
                : "bg-[#88DF46]/10 text-[#88DF46]"
            )}
          >
            🌱
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary">
              Beginner Learner
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Start from the basics: pronunciation, slow listening,
              short conversations.
            </p>
          </div>
        </div>

        {level === "beginner" && (
          <span className="absolute right-4 top-4 rounded-full bg-[#88DF46] px-3 py-1 text-xs font-semibold text-white">
            Recommended
          </span>
        )}
      </button>

      {/* Experienced */}
      <button
        onClick={() => onChange("experienced")}
        className={clsx(
          "group relative rounded-2xl border p-6 text-left transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg",
          level === "experienced"
            ? "border-[#34DBC5] bg-gradient-to-br from-[#34DBC5]/15 to-[#88DF46]/10 shadow-md"
            : "border-muted hover:border-[#34DBC5]/60"
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={clsx(
              "flex h-12 w-12 items-center justify-center rounded-xl text-xl transition",
              level === "experienced"
                ? "bg-[#34DBC5] text-white"
                : "bg-[#34DBC5]/10 text-[#34DBC5]"
            )}
          >
            🚀
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary">
              Experienced Learner
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Natural speed, longer content, advanced vocabulary
              and real-life topics.
            </p>
          </div>
        </div>

        {level === "experienced" && (
          <span className="absolute right-4 top-4 rounded-full bg-[#34DBC5] px-3 py-1 text-xs font-semibold text-white">
            Advanced
          </span>
        )}
      </button>
    </section>
  );
}
