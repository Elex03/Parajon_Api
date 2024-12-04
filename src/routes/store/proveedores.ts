import { Router } from "express";
import { createProveedor, getProveedores } from "../../controllers/store/proveedores.controller";



const appPro = Router();

appPro.post('/', createProveedor);
appPro.get('/', getProveedores)


export default appPro;