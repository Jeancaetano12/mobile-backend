/*
  Warnings:

  - You are about to drop the column `contatoTelefone` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "contatoTelefone",
ADD COLUMN     "pacienteTelefone" TEXT;
