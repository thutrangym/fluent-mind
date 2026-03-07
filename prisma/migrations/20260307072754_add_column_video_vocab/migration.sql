-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "tier" "UserTier" NOT NULL DEFAULT 'free';

-- AlterTable
ALTER TABLE "Vocabulary" ADD COLUMN     "tier" "UserTier" NOT NULL DEFAULT 'free';
