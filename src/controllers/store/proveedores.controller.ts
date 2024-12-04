import { Request, Response } from "express";
import { prismaclient } from "../../config"; // Asegúrate de usar la ruta correcta a tu cliente Prisma



interface propsProveedor {
    nombre: string;
    direccion: string;
    telefono: string;
    tipo_producto: string;
}

export const getProveedores = async (_req: Request, res: Response) => {
    try {
      // Obtener todos los proveedores de la base de datos
      const proveedores = await prismaclient.proveedores.findMany();
  
      // Enviar la lista de proveedores como respuesta
      res.status(200).send({
        message: "Proveedores obtenidos exitosamente",
        proveedores,
      });
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
  
      // Manejar errores internos del servidor
      res.status(500).send({
        error: "Error interno del servidor al obtener los proveedores",
      });
    }
  };

  
// Función para crear un proveedor
export const createProveedor = async (req: Request, res: Response) => {
    try {
        // Datos enviados desde el cuerpo de la solicitud
        const { nombre, direccion, telefono, tipo_producto }: propsProveedor = req.body;

        // Validar que el nombre del proveedor no esté vacío
        if (!nombre) {
            res.status(400).send({ error: "El nombre del proveedor es obligatorio" });
            return;
        }

        // Crear el proveedor en la base de datos
        const newProveedor = await prismaclient.proveedores.create({
            data: {
                nombre,
                direccion,
                telefono,
                tipo_producto,
            },
        });

        // Enviar respuesta de éxito con los datos creados
        res.status(201).send({
            message: "Proveedor creado exitosamente",
            proveedor: newProveedor,
        });
    } catch (error) {
        console.error("Error al crear proveedor:", error);

        // Enviar una respuesta de error en caso de excepciones
        res.status(500).send({
            error: "Error interno del servidor al crear el proveedor",
        });
    }
};
