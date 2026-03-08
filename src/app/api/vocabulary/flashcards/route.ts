import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/src/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = user.id

  const cards = await prisma.userVocabulary.findMany({
    where: {
      userId,
      OR: [
        { status: "new" },
        {
          nextReview: {
            lte: new Date()
          }
        }
      ]
    },
    include: {
      vocabulary: true
    },
    take: 20
  })

  return NextResponse.json(cards)
}