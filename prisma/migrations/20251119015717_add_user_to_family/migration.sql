/*
  Warnings:

  - Added the required column `criadoPorId` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "criadoPorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
