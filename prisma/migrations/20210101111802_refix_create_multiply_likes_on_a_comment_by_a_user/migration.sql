/*
  Warnings:

  - The migration will change the primary key for the `Like` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[userId,commentId]` on the table `Like`. If there are existing duplicate values, the migration will fail.
  - Added the required column `id` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like.userId_commentId_unique" ON "Like"("userId", "commentId");
