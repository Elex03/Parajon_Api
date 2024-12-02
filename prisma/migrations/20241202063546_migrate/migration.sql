-- CreateEnum
CREATE TYPE "material" AS ENUM ('CUERINA', 'TELA', 'CUERO', 'GAMUSA');

-- CreateTable
CREATE TABLE "talla" (
    "id_talla" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "talla_pkey" PRIMARY KEY ("id_talla")
);

-- CreateTable
CREATE TABLE "productoTalla" (
    "id_producTalla" SERIAL NOT NULL,
    "id_talla" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,

    CONSTRAINT "productoTalla_pkey" PRIMARY KEY ("id_producTalla")
);

-- CreateTable
CREATE TABLE "administradores" (
    "id_admin" SERIAL NOT NULL,
    "cedula" VARCHAR(17) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "fecha_nacimiento" DATE,
    "id_proveedor" INTEGER,
    "id_pago" INTEGER,
    "id_trabajador" INTEGER,
    "id_donacion" INTEGER,
    "id_compramateria" INTEGER,

    CONSTRAINT "administradores_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id_cliente" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(8),
    "direccion" VARCHAR(100),
    "cedula" VARCHAR(20),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "compramateriaprima" (
    "id_compramateria" SERIAL NOT NULL,
    "fecha_importacion" DATE,
    "id_materiaprima" INTEGER,
    "cantidad" INTEGER,
    "total" DECIMAL(10,2),

    CONSTRAINT "compramateriaprima_pkey" PRIMARY KEY ("id_compramateria")
);

-- CreateTable
CREATE TABLE "compras" (
    "id_compra" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_factura" INTEGER NOT NULL,
    "fecha_compra" DATE,

    CONSTRAINT "compras_pkey" PRIMARY KEY ("id_compra")
);

-- CreateTable
CREATE TABLE "donaciones" (
    "id_donacion" SERIAL NOT NULL,
    "id_producto" INTEGER,
    "destino" VARCHAR(100),
    "cantidad" INTEGER,

    CONSTRAINT "donaciones_pkey" PRIMARY KEY ("id_donacion")
);

-- CreateTable
CREATE TABLE "exportaciones" (
    "id_exportacion" SERIAL NOT NULL,
    "id_compra" INTEGER,
    "cantidad_zapato" INTEGER,
    "id_metodopago" INTEGER,
    "id_encargo" INTEGER,
    "fecha_entrega" DATE,
    "fecha_emision" DATE,
    "pais" VARCHAR(20) NOT NULL,

    CONSTRAINT "exportaciones_pkey" PRIMARY KEY ("id_exportacion")
);

-- CreateTable
CREATE TABLE "factura" (
    "id_factura" SERIAL NOT NULL,
    "id_exportacion" INTEGER,
    "id_cliente" INTEGER,
    "id_encargo" INTEGER,
    "id_metodopago" INTEGER,
    "id_trabajador" INTEGER,
    "resumen_productos" VARCHAR(255),
    "total" DECIMAL(10,2) NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "factura_pkey" PRIMARY KEY ("id_factura")
);

-- CreateTable
CREATE TABLE "materiaprima" (
    "id_materiaprima" SERIAL NOT NULL,
    "id_proveedor" INTEGER,
    "material" VARCHAR(50) NOT NULL,
    "cantidad_material" INTEGER,
    "precio" DECIMAL(10,2),
    "estado_de_material" VARCHAR(20),

    CONSTRAINT "materiaprima_pkey" PRIMARY KEY ("id_materiaprima")
);

-- CreateTable
CREATE TABLE "metodopago" (
    "id_metodopago" SERIAL NOT NULL,
    "metodo" VARCHAR(20) NOT NULL,

    CONSTRAINT "metodopago_pkey" PRIMARY KEY ("id_metodopago")
);

-- CreateTable
CREATE TABLE "ordenencargo" (
    "id_encargo" SERIAL NOT NULL,
    "id_compra" INTEGER,
    "material_zapato" VARCHAR(50),
    "estado_pago" VARCHAR(20),
    "cantidad" INTEGER,
    "color" VARCHAR(20),
    "talla" VARCHAR(10),

    CONSTRAINT "ordenencargo_pkey" PRIMARY KEY ("id_encargo")
);

-- CreateTable
CREATE TABLE "pagos" (
    "id_pago" SERIAL NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "area_pago" VARCHAR(100),

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "produccion" (
    "id_produccion" SERIAL NOT NULL,
    "id_producto" INTEGER,
    "id_trabajador" INTEGER,
    "fecha_inicio" DATE,
    "fecha_fin" DATE,
    "cantidad_producida" INTEGER,
    "duracion_produccion" INTEGER DEFAULT 0,

    CONSTRAINT "produccion_pkey" PRIMARY KEY ("id_produccion")
);

-- CreateTable
CREATE TABLE "productos" (
    "id_producto" SERIAL NOT NULL,
    "material" "material" NOT NULL,
    "categoria" VARCHAR(50),
    "precio_venta" INTEGER NOT NULL,
    "precio_produccion" INTEGER NOT NULL,
    "fecha_ingreso_de_produccion" DATE,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "sexo" VARCHAR(20),
    "rango_edad" VARCHAR(40),
    "estilo" VARCHAR(50) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "imagenes" (
    "id_imagen" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "imagenPath" TEXT NOT NULL,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id_imagen")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id_proveedor" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "direccion" VARCHAR(50),
    "telefono" VARCHAR(8),
    "tipo_producto" VARCHAR(50),

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "trabajadores" (
    "id_trabajador" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "cedula" VARCHAR(17) NOT NULL,
    "area_trabajo" VARCHAR(20) NOT NULL,

    CONSTRAINT "trabajadores_pkey" PRIMARY KEY ("id_trabajador")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cedula_key" ON "clientes"("cedula");

-- AddForeignKey
ALTER TABLE "productoTalla" ADD CONSTRAINT "productoTalla_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productoTalla" ADD CONSTRAINT "productoTalla_id_talla_fkey" FOREIGN KEY ("id_talla") REFERENCES "talla"("id_talla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_id_compramateria_fkey" FOREIGN KEY ("id_compramateria") REFERENCES "compramateriaprima"("id_compramateria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_id_donacion_fkey" FOREIGN KEY ("id_donacion") REFERENCES "donaciones"("id_donacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_id_pago_fkey" FOREIGN KEY ("id_pago") REFERENCES "pagos"("id_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedores"("id_proveedor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "administradores" ADD CONSTRAINT "administradores_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajadores"("id_trabajador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compramateriaprima" ADD CONSTRAINT "compramateriaprima_id_materiaprima_fkey" FOREIGN KEY ("id_materiaprima") REFERENCES "materiaprima"("id_materiaprima") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_factura_fkey" FOREIGN KEY ("id_factura") REFERENCES "factura"("id_factura") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "donaciones" ADD CONSTRAINT "donaciones_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exportaciones" ADD CONSTRAINT "exportaciones_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compras"("id_compra") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exportaciones" ADD CONSTRAINT "exportaciones_id_encargo_fkey" FOREIGN KEY ("id_encargo") REFERENCES "ordenencargo"("id_encargo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exportaciones" ADD CONSTRAINT "exportaciones_id_metodopago_fkey" FOREIGN KEY ("id_metodopago") REFERENCES "metodopago"("id_metodopago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_encargo_fkey" FOREIGN KEY ("id_encargo") REFERENCES "ordenencargo"("id_encargo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_exportacion_fkey" FOREIGN KEY ("id_exportacion") REFERENCES "exportaciones"("id_exportacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_metodopago_fkey" FOREIGN KEY ("id_metodopago") REFERENCES "metodopago"("id_metodopago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "factura" ADD CONSTRAINT "factura_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajadores"("id_trabajador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "materiaprima" ADD CONSTRAINT "materiaprima_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedores"("id_proveedor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenencargo" ADD CONSTRAINT "ordenencargo_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compras"("id_compra") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produccion" ADD CONSTRAINT "produccion_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produccion" ADD CONSTRAINT "produccion_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajadores"("id_trabajador") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "imagenes" ADD CONSTRAINT "imagenes_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "productos"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
