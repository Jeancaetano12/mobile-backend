/*
  Warnings:

  - Added the required column `primeiroNome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "primeiroNome" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
