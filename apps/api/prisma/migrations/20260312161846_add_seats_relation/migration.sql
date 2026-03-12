-- CreateTable
CREATE TABLE "seats" (
    "seat_id" BIGSERIAL NOT NULL,
    "cafe_id" BIGINT NOT NULL,
    "seat_name" TEXT NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "seat_type" VARCHAR(20) NOT NULL,
    "seat_status" VARCHAR(20) NOT NULL DEFAULT 'IDLE',
    "location" TEXT NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("seat_id")
);

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("cafe_id") ON DELETE RESTRICT ON UPDATE CASCADE;
