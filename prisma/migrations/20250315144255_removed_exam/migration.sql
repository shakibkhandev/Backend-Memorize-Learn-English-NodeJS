/*
  Warnings:

  - You are about to drop the column `examId` on the `Idiom` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Paragraph` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `PhrasalVerb` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Idiom" DROP CONSTRAINT "Idiom_examId_fkey";

-- DropForeignKey
ALTER TABLE "Paragraph" DROP CONSTRAINT "Paragraph_examId_fkey";

-- DropForeignKey
ALTER TABLE "PhrasalVerb" DROP CONSTRAINT "PhrasalVerb_examId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_examId_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_examId_fkey";

-- AlterTable
ALTER TABLE "Idiom" DROP COLUMN "examId";

-- AlterTable
ALTER TABLE "Paragraph" DROP COLUMN "examId";

-- AlterTable
ALTER TABLE "PhrasalVerb" DROP COLUMN "examId";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "examId";

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "examId";

-- DropTable
DROP TABLE "Exam";
