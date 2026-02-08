/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cafe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CafeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CafeImage" DROP CONSTRAINT "CafeImage_cafe_id_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_cafe_id_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Cafe";

-- DropTable
DROP TABLE "CafeImage";

-- DropTable
DROP TABLE "Price";

-- CreateTable
CREATE TABLE "accounts" (
    "account_id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "display_name" VARCHAR(30) NOT NULL,
    "role" VARCHAR(15) NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "email_verified_at" TIMESTAMP(3),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "cafes" (
    "cafe_id" BIGSERIAL NOT NULL,
    "business_number" TEXT NOT NULL,
    "road_address" TEXT NOT NULL,
    "detail_address" TEXT NOT NULL,
    "hash_tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "cafes_pkey" PRIMARY KEY ("cafe_id")
);

-- CreateTable
CREATE TABLE "cafe_images" (
    "cafe_image_id" BIGSERIAL NOT NULL,
    "cafe_id" BIGINT NOT NULL,
    "image_url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "identified_name" TEXT NOT NULL,
    "extension" VARCHAR(10) NOT NULL,

    CONSTRAINT "cafe_images_pkey" PRIMARY KEY ("cafe_image_id")
);

-- CreateTable
CREATE TABLE "prices" (
    "price_id" BIGSERIAL NOT NULL,
    "cafe_id" BIGINT NOT NULL,
    "price_value" BIGINT NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("price_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cafe_images_cafe_id_key" ON "cafe_images"("cafe_id");

-- CreateIndex
CREATE UNIQUE INDEX "prices_cafe_id_key" ON "prices"("cafe_id");

-- AddForeignKey
ALTER TABLE "cafe_images" ADD CONSTRAINT "cafe_images_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("cafe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("cafe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
