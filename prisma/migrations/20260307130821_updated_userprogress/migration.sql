-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_youtubeId_fkey" FOREIGN KEY ("youtubeId") REFERENCES "Video"("youtubeId") ON DELETE RESTRICT ON UPDATE CASCADE;
