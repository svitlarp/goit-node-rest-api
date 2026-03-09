import * as authServices from "../services/authServices.js";

export const authRegisterController = async (req, res) => {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

export const authLoginController = async (req, res) => {
    const { email, password } = req.body;
    const result = await authServices.loginUser({ email, password });
    res.status(200).json(result);
};


export const authUpdateSubscriptionController = async (req, res) => {
    const { id } = req.params;
    const { subscription } = req.body;
    const user = await authServices.updateUserSubscription({ id, subscription });
    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    });
};