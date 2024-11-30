import { Router } from "express";
import appAuth from "./auth/auth";
import appStore from "./store/store";

const appRouter = Router();

appRouter.use('/auth', appAuth);
appRouter.use('/store', appStore);

export default appRouter