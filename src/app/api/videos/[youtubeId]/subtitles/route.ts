import { prisma } from "@/src/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ youtubeId: string; id: string }> }
) {
  const { youtubeId } = await params;

  const video = await prisma.video.findFirst({
    where: {
      youtubeId: youtubeId
    }
  });

  if (!video) {
    return NextResponse.json({ error: "Video not found" });
  }

  const subtitles = await prisma.subtitleSentence.findMany({
    where: {
      videoId: video.id
    },
    orderBy: {
      startTime: "asc"
    }
  });

  return NextResponse.json(subtitles);
}