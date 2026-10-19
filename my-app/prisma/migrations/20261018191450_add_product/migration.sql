-- CreateEnum
CREATE TYPE "WalletCategory" AS ENUM ('PERSONAL_DETAILS', 'CONTACT_INFORMATION', 'INDIAN_IDENTITY_DOCUMENTS', 'BANKING_FINANCE', 'EDUCATION', 'CAREER_EMPLOYMENT', 'SOCIAL_LINKS', 'DOCUMENTS_FILES', 'OTHER_RECORDS');

-- CreateTable
CREATE TABLE "WalletRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'default-user',
    "category" "WalletCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "fileLinks" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WalletRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'default-user',
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalletSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WalletRecord_userId_idx" ON "WalletRecord"("userId");

-- CreateIndex
CREATE INDEX "WalletRecord_category_idx" ON "WalletRecord"("category");

-- CreateIndex
CREATE INDEX "WalletRecord_updatedAt_idx" ON "WalletRecord"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WalletSession_tokenHash_key" ON "WalletSession"("tokenHash");

-- CreateIndex
CREATE INDEX "WalletSession_userId_idx" ON "WalletSession"("userId");

-- CreateIndex
CREATE INDEX "WalletSession_expiresAt_idx" ON "WalletSession"("expiresAt");
