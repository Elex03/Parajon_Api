import express from 'express';
import { createMateriaPrima, getAllMateriasPrimas } from '../../controllers/store/MateriaP.controller';

const  materialRouter = express.Router();


materialRouter.get('/', getAllMateriasPrimas);
materialRouter.post('/', createMateriaPrima);

export default materialRouter;
