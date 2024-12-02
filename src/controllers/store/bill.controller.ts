import { Request, Response } from "express";
import { prismaclient } from "../../config";


interface compraI {
  id_producto: number
  id_factura:number
  cantidad: number
  subtotal:number
}

interface propsBill {
  id_trabajador: number, 
  total: number,
  compras: compraI[]
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
    total: Number(data.total),
    productos: data.compra.map((compra) => ({
      precio_venta: compra.productos?.precio_venta,
      cantidad: compra.cantidad,
    })),
  }));



  res.status(200).send(parseData);
};

export const createNewBill = async (req: Request, res: Response) => {
  try {
    const { id_trabajador, compras, total }: propsBill = req.body;
    const fecha = new Date();

    const billData = await prismaclient.factura.create({
      data: {
        total: total, 
        fecha: fecha.toISOString(), 
        id_trabajador: id_trabajador 
      }
    });


    compras.map((item)=> {item.id_factura = billData.id_factura})

    await prismaclient.compras.createMany({
      data: compras
    })
    res.status(200).send(`Factura ${billData.id_factura} creada`)
  } catch (error) {
    console.error("Error al crear la factura con compras:", error);
    res.status(500).json({
      error: "Error interno del servidor al crear la factura con compras.",
    });
  }
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
