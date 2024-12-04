import express from 'express';
import { createTrabajador, getTrabajadores } from '../../controllers/store/worker.controller';

const workerRoute = express.Router();


workerRoute.post('/', createTrabajador);
workerRoute.get('/', getTrabajadores);


export default workerRoute;