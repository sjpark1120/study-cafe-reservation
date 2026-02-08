-- CreateTable
CREATE TABLE "Price" (
    "price_id" BIGSERIAL NOT NULL,
    "cafe_id" BIGINT NOT NULL,
    "price_value" BIGINT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("price_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_cafe_id_key" ON "Price"("cafe_id");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "Cafe"("cafe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
