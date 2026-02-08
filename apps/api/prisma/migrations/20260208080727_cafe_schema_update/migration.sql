-- CreateTable
CREATE TABLE "Cafe" (
    "cafe_id" BIGSERIAL NOT NULL,
    "business_number" TEXT NOT NULL,
    "road_address" TEXT NOT NULL,
    "detail_address" TEXT NOT NULL,
    "hash_tags" TEXT[],
    "created_at" BIGINT NOT NULL,
    "updated_at" BIGINT,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("cafe_id")
);

-- CreateTable
CREATE TABLE "CafeImage" (
    "cafe_image_id" BIGSERIAL NOT NULL,
    "cafe_id" BIGINT NOT NULL,
    "image_url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "identified_name" TEXT NOT NULL,
    "extension" VARCHAR(10) NOT NULL,

    CONSTRAINT "CafeImage_pkey" PRIMARY KEY ("cafe_image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CafeImage_cafe_id_key" ON "CafeImage"("cafe_id");

-- AddForeignKey
ALTER TABLE "CafeImage" ADD CONSTRAINT "CafeImage_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "Cafe"("cafe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
