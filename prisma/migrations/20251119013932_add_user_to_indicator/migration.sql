/*
  Warnings:

  - Added the required column `usuarioId` to the `IndicadorSaude` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndicadorSaude" ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IndicadorSaude" ADD CONSTRAINT "IndicadorSaude_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
