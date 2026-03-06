"use client"

import { Subtitle } from "../../types/subtitle"

interface Props {
  subtitles: Subtitle[]
  currentIndex: number
  onJump: (time: number) => void
}

export default function SubtitleList({
  subtitles,
  currentIndex,
  onJump
}: Props) {
  return (
    <div className="h-[600px] overflow-y-auto rounded-xl border bg-white shadow">

      {subtitles.map((sub, index) => {
        const active = index === currentIndex

        return (
          <div
            key={sub.id}
            onClick={() => onJump(sub.startTime)}
            className={`
              flex gap-4 px-5 py-4 cursor-pointer transition
              border-b last:border-none
              ${
                active
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "hover:bg-gray-50"
              }
            `}
          >
            {/* timestamp */}
            <div className="text-sm text-gray-400 w-[60px] flex-shrink-0">
              {sub.startTime.toFixed(2)}
            </div>

            {/* subtitle text */}
            <div
              className={`
                text-lg leading-relaxed
                ${active ? "font-semibold text-gray-900" : "text-gray-700"}
              `}
            >
              {sub.text}
            </div>
          </div>
        )
      })}
    </div>
  )
}