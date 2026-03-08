import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"
import { sm2 } from "@/src/lib/sm2"
import { getCurrentUser } from "@/src/lib/auth"

export async function POST(req: Request) {
  const user = await getCurrentUser()

  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { vocabularyId, grade } = body

  if (!vocabularyId || grade === undefined) {
    return NextResponse.json(
      { error: "Missing vocabularyId or grade" },
      { status: 400 }
    )
  }

  // Get or Create UserVocabulary tracking
  let userVocab = await prisma.userVocabulary.findFirst({
    where: {
      userId: user.id,
      vocabularyId: vocabularyId
    }
  })

  if (!userVocab) {
    userVocab = await prisma.userVocabulary.create({
      data: {
        userId: user.id,
        vocabularyId: vocabularyId,
        status: "learning",
        reviewCount: 0,
        correctCount: 0,
        repetitions: 0,
        interval: 1,
        easeFactor: 2.5,
        nextReview: new Date()
      }
    })
  }

  // Apply SM-2 spaced repetition (assuming quality maps to 0-5 and grade provides this)
  const result = sm2({
    quality: grade,
    repetitions: userVocab.repetitions,
    interval: userVocab.interval,
    easeFactor: userVocab.easeFactor
  })

  const nextReview = new Date()
  nextReview.setDate(
    nextReview.getDate() + result.interval
  )

  const isCorrect = grade >= 3
  let newStatus = userVocab.status

  if (isCorrect && result.interval > 21) {
    newStatus = "mastered"
  } else if (isCorrect && result.interval > 7) {
    newStatus = "young"
  } else if (isCorrect) {
    newStatus = "reviewing"
  } else {
    newStatus = "learning"
  }

  await prisma.userVocabulary.update({
    where: {
      id: userVocab.id
    },
    data: {
      repetitions: result.repetitions,
      interval: result.interval,
      easeFactor: result.easeFactor,
      nextReview,
      status: newStatus as any, // Cast to avoid tight enum coupling in TS for now
      reviewCount: {
        increment: 1
      },
      correctCount: {
        increment: isCorrect ? 1 : 0
      }
    }
  })

  return NextResponse.json({
    success: true
  })
}