import express from 'express';
import { createDonacion, getAllDonaciones } from '../../controllers/store/donaciones.controller';

const appDonaciones = express.Router();

appDonaciones.get('/', getAllDonaciones);
appDonaciones.post('/', createDonacion);




export default appDonaciones;
