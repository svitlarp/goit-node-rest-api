import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema, authUpdateSubscriptionSchema } from "../schemas/authSchema.js";
import {
    authLoginController,
    authRegisterController,
    authUpdateSubscriptionController
} from "../controllers/authControllers.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), authRegisterController);
authRouter.post("/login", validateBody(authLoginSchema), authLoginController);
authRouter.patch("/subscription/:id", validateBody(authUpdateSubscriptionSchema), authUpdateSubscriptionController);

export default authRouter;