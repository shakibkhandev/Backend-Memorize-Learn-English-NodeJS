/*
  Warnings:

  - Added the required column `expandedAnswer` to the `MCQ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MCQ" ADD COLUMN     "expandedAnswer" TEXT NOT NULL;
