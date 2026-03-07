"use client"

import { useState } from "react"
import VideoModule from "./VideoModule"
import ShadowingMode from "./ShadowingMode"
import DictationMode from "./DictationMode"
import { Subtitle } from "@/src/types/subtitle"

type TabType = "video" | "shadowing" | "dictation"

interface Props {
  videoId: string
  youtubeId: string
  subtitles: Subtitle[]
  lastTime?: number
}

export default function VideoTabs({ videoId, youtubeId, subtitles, lastTime }: Props) {
  const [tab, setTab] = useState<TabType>("video")

  const tabs: { key: TabType; label: string }[] = [
    { key: "video", label: "Video" },
    { key: "shadowing", label: "Shadowing" },
    { key: "dictation", label: "Dictation" }
  ]

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-3 bg-gray-100 p-2 rounded-xl w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg transition ${
              tab === t.key
                ? "bg-green-500 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "video" && (
        <VideoModule
          videoId={videoId}
          youtubeId={youtubeId}
          subtitles={subtitles}
          
        />
      )}

      {tab === "shadowing" && (
        <ShadowingMode
          videoId={videoId}
          youtubeId={youtubeId}
          subtitles={subtitles}
        />
      )}

      {tab === "dictation" && (
        <DictationMode
          videoId={videoId}
          youtubeId={youtubeId}
          subtitles={subtitles}
        />
      )}
    </div>
  )
}