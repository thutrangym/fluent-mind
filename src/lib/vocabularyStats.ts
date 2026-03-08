import prisma from "@/src/lib/prisma"

export async function getVocabularyStats(userId: string) {

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
    _sum: { reviewCount: true }
  })

  const correct = await prisma.userVocabulary.aggregate({
    where: { userId },
    _sum: { correctCount: true }
  })

  const accuracy =
    reviews._sum.reviewCount
      ? (correct._sum.correctCount! / reviews._sum.reviewCount!) * 100
      : 0

  const status = await prisma.userVocabulary.groupBy({
    by: ["status"],
    where: { userId },
    _count: true
  })

  return {
    totalCards,
    dueToday,
    totalReviews: reviews._sum.reviewCount ?? 0,
    accuracy,
    status
  }
}