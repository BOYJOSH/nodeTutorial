import { Router } from "express";
import { getUserProfileController, loginUserController, signUpUserController } from "./users.controllers.js";
import { auth } from "../middleware/auth.js";

export const userRoutes = Router();

userRoutes.post("/login", loginUserController)
userRoutes.post("/signup", signUpUserController)
userRoutes.get("/", auth, getUserProfileController)