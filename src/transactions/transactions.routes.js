import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { transferController, createBankAccountController } from "./transfer.controllers.js";
import { withdrawController } from "./withdraw.controllers.js";


export const transactionRouter = Router();

transactionRouter.post("/transfer", auth, transferController);
//transactionRouter.post("/deposit", depositController);
transactionRouter.post("/create", createBankAccountController);
transactionRouter.post("/withdraw", withdrawController);