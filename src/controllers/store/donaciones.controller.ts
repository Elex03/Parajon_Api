import { Request, Response } from "express";
import { prismaclient } from '../../config';



interface propsDonaciones{
    id_producto : number,
    destino : string,
    cantidad : number
}



export const getAllDonaciones = async (_req: Request, res: Response) => {
    try {
      // Consulta de todos los registros en la tabla `donaciones`
      const donaciones = await prismaclient.donaciones.findMany({
        include: {
          productos: true, // Incluye detalles del producto asociado si existe
        },
      });
  
      // Respuesta con los datos obtenidos
      res.status(200).json({
        message: "Donaciones obtenidas exitosamente",
        data: donaciones,
      });
    } catch (error) {
      console.error("Error al obtener las donaciones:", error);
      res.status(500).json({
        error: "Error interno del servidor al obtener las donaciones.",
      });
    }
  };
  



export const createDonacion = async (req: Request, res: Response) => {
    try {
        const { id_producto, destino, cantidad }: propsDonaciones = req.body;


        if (!cantidad || cantidad <= 0) {
            res.status(400).send({
                error: "La cantidad de la donación debe ser mayor a 0.",
            });
        }

        // Verificar que el producto exista si se proporciona un `id_producto`
        if (id_producto) {
            const producto = await prismaclient.productos.findUnique({
                where: { id_producto },
            });

            if (!producto) {
                res.status(404).send({
                    error: `No se encontró un producto con el ID ${id_producto}.`,
                });
            }
        }

        // Crear la donación en la base de datos
        const newDonacion = await prismaclient.donaciones.create({
            data: {
                id_producto,
                destino,
                cantidad,
            },
        });

        // Respuesta de éxito
        res.status(201).send({
            message: "Donación creada exitosamente",
            donacion: newDonacion,
        });
    } catch (error) {
        console.error("Error al crear la donación:", error);
        res.status(500).send({
            error: "Error interno del servidor al crear la donación.",
        });
    }
};
