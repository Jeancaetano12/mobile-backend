/*
  Warnings:

  - You are about to drop the column `pacienteId` on the `IndicadorSaude` table. All the data in the column will be lost.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `pacienteCpf` to the `IndicadorSaude` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."IndicadorSaude" DROP CONSTRAINT "IndicadorSaude_pacienteId_fkey";

-- AlterTable
ALTER TABLE "IndicadorSaude" DROP COLUMN "pacienteId",
ADD COLUMN     "pacienteCpf" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "id",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("cpf");

-- AddForeignKey
ALTER TABLE "IndicadorSaude" ADD CONSTRAINT "IndicadorSaude_pacienteCpf_fkey" FOREIGN KEY ("pacienteCpf") REFERENCES "Patient"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;
