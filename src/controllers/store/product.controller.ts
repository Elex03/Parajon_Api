import { Request, Response } from "express";
import { prismaclient } from "../../config";
import { upload } from "../../utils/index";

enum Material {
  GAMUSA = "GAMUSA",
  CUERO = "CUERO",
  TELA = "TELA",
  CUERINA = "CUERINA",
}

interface ProductTalla {
  talla: { numero: number };
  cantidad: number;
}

interface ProductI {
  material: Material;
  estado: string;
  sexo: string;
  estilo: string;
  categoria?: string;
  productoTalla: ProductTalla[];
  precio_venta: number;
  precio_produccion: number;
}

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  upload.array("image", 1)(req, res, async (err) => {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    try {
      const {
        material,
        sexo,
        categoria,
        productoTalla,
        precio_venta,
        precio_produccion,
        estilo,
        estado,
      }: ProductI = req.body;

      let parsedProductoTalla: ProductTalla[] = [];
      try {
        parsedProductoTalla = Array.isArray(productoTalla)
          ? productoTalla
          : JSON.parse(productoTalla || "[]");
      } catch (parseError) {
        return res
          .status(400)
          .json({ error: "Formato inválido en productoTalla" });
      }

      const imagenes = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );

      const product = await prismaclient.$transaction(async (prisma) => {
        const newProduct = await prisma.productos.create({
          data: {
            material,
            sexo,
            estado: estado === "true",
            categoria,
            precio_venta: Number(precio_venta),
            estilo,
            precio_produccion: Number(precio_produccion),
            fecha_ingreso_de_produccion: new Date(),
          },
        });

        await Promise.all(
          parsedProductoTalla.map(async (talla) => {
            let existingTalla = await prisma.talla.findFirst({
              where: { numero: talla.talla.numero },
            });

            if (!existingTalla) {
              existingTalla = await prisma.talla.create({
                data: { numero: talla.talla.numero },
              });
            }

            await prisma.productoTalla.create({
              data: {
                id_producto: newProduct.id_producto,
                id_talla: existingTalla.id_talla,
                cantidad: talla.cantidad,
              },
            });
          })
        );

        await prisma.imagenes.createMany({
          data: imagenes.map((imagenUrl) => ({
            id_producto: newProduct.id_producto,
            imagenPath: imagenUrl,
          })),
        });

        return newProduct;
      });

      return res.status(201).json({ success: true, product });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  });
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const productsData = await prismaclient.productos.findMany({
      include: {
        imagenes: true,
      },
    });

    res.json(productsData);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

interface updateProdI {
  precio_venta: number;
  estado: string;
}

export const updateProductById = async (req: Request, res: Response) => {

  console.log(req.body)
  const { id } = req.params;
  const { precio_venta, estado }: updateProdI = req.body;

  try {
    const productId = Number(id);

    if (isNaN(productId)) {
      res.status(400).json({ message: "ID no válido" });
    }

    const product = await prismaclient.productos.findUnique({
      where: { id_producto: productId },
    });

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    }

    const Estadof = estado == "disponible" ? true : false;

    console.log(estado);

    const updatedProduct = await prismaclient.productos.update({
      where: { id_producto: productId },
      data: {
        precio_venta: precio_venta,
        estado: Estadof,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  let { id } = req.params;console.log(id);
  const imagen = await prismaclient.imagenes.findFirst({
    where: { id_producto: Number(id) },
  });

  await prismaclient.imagenes.delete({
    where: { id_imagen: Number(imagen?.id_imagen) },
  });


  await prismaclient.productos.delete({
    where: { id_producto: Number(id) },
  });

  res.json("Todo ha salido bien ");
};
