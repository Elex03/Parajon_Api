/*
  Warnings:

  - You are about to drop the column `id_trabajador` on the `compras` table. All the data in the column will be lost.
  - You are about to drop the column `id_compra` on the `factura` table. All the data in the column will be lost.
  - Added the required column `id_factura` to the `compras` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_producto` on table `compras` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "compras" DROP CONSTRAINT "compras_id_trabajador_fkey";

-- DropForeignKey
ALTER TABLE "factura" DROP CONSTRAINT "factura_id_compra_fkey";

-- AlterTable
ALTER TABLE "compras" DROP COLUMN "id_trabajador",
ADD COLUMN     "id_factura" INTEGER NOT NULL,
ALTER COLUMN "id_producto" SET NOT NULL;

-- AlterTable
ALTER TABLE "factura" DROP COLUMN "id_compra";

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_factura_fkey" FOREIGN KEY ("id_factura") REFERENCES "factura"("id_factura") ON DELETE NO ACTION ON UPDATE NO ACTION;
