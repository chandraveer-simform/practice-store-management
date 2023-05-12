const asyncHandler = require("express-async-handler");

const { STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { getUserDataByToken } = require("./tokenProvider.middleware");
const { convertUrlToObj } = require("../model/utils/helper");
const { SingleValueReplace, GenerateSinglePattarn, URLStringToArray } = require("../helpers/rules");

const checkAuth = asyncHandler(async (req, res, next) => {
  try {
    const verified = await getUserDataByToken({ req, res });
    req.user = verified;
    next();
  } catch (err) {
    res.status(STATUS_CODE.UNAUTHORIZED);
    throw new Error(err?.message || ERROR_MESSAGE.unauthorized_auth_token_denied);
  }

});

// eslint-disable-next-line no-undef
const authUserAccess = (roles) => asyncHandler(async (req, res, next) => {
  //Not user
  let newStr = SingleValueReplace({ str: req.url, pattern: "/" });
  let urlPath = URLStringToArray({ str: newStr, pattern: "/" });
  // -------------------

  try {
    const { data } = await getUserDataByToken({ req, res });
    const { role } = data || {}
    const isAccess = roles.find((r) => r == role)
    console.log("isAccess", isAccess)
    if (isAccess) {
      next();
      return
    }
    res.status(STATUS_CODE.FORBIDDEN);
    throw new Error(ERROR_MESSAGE.unauthorized_access_not_allowed);
  } catch (err) {
    res.status(STATUS_CODE.UNAUTHORIZED);
    throw new Error(err?.message || ERROR_MESSAGE.unauthorized_auth_token_denied);
  }
});

module.exports = { checkAuth, authUserAccess };