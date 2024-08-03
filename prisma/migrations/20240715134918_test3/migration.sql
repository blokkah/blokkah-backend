/*
  Warnings:

  - You are about to drop the column `city` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastAccess` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `citry` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `isFacebook` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isApple` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "city",
DROP COLUMN "lastAccess",
DROP COLUMN "role",
ADD COLUMN     "citry" TEXT NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "roleName" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "isLocal" SET DEFAULT true,
ALTER COLUMN "isFacebook" SET NOT NULL,
ALTER COLUMN "isFacebook" SET DEFAULT false,
ALTER COLUMN "isApple" SET NOT NULL,
ALTER COLUMN "isApple" SET DEFAULT false;
