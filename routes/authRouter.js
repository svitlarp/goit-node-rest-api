import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema } from "../schemas/authSchema.js";
import { 
    authLoginController, 
    authRegisterController 
} from "../controllers/authControllers.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(authRegisterSchema), authRegisterController);
authRouter.post("/login", validateBody(authLoginSchema), authLoginController);

export default authRouter;