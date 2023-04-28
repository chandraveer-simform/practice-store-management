const jwt = require("jsonwebtoken");

const createToken = async ({ tokenValue, expiresIn = "1d" }) => {
    try {
        return await jwt.sign(
            {
                ...tokenValue
            },
            process.env.jwtSecret,
            {
                expiresIn: expiresIn,
            }
        );
    } catch (e) {
        return e;
    }
};

module.exports = { createToken };
