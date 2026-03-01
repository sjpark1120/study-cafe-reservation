/*
  Warnings:

  - You are about to drop the column `business_number` on the `cafes` table. All the data in the column will be lost.
  - Added the required column `business_name` to the `cafes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cafes" DROP COLUMN "business_number",
ADD COLUMN     "business_name" TEXT NOT NULL;
