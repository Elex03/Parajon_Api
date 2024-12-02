import { Request, Response } from "express";
import { prismaclient } from "../../config";

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
    console.error('Error al obtener la factura con compras:', error);
    res.status(500).json({
      error: 'Error interno del servidor al obtener la factura',
    });
  }
};



export const createNewBill = async (req: Request, res: Response) => {
    try {
        const { id_trabajador, fecha, compras } = req.body;

        // Calcula subtotales para cada compra
        const comprasConSubtotales = await Promise.all(
            compras.map(async (compra: { id_producto: number; cantidad: number }) => {
                // Obtén el precio del producto desde la base de datos
                const producto = await prismaclient.productos.findUnique({
                    where: { id_producto: compra.id_producto },
                    select: { precio_venta: true },
                });

                if (!producto) {
                    throw new Error(`Producto con id ${compra.id_producto} no encontrado`);
                }

                // Calcula el subtotal
                const subtotal = producto.precio_venta * compra.cantidad;

                return {
                    ...compra,
                    subtotal,
                };
            })
        );
        // Calcula el total de la factura
        const totalFactura = comprasConSubtotales.reduce((sum, compra) => sum + compra.subtotal, 0);

        // Crear la factura junto con las compras
        const billData = await prismaclient.factura.create({
            data: {
                id_trabajador,
                total: totalFactura,
                fecha: new Date(fecha),
                compra: {
                    create: comprasConSubtotales.map(compra => ({
                        id_producto: compra.id_producto,
                        cantidad: compra.cantidad,
                        subtotal: compra.subtotal,
                    })),
                },
            },
            include: {
                compra: true,
            },
        });

        res.status(201).json(billData);
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
            id_factura: idBill
        }
    })

    res.send(billDataById);
}