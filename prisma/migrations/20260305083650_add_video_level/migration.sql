/*
  Warnings:

  - You are about to drop the column `color` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Topic` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CEFRLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- DropIndex
DROP INDEX "Topic_slug_key";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "color",
DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "level" "CEFRLevel" NOT NULL DEFAULT 'A1',
ADD COLUMN     "url" TEXT;
