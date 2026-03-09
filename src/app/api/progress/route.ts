import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth-options";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  console.log("Progress API Body:", body);

  const { youtubeId, videoId, progress, lastTime, mode } = body;

  if (!youtubeId) return NextResponse.json({ error: "youtubeId missing" }, { status: 400 });
  if (!videoId) return NextResponse.json({ error: "videoId missing" }, { status: 400 });
  if (!mode) return NextResponse.json({ error: "mode missing" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const completed = progress >= 95;

  const selector = {
    userId_youtubeId_videoId_mode: {
      userId: user.id,
      youtubeId,
      videoId,
      mode: mode as any,
    },
  };

  const existing = await prisma.userProgress.findUnique({
    where: selector,
  });

  const data = await prisma.userProgress.upsert({
    where: selector,
    update: {
      progress,
      lastTime,
      completed,
    },
    create: {
      userId: user.id,
      youtubeId,
      videoId,
      progress,
      lastTime,
      completed,
      mode: mode as any,
    },
  });

  if (completed && !existing?.completed) {
    // Convert seconds to minutes for studyTime
    const studyMinutes = Math.floor((lastTime || 0) / 60) || 1;

    // Streak Logic (simplified)
    const stats = await prisma.userStats.findUnique({ where: { userId: user.id } });
    let newStreak = stats?.streak ?? 0;

    // If they haven't studied today yet, increment streak (very basic check)
    if (!stats || !stats.streak) {
      newStreak = 1;
    }

    await prisma.userStats.upsert({
      where: { userId: user.id },
      update: {
        videos: { increment: 1 },
        studyTime: { increment: studyMinutes },
        streak: newStreak
      },
      create: {
        userId: user.id,
        videos: 1,
        studyTime: studyMinutes,
        streak: 1
      },
    });

    await prisma.leaderboard.upsert({
      where: { userId: user.id },
      update: {
        xp: { increment: 20 },
      },
      create: {
        userId: user.id,
        xp: 20,
      },
    });
  }

  return NextResponse.json(data);
}