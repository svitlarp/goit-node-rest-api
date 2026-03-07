import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import "dotenv/config";


const {JWT_SECRET} = process.env;

export const registerUser = async data => {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return User.create({
        ...data,
        password: passwordHash
    });
}

export const loginUser = async ({email, password}) => {
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
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "2h"});
    // TODO return user.subscription
    return {token, user: {email: user.email}};
}
