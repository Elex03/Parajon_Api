import { Request, Response } from "express";
import { prismaclient } from '../../config';



interface propsMateria {

    material: string,
    cantidad_material: number,
    precio: number,
    estado_de_material: string

}



export const getAllMateriasPrimas = async (_req: Request, res: Response) => {
    try {
      // Consulta de todas las materias primas
      const materiasPrimas = await prismaclient.materiaprima.findMany({
        include: {
          proveedores: true, // Incluir información del proveedor relacionado
        },
      });
  
      // Respuesta con los datos
      res.status(200).json({
        message: "Materias primas obtenidas exitosamente",
        data: materiasPrimas,
      });
    } catch (error) {
      console.error("Error al obtener materias primas:", error);
      res.status(500).json({
        error: "Error interno del servidor al obtener materias primas.",
      });
    }
  };
  



export const createMateriaPrima = async (req: Request, res: Response) => {
    try {
        const { material, cantidad_material, precio, estado_de_material }: propsMateria = req.body;


        // Creación del registro en `materiaprima`
        const newMateriaPrima = await prismaclient.materiaprima.create({
            data: {
            
                material,
                cantidad_material,
                precio,
                estado_de_material,
            },
        });

        // Respuesta de éxito
        res.status(201).send({
            message: "Materia prima creada exitosamente",
            materiaPrima: newMateriaPrima,
        });
    } catch (error) {
        console.error("Error al crear materia prima:", error);
        res.status(500).send({
            error: "Error interno del servidor al crear materia prima.",
        });
    }
};
