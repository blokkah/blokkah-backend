-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT,
    "country" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT false,
    "isLocal" BOOLEAN NOT NULL,
    "isFacebook" BOOLEAN,
    "isApple" BOOLEAN,
    "facebookId" TEXT,
    "appleId" TEXT,
    "role" TEXT NOT NULL,
    "licence" TEXT,
    "city" TEXT,
    "lastAccess" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthDate" TIMESTAMP(3) NOT NULL,

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
CREATE INDEX "userName_unique" ON "User"("userName");

-- CreateIndex
CREATE INDEX "email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "phoneNumber_unique" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "facebookId_unique" ON "User"("facebookId");

-- CreateIndex
CREATE INDEX "appleId_unique" ON "User"("appleId");
