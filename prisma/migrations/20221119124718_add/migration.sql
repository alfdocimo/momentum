/*
  Warnings:

  - You are about to drop the column `learned` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "learned",
ADD COLUMN     "til" TEXT,
ADD COLUMN     "tiwo" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
