import { Router } from "express";
import { getUserProfileController, loginUserController, signUpUserController, transferController } from "./users.controllers.js";
import { auth } from "../middleware/auth.js";

export const userRoutes = Router();

userRoutes.post("/login", loginUserController)
userRoutes.post("/signup", signUpUserController)
userRoutes.post("/transfer", transferController)
userRoutes.get("/", auth, getUserProfileController)