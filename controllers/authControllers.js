import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

export const authRegisterController = async (req, res) => {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

export const authUpdateAvatarController = async (req, res) => {
    const avatarURLUpdated = await authServices.updateUserAvatar(req.user, req.file);
    res.status(200).json({
        avatarURL: avatarURLUpdated,
    });
}

export const authLoginController = async (req, res) => {
    const { email, password } = req.body;
    const result = await authServices.loginUser({ email, password });
    res.status(200).json(result);
};

export const authCurrentController = async (req, res) => {
    const {username, subscription} = req.user; 
    res.status(200).json({
        username,
        subscription,
    });
}

export const authVerifyController = async (req, res) => {
    const { verificationToken } = req.params;
    await authServices.verifyUserEmail(verificationToken);
    res.status(200).json({ message: "Verification successful" });
};

export const authResendVerifyController = async (req, res) => {
    const { email } = req.body;
    if (!email) throw HttpError(400, "missing required field email");
    await authServices.resendVerifyEmail(email);
    res.status(200).json({ message: "Verification email sent" });
};

export const authLogoutController = async (req, res) => {
    await authServices.logoutUser(req.user);
    res.status(204).send();
}

export const authUpdateSubscriptionController = async (req, res) => {
    const { id } = req.params;
    const { subscription } = req.body;
    const user = await authServices.updateUserSubscription({ id, subscription });
    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    });
};

