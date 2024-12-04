import { Request, Response } from "express";
import { prismaclient } from "../../config"; // Ajusta la ruta según tu configuración




// Función para obtener todas las exportaciones
export const getExportaciones = async (_req: Request, res: Response) => {
  try {
    // Consultar todas las exportaciones
    const exportaciones = await prismaclient.exportaciones.findMany({
      include: {
        compras: true, // Relación con compras
        ordenencargo: true, // Relación con orden de encargo
        metodopago: true, // Relación con método de pago
        factura: true, // Relación con facturas
      },
    });

    // Respuesta exitosa
    res.status(200).json({
      message: "Exportaciones obtenidas exitosamente",
      exportaciones,
    });
  } catch (error) {
    console.error("Error al obtener exportaciones:", error);

    // Manejo de errores
    res.status(500).json({
      error: "Error interno del servidor al obtener las exportaciones.",
    });
  }
};



// Función para crear una exportación
export const createExportacion = async (req: Request, res: Response) => {
  try {
    const {
      cantidad_zapato,
      fecha_entrega,
      fecha_emision,
      pais,
    } = req.body;


    // Crear exportación en la base de datos
    const nuevaExportacion = await prismaclient.exportaciones.create({
      data: {
        cantidad_zapato,
        fecha_entrega: fecha_entrega ? new Date(fecha_entrega) : null,
        fecha_emision: new Date(fecha_emision),
        pais,
      },
    });

    // Respuesta exitosa
    res.status(201).send({
      message: "Exportación creada exitosamente",
      exportacion: nuevaExportacion,
    });
  } catch (error) {
    console.error("Error al crear exportación:", error);

    // Manejo de errores
    res.status(500).send({
      error: "Error interno del servidor al crear la exportación.",
    });
  }
};
