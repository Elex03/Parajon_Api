import express from 'express';
import {   createNewBill,  getBillAndDetails,  getFacturaConCompras} from "../../controllers/store/bill.controller";



const billRoute = express.Router();
billRoute.post('/', createNewBill);
billRoute.get('/factura/:id_factura', getFacturaConCompras);
billRoute.get('/', getBillAndDetails);



export default billRoute;



