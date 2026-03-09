import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";


export const registerUser = async data => {
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
    return {
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    };
};

export const updateUserSubscription = async ({ id, subscription }) => {
    const user = await User.findByPk(id);
    if (!user) throw HttpError(404, `User not found with id: ${id}`);

    await user.update({ subscription });
    return user;
};
