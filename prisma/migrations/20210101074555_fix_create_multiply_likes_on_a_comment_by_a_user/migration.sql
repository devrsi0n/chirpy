/*
  Warnings:

  - The migration will change the primary key for the `Like` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("userId", "commentId");
