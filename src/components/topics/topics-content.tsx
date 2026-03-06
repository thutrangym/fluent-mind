"use client"

import { useEffect, useState } from "react"
import TopicsHeader from "./topics-header"
import TopicSection from "./topic-section"
import TopicsTags from "./topics-tags"

export type LevelType = "beginner" | "experienced"

interface Video {
  id: string
  title: string | null
  youtubeId: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
}

interface Topic {
  id: string
  title: string | null
  videos: Video[]
}

export default function TopicsPageClient() {

  const [level, setLevel] = useState<LevelType>("beginner")
  const [topics, setTopics] = useState<Topic[]>([])
  const [limit, setLimit] = useState(4)

  /* ---------------- SCREEN SIZE ---------------- */

  useEffect(() => {

    const updateLimit = () => {

      const width = window.innerWidth

      if (width < 640) {
        setLimit(2) // mobile
      } else {
        setLimit(4) // tablet + desktop
      }

    }

    updateLimit()

    window.addEventListener("resize", updateLimit)

    return () =>
      window.removeEventListener("resize", updateLimit)

  }, [])

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {

    const load = async () => {

      const res = await fetch(`/api/topics?level=${level}`)
      const data = await res.json()

      setTopics(data)

    }

    load()

  }, [level])

  return (

    <main className="min-h-screen bg-[#FAFFF6] mx-auto px-4 py-10 space-y-10">

      <TopicsHeader
        level={level}
        onChange={setLevel}
      />
      <TopicsTags />
      {topics
        .filter(topic => topic.videos.length > 0)
        .map(topic => (

          <TopicSection
            key={topic.id}
            id={topic.id}
            title={topic.title ?? "Topic"}
            videos={topic.videos.slice(0, limit)}
          />

      ))}

    </main>

  )

}