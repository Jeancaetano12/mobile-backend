/*
  Warnings:

  - You are about to drop the column `endereco` on the `Family` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localidade` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "localidade" TEXT NOT NULL,
ADD COLUMN     "logradouro" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL,
ADD COLUMN     "unidade" TEXT;
