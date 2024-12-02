import { Request, Response } from "express";
import { prismaclient } from "../../config";


export const getBills = async (_req: Request, res: Response) => {

    const billData = await prismaclient.clientes.findMany()

    res.send(billData);
}

export const createNewBill = async (_req: Request, res: Response) => {
    const id_trabajador  = 1
    const billData =  await prismaclient.factura.create({
        data: {
            id_trabajador: id_trabajador
        }
    })

    res.json(billData);

}


export const getBillById = async (req: Request, res: Response) => {

    const idBill = Number(req.params.id);

    const billDataById = await prismaclient.factura.findUnique( {
        where: {
            id_factura : idBill
        }
    })

    res.send(billDataById);
}