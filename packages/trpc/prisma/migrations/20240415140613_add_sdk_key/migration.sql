/*
  Warnings:

  - A unique constraint covering the columns `[sdkKey]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "sdkKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_sdkKey_key" ON "Settings"("sdkKey");
