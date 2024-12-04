import { Request, Response } from "express";
import { prismaclient } from "../../config";

interface compraI {
  id_producto: number;
  id_factura: number;
  id_talla: number;
  cantidad: number;
  subtotal: number;
}

interface propsBill {
  id_trabajador: number;
  total: number;
  compras: compraI[];
}

export const getFacturaConCompras = async (req: Request, res: Response) => {
  try {
    const { id_factura } = req.params; // Suponiendo que pasas el ID de la factura como parámetro en la URL

    // Consulta para obtener la factura y las compras asociadas, incluyendo los productos
    const facturaConCompras = await prismaclient.factura.findUnique({
      where: {
        id_factura: parseInt(id_factura, 10), // Convierte el ID de la URL a un número
      },
      include: {
        compra: {
          include: {
            productos: true, // Incluye la información del producto asociado a cada compra
          },
        },
      },
    });

    res.status(200).json(facturaConCompras);
  } catch (error) {
    console.error("Error al obtener la factura con compras:", error);
    res.status(500).json({
      error: "Error interno del servidor al obtener la factura",
    });
  }
};

export const getBillAndDetails = async (_req: Request, res: Response) => {
  const data = await prismaclient.factura.findMany({
    include: {
      compra: {
        select: {
          cantidad: true,
          productos: {
            select: {
              precio_venta: true,
            },
          },
        },
      },
    },
  });

  const parseData = data.map((data) => ({
    id_factura: data.id_factura,
    total: data.compra.reduce(
      (sum, compra) =>
        sum + (compra.productos?.precio_venta || 0) * compra.cantidad,
      0
    ),
    productos: data.compra.map((compra) => ({
      precio_venta: compra.productos?.precio_venta,
      cantidad: compra.cantidad,
    })),
  }));

  res.status(200).send(parseData);
};

export const getBillById = async (req: Request, res: Response) => {
  const idBill = Number(req.params.id);
  const billDataById = await prismaclient.factura.findUnique({
    where: {
      id_factura: idBill,
    },
  });
  res.send(billDataById);
};


export const createNewBill = async (req: Request, res: Response) => {
  try {
    const { id_trabajador, compras, total }: propsBill = req.body;
    const fecha = new Date();

    const billData = await prismaclient.factura.create({
      data: {
        total: total,
        fecha: fecha.toISOString(),
        id_trabajador: id_trabajador,
      },
    });

    compras.map((item) => {
      item.id_factura = billData.id_factura;
    });

    await prismaclient.compras.createMany({
      data: compras,
    });


    await Promise.all(
      compras.map(async (compra) => {
        // Buscar el producto y su cantidad en inventario
        const productTalla = await prismaclient.productoTalla.findFirst({
          where: { id_producto: compra.id_producto },
        });

        // Verificar si el producto existe en inventario
        if (!productTalla) {
          throw new Error(
            `El producto con ID ${compra.id_producto} no tiene inventario registrado.`
          );
        }

        // Verificar si hay stock suficiente
        if (productTalla.cantidad < compra.cantidad) {
          throw new Error(
            `Cantidad insuficiente para el producto con ID ${compra.id_producto}.`
          );
        }

        // Reducir el stock
        await prismaclient.productoTalla.update({
          where: { id_producTalla: productTalla.id_producTalla },
          data: { cantidad: productTalla.cantidad - compra.cantidad },
        });
      })
    );

    // Si todo fue exitoso, enviamos la respuesta de éxito
    res.status(200).send(`Factura ${billData.id_factura} creada`);

  } 
  catch (error) {
    console.error("Error al crear la factura con compras:", error);
    res.status(500).json({
      error: "Error interno del servidor al crear la factura con compras.",
    });
  }
};
