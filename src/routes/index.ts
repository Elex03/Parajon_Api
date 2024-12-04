import { Router } from "express";
import appAuth from "./auth/auth";
import appStore from "./store/store";
import billRoute from "./store/bill.store";
import tallaRoute from "./store/tallaproduct";

const appRouter = Router();

appRouter.use('/auth', appAuth);
appRouter.use('/store', appStore);
appRouter.use('/bill', billRoute);
appRouter.use('/talla', tallaRoute)

export default appRouter
