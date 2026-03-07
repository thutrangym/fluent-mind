import GuestReview from "@/src/components/reviews/guest-review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";
import VideoTabs from "@/src/components/video/VideoTabs";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";

export default async function ReviewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <GuestReview />
        </div>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) redirect("/login");

  const lastProgress = await prisma.userProgress.findFirst({
  where: {
    userId: user.id,
    completed: false
  },
  orderBy: {
    updatedAt: "desc"
  },
  include: {
    video: {
      include: {
        subtitles: {
          orderBy: {
            startTime: "asc"
          }
        }
      }
    }
  }
})

  if (!lastProgress) {
    return (
      <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
        <div className="mx-auto max-w-6xl text-center text-gray-500">
          You haven&apos;t started learning yet.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFFF6] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <VideoTabs
         videoId={lastProgress.video.id}
          youtubeId={lastProgress.video.youtubeId}
          subtitles={lastProgress.video.subtitles}
          lastTime={lastProgress.lastTime}
        />
      </div>
    </main>
  );
}