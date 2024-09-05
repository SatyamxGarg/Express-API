/*
  Warnings:

  - The values [Male,Female] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('MALE', 'FEMALE');
ALTER TABLE "em_users" ALTER COLUMN "user_gender" TYPE "Gender_new" USING ("user_gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "em_users" ALTER COLUMN "user_phone" DROP NOT NULL,
ALTER COLUMN "user_city_name" DROP NOT NULL,
ALTER COLUMN "user_state_name" DROP NOT NULL,
ALTER COLUMN "user_country_name" DROP NOT NULL,
ALTER COLUMN "user_gender" DROP NOT NULL,
ALTER COLUMN "user_role_id" SET DEFAULT 2;
