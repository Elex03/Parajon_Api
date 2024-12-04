import { Request, Response } from "express";
import {prismaclient} from "../../config" // Ajusta la ruta según tu configuración

interface propsTrabajadores {
    nombre : string,
    apellido: string,
    cedula : string,
    area_trabajo : string;
}

// Función para obtener todos los trabajadores
export const getTrabajadores = async (_req: Request, res: Response) => {
    try {
      // Consultar todos los trabajadores en la base de datos
      const trabajadores = await prismaclient.trabajadores.findMany();
  
      // Enviar los datos como respuesta
      res.status(200).json({
        message: "Trabajadores obtenidos exitosamente",
        trabajadores,
      });
    } catch (error) {
      console.error("Error al obtener trabajadores:", error);
  
      // Manejo de errores
      res.status(500).json({
        error: "Error interno del servidor al obtener los trabajadores",
      });
    }
  };
  




// Función para crear un trabajador
export const createTrabajador = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, cedula, area_trabajo }:propsTrabajadores = req.body;

    // Insertar trabajador en la base de datos
    const nuevoTrabajador = await prismaclient.trabajadores.create({
      data: {
        nombre,
        apellido,
        cedula,
        area_trabajo,
      },
    });

    // Respuesta exitosa
    res.status(201).send({
      message: "Trabajador creado exitosamente",
      trabajador: nuevoTrabajador,
    });
  } catch (error) {
    console.error("Error al crear trabajador:", error);

    // Manejo de errores
    res.status(500).send({
      error: "Error interno del servidor al crear el trabajador",
    });
  }
};
