import { Router } from "express";
import { createBankAccountController } from "./accounts.controller.js";
import{auth} from "../middleware/auth.js"

export const accountRouter = Router();

accountRouter.post('/create', createBankAccountController);