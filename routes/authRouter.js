import express from "express";
import validateBody from "../helpers/validateBody.js";
import { authRegisterSchema, authLoginSchema, authUpdateSubscriptionSchema } from "../schemas/authSchema.js";
import {
    authLoginController,
    authRegisterController,
    authUpdateSubscriptionController,
    authCurrentController,
    authLogoutController,
    authUpdateAvatarController,
    authVerifyController,
    authResendVerifyController,
} from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";


const authRouter = express.Router();

authRouter.post("/register", upload.single("avatarURL"), validateBody(authRegisterSchema), authRegisterController);
authRouter.patch("/avatars", authenticate, upload.single("avatarURL"), authUpdateAvatarController);
authRouter.post("/login", validateBody(authLoginSchema), authLoginController);
authRouter.get("/current", authenticate, authCurrentController);
authRouter.get("/verify/:verificationToken", authVerifyController);
authRouter.post("/verify", authResendVerifyController);
authRouter.post("/logout", authenticate, authLogoutController);
authRouter.patch("/subscription/:id", validateBody(authUpdateSubscriptionSchema), authUpdateSubscriptionController);

export default authRouter;