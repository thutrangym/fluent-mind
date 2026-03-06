"use client"

import { useEffect, useState } from "react"
import { Subtitle } from "@/src/types/subtitle"
import VideoPlayer from "./VideoPlayer"
import SubtitleList from "./SubtitleList"
import { YouTubePlayer } from "react-youtube"

interface Props {
  youtubeId: string
  subtitles: Subtitle[]
}

export default function VideoModule({ youtubeId, subtitles }: Props) {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  
  useEffect(() => {
    if (!player) return

    const interval = setInterval(() => {
      const time = player.getCurrentTime()

      const index = subtitles.findIndex(
        (s) => time >= s.startTime && time <= s.endTime
      )

      if (index !== currentIndex) {
        setCurrentIndex(index)
      }

      if (index !== -1 && time > subtitles[index].endTime) {
        player.pauseVideo()
      }

    }, 200)

    return () => clearInterval(interval)
  }, [player, subtitles, currentIndex])

  const jumpTo = (time: number) => {
    if (!player) return

    player.seekTo(time, true)
    player.playVideo()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Video */}
      <div className="lg:col-span-2">
        <VideoPlayer
          youtubeId={youtubeId}
          onReady={setPlayer}
        />
      </div>

      {/* Subtitle */}
      <SubtitleList
        subtitles={subtitles}
        currentIndex={currentIndex}
        onJump={jumpTo}
      />

    </div>
  )
}