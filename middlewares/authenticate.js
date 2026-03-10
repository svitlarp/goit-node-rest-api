import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwtToken.js";
import User from "../db/models/User.js";


const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    console.log("authorization: ", authorization);
    if (!authorization) throw HttpError(401, 'Authorization header missing');

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") throw HttpError(401, 'Authorization must have Bearer token type');
    console.log("token verification");

    const { data, error} = verifyToken(token);
    if (error) throw HttpError(401, error.message);

    console.log("user verification");
    const user = await User.findOne({
        where: {
            id: data.id,
        }
    });
    if (!user || !user.token) throw HttpError(401, 'User not found');
    req.user = user; //all info about user will be in req.user
    next();
}

export default authenticate;    
