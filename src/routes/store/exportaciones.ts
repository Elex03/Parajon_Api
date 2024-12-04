import express from 'express';
import { createExportacion, getExportaciones } from '../../controllers/store/exportaciones.controller';


const appExport = express.Router();

appExport.post('/', createExportacion);
appExport.get('/', getExportaciones);


export default appExport;