import { Router } from "express";
import appAuth from "./auth/auth";
import appStore from "./store/store";
import billRoute from "./store/bill.store";

const appRouter = Router();

appRouter.use('/auth', appAuth);
appRouter.use('/store', appStore);
appRouter.use('/bill', billRoute);

export default appRouter
