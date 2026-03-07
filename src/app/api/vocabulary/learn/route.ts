import { NextResponse } from "next/server"
import prisma from "@/src/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth-options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { vocabularyId } = body

  if (!vocabularyId) {
    return NextResponse.json(
      { error: "vocabularyId missing" },
      { status: 400 }
    )
  }

  try {
    const progress = await prisma.userVocabulary.upsert({
      where: {
        userId_vocabularyId: {
          userId,
          vocabularyId,
        },
      },
      update: {
        learned: true,
      },
      create: {
        userId,
        vocabularyId,
        learned: true,
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    return NextResponse.json(
      { error: "Cannot save progress" },
      { status: 500 }
    )
  }
}