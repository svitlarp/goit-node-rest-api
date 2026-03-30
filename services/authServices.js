import * as fs from "fs/promises"; 
import path from "path";
import { v4 as uuidv4 } from "uuid";
import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import gravatar from "gravatar";
import sendEmail from "../helpers/sendEmail.js";


export const registerUser = async data => {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) throw HttpError(409, "Email in use");

    const passwordHash = await bcrypt.hash(data.password, 10);
    const avatarURL = gravatar.url(data.email, { s: "200", r: "g", d: "monsterid" }, true);
    const verificationToken = uuidv4();

    const newUser = await User.create({
        ...data,
        password: passwordHash,
        avatarURL,
        verificationToken,
    });

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    await sendEmail({
        to: data.email,
        subject: "Verify your email",
        html: `<p>Click <a href="${BASE_URL}/api/auth/verify/${verificationToken}">here</a> to verify your email.</p>`,
    });

    return newUser;
};

export const updateUserAvatar = async (user, file) => {
    let newAvatar = null;
    if (file) {
        const newPath = path.resolve("public", "avatars", file.filename);
        await fs.rename(file.path, newPath);
        newAvatar = `/avatars/${file.filename}`;
    }
    user.update({avatarURL: newAvatar});
    return user.avatarURL;
}

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({
        where: {
            email,
        }
    });

    if (!user) throw HttpError(401, "Email is wrong");
    if (!user.verify) throw HttpError(401, "Email not verified");

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

export const verifyUserEmail = async (verificationToken) => {
    const user = await User.findOne({ where: { verificationToken } });
    if (!user) throw HttpError(404, "User not found");
    await user.update({ verify: true, verificationToken: null });
};

export const resendVerifyEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw HttpError(404, "User not found");
    if (user.verify) throw HttpError(400, "Verification has already been passed");

    const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${BASE_URL}/api/auth/verify/${user.verificationToken}">here</a> to verify your email.</p>`,
    });
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
