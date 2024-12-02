import express from 'express';
import {   createNewBill,  getFacturaConCompras} from "../../controllers/store/bill.controller";



const billRoute = express.Router();
billRoute.post('/', createNewBill);
billRoute.get('/factura/:id_factura', getFacturaConCompras);



export default billRoute;



