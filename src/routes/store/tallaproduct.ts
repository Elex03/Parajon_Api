import express from "express";
import { getProductTalla } from "../../controllers/store/tallaproduct.controller";



const tallaRoute = express.Router();

tallaRoute.get('/', getProductTalla);


export default tallaRoute;

