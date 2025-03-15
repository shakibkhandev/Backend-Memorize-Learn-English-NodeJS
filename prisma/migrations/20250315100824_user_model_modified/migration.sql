/*
  Warnings:

  - You are about to drop the column `emailVerificationExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPasswordToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationExpiry",
DROP COLUMN "emailVerificationToken",
DROP COLUMN "forgotPasswordExpiry",
DROP COLUMN "forgotPasswordToken",
ADD COLUMN     "emailVerificationCode" INTEGER,
ADD COLUMN     "emailVerificationCodeExpiry" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordCode" INTEGER,
ADD COLUMN     "forgotPasswordCodeExpiry" TIMESTAMP(3);
