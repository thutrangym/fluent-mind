-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('guest', 'user', 'admin');

-- CreateEnum
CREATE TYPE "UserTier" AS ENUM ('free', 'premium');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'suspended', 'banned');

-- CreateEnum
CREATE TYPE "CEFRLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "VocabularyStatus" AS ENUM ('new', 'learning', 'reviewing', 'young', 'mastered');

-- CreateEnum
CREATE TYPE "LearningMode" AS ENUM ('shadowing', 'dictation');

-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('draft', 'active');

-- CreateEnum
CREATE TYPE "TopicStatus" AS ENUM ('draft', 'active');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "level" TEXT NOT NULL DEFAULT 'Beginner',
    "tier" "UserTier" NOT NULL DEFAULT 'free',
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "status" "UserStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "videos" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "studyTime" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "lastTime" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "youtubeId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "mode" "LearningMode" NOT NULL,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "TopicStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topicId" TEXT,
    "level" "CEFRLevel" NOT NULL DEFAULT 'A1',
    "tier" "UserTier" NOT NULL DEFAULT 'free',
    "duration" INTEGER,
    "publishedAt" TIMESTAMP(3),
    "status" "VideoStatus" NOT NULL DEFAULT 'active',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubtitleSentence" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "SubtitleSentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpeechAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subtitleId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "wer" DOUBLE PRECISION NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpeechAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT,
    "pronunciation" TEXT,
    "level" "CEFRLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tier" "UserTier" NOT NULL DEFAULT 'free',
    "deckId" TEXT,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVocabulary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabularyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "nextReview" TIMESTAMP(3),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "status" "VocabularyStatus" NOT NULL DEFAULT 'new',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 1,
    "repetitions" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserVocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" TEXT,
    "postId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminActionLog" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_youtubeId_videoId_mode_key" ON "UserProgress"("userId", "youtubeId", "videoId", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "Video_youtubeId_key" ON "Video"("youtubeId");

-- CreateIndex
CREATE UNIQUE INDEX "UserVocabulary_userId_vocabularyId_key" ON "UserVocabulary"("userId", "vocabularyId");

-- CreateIndex
CREATE INDEX "Comment_postId_idx" ON "Comment"("postId");

-- CreateIndex
CREATE INDEX "Comment_videoId_idx" ON "Comment"("videoId");

-- CreateIndex
CREATE INDEX "Comment_parentId_idx" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_userId_key" ON "Leaderboard"("userId");

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_youtubeId_fkey" FOREIGN KEY ("youtubeId") REFERENCES "Video"("youtubeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleSentence" ADD CONSTRAINT "SubtitleSentence_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechAttempt" ADD CONSTRAINT "SpeechAttempt_subtitleId_fkey" FOREIGN KEY ("subtitleId") REFERENCES "SubtitleSentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpeechAttempt" ADD CONSTRAINT "SpeechAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocabulary" ADD CONSTRAINT "Vocabulary_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabulary" ADD CONSTRAINT "UserVocabulary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabulary" ADD CONSTRAINT "UserVocabulary_vocabularyId_fkey" FOREIGN KEY ("vocabularyId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
