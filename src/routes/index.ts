import { Router } from "express";
import appAuth from "./auth/auth";
import appStore from "./store/store";
import billRoute from "./store/bill.store";
import tallaRoute from "./store/tallaproduct";
import appPro from "./store/proveedores";
import appClient from "./store/client";
import workerRoute from "./store/worker";
import appExport from "./store/exportaciones";
import materialRouter from "./store/buyMaterial";

const appRouter = Router();

appRouter.use('/auth', appAuth);
appRouter.use('/store', appStore);
appRouter.use('/bill', billRoute);
appRouter.use('/talla', tallaRoute)
appRouter.use('/proveedores',appPro)
appRouter.use('/client', appClient)
appRouter.use('/worker',workerRoute);
appRouter.use('/exportaciones', appExport);
appRouter.use('/material', materialRouter)


export default appRouter
