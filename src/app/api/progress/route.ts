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

  const { youtubeId, progress, lastTime } = body;

  if (!youtubeId) {
    return NextResponse.json({ error: "youtubeId missing" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const completed = progress >= 95;

  const data = await prisma.userProgress.upsert({
    where: {
      userId_youtubeId: {
        userId: user.id,
        youtubeId,
      },
    },
    update: {
      progress,
      lastTime,
      completed,
    },
    create: {
      user: {
        connect: {
          id: user.id,
        },
      },
      video: {
        connect: {
          youtubeId,
        },
      },
      progress,
      lastTime,
      completed,
    },
  });

  return NextResponse.json(data);
}
