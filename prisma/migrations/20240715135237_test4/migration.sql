/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT,
    "passwordUpdateAt" TIMESTAMP(3),
    "country" TEXT NOT NULL,
    "citry" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "isLocal" BOOLEAN NOT NULL DEFAULT true,
    "isFacebook" BOOLEAN NOT NULL DEFAULT false,
    "isApple" BOOLEAN NOT NULL DEFAULT false,
    "facebookId" TEXT,
    "appleId" TEXT,
    "roleName" TEXT NOT NULL,
    "licence" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "referralCode" TEXT NOT NULL,
    "referrerId" INTEGER,
    "points" INTEGER NOT NULL DEFAULT 0,
    "profilePicture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId");

-- CreateIndex
CREATE UNIQUE INDEX "User_appleId_key" ON "User"("appleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_licence_key" ON "User"("licence");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");
