import { Router } from "express";
import {userRoutes } from "../users/users.routes.js"
import { transactionRouter } from "../transactions/transactions.routes.js";
//import { accountRouter } from "../accounts/users.routes.js";

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/transactions', transactionRouter);
//routes.use('/accounts', accountRouter)