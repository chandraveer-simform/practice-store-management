/* eslint-disable quotes */
const jwt = require("jsonwebtoken");
const { STATUS_CODE, KEYS_NAME } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");

const createToken = async ({ tokenValue, expiresIn = "1d" }) => {
    try {
        return await jwt.sign({
            data: { ...tokenValue },
            expiresIn: expiresIn,
        }, process.env.jwtSecret,);
    } catch (e) {

        return e;
    }
};

const getUserDataByToken = async ({ req, res }) => {
    const bearerHeader = req.header(KEYS_NAME.AUTHORIZATION);
    if (!bearerHeader) {
        res.status(STATUS_CODE.UNAUTHORIZED);
        throw new Error(ERROR_MESSAGE.unauthorized_access_denied);
    }
    try {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        return jwt.verify(token, process.env.jwtSecret);

    } catch (err) {
        res.status(STATUS_CODE.UNAUTHORIZED);
        throw new Error(err?.message || ERROR_MESSAGE.unauthorized_auth_token_denied);
    }
};

module.exports = { createToken, getUserDataByToken };
