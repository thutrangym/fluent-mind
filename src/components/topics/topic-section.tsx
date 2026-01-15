import VideoCard, { VideoCardProps } from "./video-card";

interface TopicSectionProps {
  id: string;
  title: string;
  count: number;
  videos: VideoCardProps[];
}

export default function TopicSection({
  title,
  count,
  videos,
}: TopicSectionProps) {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-primary">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {count} videos
          </p>
        </div>

        <button className="hidden sm:inline-flex text-sm font-medium text-[#34DBC5] hover:underline">
          View all →
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </section>
  );
}
