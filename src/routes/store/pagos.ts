import express from 'express';
import { createPago, getAllPagos } from '../../controllers/store/pagos.controller';



const appPago = express.Router();

appPago.post('/', createPago);
appPago.get('/', getAllPagos);



export default appPago;