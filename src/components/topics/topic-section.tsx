import VideoCard from "./video-card"

interface Video {
  id: string
  title: string | null
  youtubeId: string
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
}

interface Props {
  id: string
  title: string
  videos: Video[]
}

export default function TopicSection({
  id,
  title,
  videos
}: Props) {

  return (

    <section className="space-y-5">

      <div className="flex justify-between items-end">

        <div>

          <h2 className="text-xl md:text-2xl font-bold">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {videos.length} videos
          </p>

        </div>

        <a
          href={`/topics/${id}`}
          className="text-sm text-[#34DBC5] hover:underline"
        >
          View all →
        </a>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {videos.map(video => (

          <VideoCard
            key={video.id}
            {...video}
          />

        ))}

      </div>

    </section>

  )

}