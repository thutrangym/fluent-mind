import prisma from "@/src/lib/prisma"

export async function getReviewQueue(userId: string) {

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

  return cards
}