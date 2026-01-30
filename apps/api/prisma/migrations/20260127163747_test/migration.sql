/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "account";

-- DropEnum
DROP TYPE "AccountRole";

-- DropEnum
DROP TYPE "AccountStatus";

-- CreateTable
CREATE TABLE "Account" (
    "account_id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "display_name" VARCHAR(30) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,
    "last_login_at" BIGINT,
    "email_verified_at" BIGINT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
