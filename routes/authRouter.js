import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema, authUpdateSubscriptionSchema } from "../schemas/authSchema.js";
import {
    authLoginController,
    authRegisterController,
    authUpdateSubscriptionController,
    authCurrentController,
    authLogoutController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), authRegisterController);
authRouter.post("/login", validateBody(authLoginSchema), authLoginController);
authRouter.get("/current", authenticate, authCurrentController);
authRouter.post("/logout", authenticate, authLogoutController);
authRouter.patch("/subscription/:id", validateBody(authUpdateSubscriptionSchema), authUpdateSubscriptionController);

export default authRouter;