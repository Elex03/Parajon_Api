/*
  Warnings:

  - You are about to drop the column `fecha_compra` on the `compras` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `compras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compras" DROP COLUMN "fecha_compra",
ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL;
