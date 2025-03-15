/*
  Warnings:

  - A unique constraint covering the columns `[forgotPasswordCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailVerificationCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_forgotPasswordCode_key" ON "User"("forgotPasswordCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationCode_key" ON "User"("emailVerificationCode");
