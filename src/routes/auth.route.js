import { RegisterUser, GetCurrentUser, LoginUser } from "../controllers/auth.controller.js";
import { Router } from "express";
import VerifyUser from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", VerifyUser, RegisterUser)
authRouter.post("/login", VerifyUser, LoginUser)
authRouter.get("/register", VerifyUser, GetCurrentUser)

export default authRouter;