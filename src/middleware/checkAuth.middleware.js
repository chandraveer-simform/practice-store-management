const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")

const { KEYS_NAME, STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");

module.exports = asyncHandler((req, res, next) => {
  const token = req.header(KEYS_NAME.AUTH_TOKEN);
  if (!token) {
    res.status(STATUS_CODE.UNAUTHORIZED)
    throw new Error(ERROR_MESSAGE.unauthorized_access_denied)
  }


  try {
    const verified = jwt.verify(token, process.env.jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(STATUS_CODE.UNAUTHORIZED)
    throw new Error(ERROR_MESSAGE.unauthorized_auth_token_denied)

  };
})