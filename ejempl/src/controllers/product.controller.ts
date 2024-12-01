import { Request, Response } from "express"


const Array = ["Melanie", "Hellen", "Kelly"];


export const getProduct = (_req:Request, res: Response) => {
    res.send('Hello Melanie')
}

export const createProduct = (req:Request, res: Response) => {
    const {name} = req.body;

    res.send(`Hello  ${name}!!`)
}


export const getProductById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    res.send(Array[id]);
}