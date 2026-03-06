"use client"

import YouTube, { YouTubeEvent } from "react-youtube"
import { YouTubePlayer } from "react-youtube"

interface Props {
  youtubeId: string
  onReady: (player: YouTubePlayer) => void
}

export default function VideoPlayer({ youtubeId, onReady }: Props) {

  const handleReady = (event: YouTubeEvent) => {
    onReady(event.target)
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