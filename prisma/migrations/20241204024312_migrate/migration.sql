/*
  Warnings:

  - A unique constraint covering the columns `[id_producto,id_talla]` on the table `productoTalla` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productoTalla_id_producto_id_talla_key" ON "productoTalla"("id_producto", "id_talla");
