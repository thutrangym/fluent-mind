import { prisma } from "@/src/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const body = await req.json();

  const subtitles = await prisma.subtitleSentence.createMany({
    data: body.sentences
  });

  return NextResponse.json(subtitles);
}