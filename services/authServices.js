import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";


export const registerUser = async data => {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) throw HttpError(409, "Email in use"); 

    const passwordHash = await bcrypt.hash(data.password, 10);
    return User.create({
        ...data,
        password: passwordHash
    });
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email,
        }
    });

    if (!user) throw HttpError(401, "Email is wrong");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw HttpError(401, "Password is wrong");

    const payload = {
        id: user.id,
    }
    const token = createToken(payload);
    await user.update({token});
    return {
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    };
};

export const logoutUser = async (user) => {
    return user.update({token: null});
}

export const updateUserSubscription = async ({ id, subscription }) => {
    const user = await User.findByPk(id);
    if (!user) throw HttpError(404, `User not found with id: ${id}`);

    await user.update({ subscription });
    return user;
};
