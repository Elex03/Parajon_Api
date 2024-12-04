import express from 'express';
import { createCliente, getClientes } from "../../controllers/store/client.controller";



const appClient = express.Router();

appClient.post('/', createCliente);
appClient.get('/', getClientes)




export default appClient;