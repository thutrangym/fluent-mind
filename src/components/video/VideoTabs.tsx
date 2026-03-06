"use client"

import { useState } from "react"
import VideoModule from "./VideoModule"
import ShadowingMode from "./ShadowingMode"
import DictationMode from "./DictationMode"
import { Subtitle } from "@/src/types/subtitle"

interface Props {
  youtubeId: string
  subtitles: Subtitle[]
}

export default function VideoTabs({ youtubeId, subtitles }: Props) {
  const [tab, setTab] = useState<"video" | "shadowing" | "dictation">("video")

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-3 bg-gray-100 p-2 rounded-xl w-fit">
        <button
          onClick={() => setTab("video")}
          className={`px-4 py-2 rounded-lg ${
            tab === "video" ? "bg-green-500 text-white" : ""
          }`}
        >
          Video
        </button>

        <button
          onClick={() => setTab("shadowing")}
          className={`px-4 py-2 rounded-lg ${
            tab === "shadowing" ? "bg-green-500 text-white" : ""
          }`}
        >
          Shadowing
        </button>

        <button
          onClick={() => setTab("dictation")}
          className={`px-4 py-2 rounded-lg ${
            tab === "dictation" ? "bg-green-500 text-white" : ""
          }`}
        >
          Dictation
        </button>
      </div>

      {/* Content */}
      {tab === "video" && (
        <VideoModule youtubeId={youtubeId} subtitles={subtitles} />
      )}

      {tab === "shadowing" && (
        <ShadowingMode youtubeId={youtubeId} subtitles={subtitles} />
      )}

      {tab === "dictation" && (
        <DictationMode youtubeId={youtubeId} subtitles={subtitles} />
      )}
    </div>
  )
}