/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `IndicadorSaude` table. All the data in the column will be lost.
  - Added the required column `criadoPorId` to the `IndicadorSaude` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."IndicadorSaude" DROP CONSTRAINT "IndicadorSaude_usuarioId_fkey";

-- AlterTable
ALTER TABLE "IndicadorSaude" DROP COLUMN "usuarioId",
ADD COLUMN     "criadoPorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IndicadorSaude" ADD CONSTRAINT "IndicadorSaude_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
