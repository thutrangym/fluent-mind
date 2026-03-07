/*
  Warnings:

  - You are about to drop the column `videoId` on the `UserProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,youtubeId]` on the table `UserProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `youtubeId` to the `UserProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_videoId_fkey";

-- DropIndex
DROP INDEX "UserProgress_userId_videoId_key";

-- AlterTable
ALTER TABLE "UserProgress" DROP COLUMN "videoId",
ADD COLUMN     "youtubeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_youtubeId_key" ON "UserProgress"("userId", "youtubeId");
