"use client"

import { useEffect, useRef } from "react"
import YouTube, { YouTubeEvent } from "react-youtube"
import { YouTubePlayer } from "react-youtube"

interface Props {
  youtubeId: string
  videoId: string
  lastTime?: number
  onReady?: (player: YouTubePlayer) => void
}

export default function VideoPlayer({ youtubeId, videoId, lastTime, onReady }: Props) {
  const playerRef = useRef<YouTubePlayer | null>(null)

  const handleReady = (event: YouTubeEvent) => {
    playerRef.current = event.target
    onReady?.(event.target)

    if (lastTime) {
    event.target.seekTo(lastTime)
  }

  onReady?.(event.target)
  }

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1
    }
  }

  /* ================= SAVE PROGRESS ================= */

  useEffect(() => {
  const interval = setInterval(async () => {

    if (!playerRef.current) return

    const currentTime = playerRef.current.getCurrentTime()
    const duration = playerRef.current.getDuration()

    if (!duration) return

    const progress = Math.floor((currentTime / duration) * 100)

    await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        youtubeId,
        progress,
        lastTime: Math.floor(currentTime)
      })
    })

  }, 5000)

  return () => clearInterval(interval)
}, [youtubeId])

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <YouTube
        videoId={youtubeId}
        opts={opts}
        onReady={handleReady}
        className="w-full h-full"
      />
    </div>
  )
}