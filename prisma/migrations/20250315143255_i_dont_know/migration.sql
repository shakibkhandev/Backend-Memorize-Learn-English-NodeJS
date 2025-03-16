-- CreateTable
CREATE TABLE "MCQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "correctAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MCQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MCQToUserProgress" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MCQToUserProgress_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MCQToUserProgress_B_index" ON "_MCQToUserProgress"("B");

-- AddForeignKey
ALTER TABLE "_MCQToUserProgress" ADD CONSTRAINT "_MCQToUserProgress_A_fkey" FOREIGN KEY ("A") REFERENCES "MCQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MCQToUserProgress" ADD CONSTRAINT "_MCQToUserProgress_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProgress"("id") ON DELETE CASCADE ON UPDATE CASCADE;
