import * as authServices from "../services/authServices.js";

export const authRegisterController = async (req, res) => {
    const newUser = await authServices.registerUser(req.body);
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};

export const authLoginController = async (req, res) => {
    const { email, password } = req.body;
    const token = await authServices.loginUser({email, password});
    res.json({ 
        token
    });
};