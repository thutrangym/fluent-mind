import Link from "next/link"
import LevelBadge from "./level-badge"

export interface VideoCardProps {
  id: string
  title: string | null
  youtubeId: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
}

export default function VideoCard({
  title,
  youtubeId,
  level
}: VideoCardProps) {

  const thumbnail =
    `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

  return (

    <Link href={`/video/${youtubeId}`}>

      <div className="rounded-xl border bg-white hover:shadow-md transition overflow-hidden">

        <div className="relative">

          <img
            src={thumbnail}
            alt={title ?? "Video"}
            className="w-full h-40 object-cover"
          />

          <LevelBadge level={level} />

        </div>

        <div className="p-3">

          <h4 className="text-sm font-medium line-clamp-2">
            {title ?? "Untitled"}
          </h4>

        </div>

      </div>

    </Link>

  )

}