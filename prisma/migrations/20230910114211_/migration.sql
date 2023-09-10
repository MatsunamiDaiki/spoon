/*
  Warnings:

  - Added the required column `memo` to the `TaskMemo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskMemo" ADD COLUMN     "memo" TEXT NOT NULL;
