import ProfileClient from "./ProfileClient"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth-options"
import prisma from "@/src/lib/prisma"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      stats: true,
      videoProgress: {
        include: {
          video: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  // transform progress data
  const progress = user.videoProgress.map((p) => ({
    id: p.id,
    youtubeId: p.youtubeId,
    progress: p.progress,
    completed: p.completed,
    lastTime: p.lastTime,
    mode: p.mode,

    video: {
      youtubeId: p.video.youtubeId,
      title: p.video.title,
    },
  }))

  const profileUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    tier: user.tier,
    level: user.level,
    stats: user.stats,
    progress,
  }

  return (
    <main className="bg-[#FAFFF6]">
      <div className="space-y-6">
        <ProfileClient user={profileUser} />
      </div>
    </main>
  )
}