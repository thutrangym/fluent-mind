import { prisma } from "@/src/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

import { CEFRLevel } from "@prisma/client";

const beginnerLevels: CEFRLevel[] = ["A1", "A2"]
const experiencedLevels: CEFRLevel[] = ["B1", "B2", "C1", "C2"]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const level = searchParams.get("level") ?? "beginner"

  const levels =
    level === "experienced" ? experiencedLevels : beginnerLevels
  const topics = await prisma.topic.findMany({
    include: {
      videos: {
        where: {
          level: {
            in: levels
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  return NextResponse.json(topics);
}

export async function POST(req: Request) {
  const body = await req.json();

  const topic = await prisma.topic.create({
    data: {
      title: body.name,

    }
  });

  return NextResponse.json(topic);
}