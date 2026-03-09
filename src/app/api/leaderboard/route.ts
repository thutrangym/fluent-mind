import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: {
      xp: "desc",
    },
    take: 50,
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(leaderboard);
}