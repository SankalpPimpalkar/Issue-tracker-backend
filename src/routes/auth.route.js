import { RegisterUser, GetCurrentUser, LoginUser, IsUserNameExists } from "../controllers/auth.controller.js";
import { Router } from "express";
import VerifyUser from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/register", RegisterUser)
authRouter.post("/login", LoginUser)
authRouter.get("/user/get", VerifyUser, GetCurrentUser)
authRouter.get("/check/:username/validity", IsUserNameExists)

export default authRouter;