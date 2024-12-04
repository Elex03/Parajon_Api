import { Request, Response } from "express";
import { prismaclient } from "../../config" // Ajusta la ruta según tu configuración

// Interfaz para los datos de entrada del cliente
interface propsCliente {
    nombre: string;
    apellido: string;
    telefono?: string;
    direccion?: string;
    cedula?: string;
}


export const getClientes = async (_req: Request, res: Response) => {
    try {
      // Consultar todos los clientes en la base de datos
      const clientes = await prismaclient.clientes.findMany();
  
      // Enviar los datos como respuesta
      res.status(200).json({
        message: "Clientes obtenidos exitosamente",
        clientes,
      });
    } catch (error) {
      console.error("Error al obtener clientes:", error);
  
      // Manejo de errores
      res.status(500).json({
        error: "Error interno del servidor al obtener los clientes",
      });
    }
  };


// Función para crear un cliente
export const createCliente = async (req: Request, res: Response) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { nombre, apellido, telefono, direccion, cedula }: propsCliente = req.body;

        // Crear un nuevo cliente en la base de datos
        const nuevoCliente = await prismaclient.clientes.create({
            data: {
                nombre,
                apellido,
                telefono,
                direccion,
                cedula,
            },
        });

        // Enviar la respuesta exitosa con el cliente creado
        res.status(201).send({
            message: "Cliente creado exitosamente",
            cliente: nuevoCliente,
        });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).send({
            error: "Error interno del servidor al crear el cliente",
        });
    }
};
