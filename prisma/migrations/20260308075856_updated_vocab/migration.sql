/*
  Warnings:

  - You are about to drop the column `learned` on the `UserVocabulary` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `UserVocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VocabularyStatus" AS ENUM ('new', 'learning', 'reviewing', 'young', 'mastered');

-- AlterTable
ALTER TABLE "UserVocabulary" DROP COLUMN "learned",
ADD COLUMN     "correctCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nextReview" TIMESTAMP(3),
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "VocabularyStatus" NOT NULL DEFAULT 'new',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vocabulary" ADD COLUMN     "deckId" TEXT;

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
