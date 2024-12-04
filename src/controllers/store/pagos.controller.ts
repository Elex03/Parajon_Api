import { Request, Response } from "express";
import { prismaclient } from '../../config';
import { Decimal } from "@prisma/client/runtime/library";



interface propsPago {
    monto : Decimal,
    area_pago : string
}



export const getAllPagos = async (_req: Request, res: Response) => {
    try {
      // Consulta de todos los registros en la tabla `pagos`
      const pagos = await prismaclient.pagos.findMany();
  
      // Respuesta con los datos obtenidos
      res.status(200).json({
        message: "Pagos obtenidos exitosamente",
        data: pagos,
      });
    } catch (error) {
      console.error("Error al obtener los pagos:", error);
      res.status(500).json({
        error: "Error interno del servidor al obtener los pagos.",
      });
    }
  };
  



export const createPago = async (req: Request, res: Response) => {
  try {
    const { monto, area_pago }: propsPago = req.body;

    // Crear el pago en la base de datos
    const newPago = await prismaclient.pagos.create({
      data: {
        monto,
        area_pago,
      },
    });

    // Respuesta de éxito
    res.status(201).send({
      message: "Pago creado exitosamente",
      pago: newPago,
    });
  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).send({
      error: "Error interno del servidor al crear el pago.",
    });
  }
};
