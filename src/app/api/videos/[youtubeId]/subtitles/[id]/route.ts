import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { youtubeId: string; id: string } }
){

  const video = await prisma.video.findUnique({
    where: { id: params.id },
    include: {
      topic: true,
      subtitles: true
    }
  });

  return NextResponse.json(video);
}