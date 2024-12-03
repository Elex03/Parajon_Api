import express from 'express';
import {   createNewBill,  getBillAndDetails} from "../../controllers/store/bill.controller";



const billRoute = express.Router();
billRoute.post('/', createNewBill);
//billRoute.get('/factura/:id_factura', getFacturaConCompras); pa'futuro
billRoute.get('/', getBillAndDetails);




export default billRoute;