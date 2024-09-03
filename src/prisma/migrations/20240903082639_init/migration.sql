-- AlterTable
ALTER TABLE "em_users" ALTER COLUMN "user_updated_at" DROP NOT NULL,
ALTER COLUMN "user_updated_at" SET DEFAULT CURRENT_TIMESTAMP;
