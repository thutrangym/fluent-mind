import VideoTabs from "@/src/components/video/VideoTabs";
import { prisma } from "@/src/lib/prisma";

interface Props {
  params: Promise<{
    youtubeId: string;
  }>;
}

export default async function VideoPage({ params }: Props) {
  const { youtubeId } = await params;

  const video = await prisma.video.findUnique({
    where: {
      youtubeId: youtubeId,
    },
    include: {
      subtitles: true,
    },
  });

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <main className=" bg-[#FAFFF6]   py-10">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{video.title}</h1>

      <VideoTabs youtubeId={video.youtubeId} subtitles={video.subtitles} />
      </div>

    </main>
  );
}
