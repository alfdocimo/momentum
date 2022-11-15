/*
  Warnings:

  - You are about to drop the column `name` on the `Example` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "exampleName" TEXT
);
INSERT INTO "new_Example" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Example";
DROP TABLE "Example";
ALTER TABLE "new_Example" RENAME TO "Example";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
