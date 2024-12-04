import { Request, Response } from "express";
import { prismaclient } from "../../config";

export const getProductTalla = async (_req: Request, res: Response) => {

    try {
        const productTallasData = await prismaclient.productoTalla.findMany({
            include: {
                producto: true,
                talla: true,
            },
        });

        res.json(productTallasData);
    } catch (error) {
        res.status(500).json({error:"Error al obtener los datos de productoTalla. "});
    }
};