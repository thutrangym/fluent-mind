import prisma from "@/src/lib/prisma"
import { getCurrentUser } from "@/src/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const user = await getCurrentUser()
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = user.id

  const totalCards = await prisma.userVocabulary.count({
    where: { userId }
  })

  const dueToday = await prisma.userVocabulary.count({
    where: {
      userId,
      nextReview: {
        lte: new Date()
      }
    }
  })

  const reviews = await prisma.userVocabulary.aggregate({
    where: { userId },
    _sum: {
      reviewCount: true
    }
  })

  const correct = await prisma.userVocabulary.aggregate({
    where: { userId },
    _sum: {
      correctCount: true
    }
  })

  const accuracy =
    reviews._sum.reviewCount
      ? (correct._sum.correctCount! /
          reviews._sum.reviewCount!) *
        100
      : 0

  const status = await prisma.userVocabulary.groupBy({
    by: ["status"],
    where: { userId },
    _count: true
  })

  return NextResponse.json({
    totalCards,
    dueToday,
    totalReviews: reviews._sum.reviewCount ?? 0,
    accuracy,
    status
  })
}