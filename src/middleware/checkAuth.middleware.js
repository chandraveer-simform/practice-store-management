/***************** Middleware before routing **************/


const asyncHandler = require("express-async-handler");
const { STATUS_CODE, API_METHOD } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { getUserDataByToken } = require("./tokenProvider.middleware");
const { SingleValueReplace, URLStringToArray } = require("../helpers/rules");
const { PERMISSIONS } = require("../utils/rba");

/***************** Check user Auth by Token **************/
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

/***************** Module Access based on Permissions **************/

// eslint-disable-next-line no-undef
const authUserAccess = (roles) => asyncHandler(async (req, res, next) => {

  let urlStr = req.baseUrl;
  let method = req.method;
  let newStr = SingleValueReplace({ str: urlStr, pattern: "/" });
  let urlPath = URLStringToArray({ str: newStr, pattern: "/" });


  try {
    const { data } = await getUserDataByToken({ req, res });
    const { role } = data || {};
    // get grant permission
    let isAccess = roles.find((roleValue) => roleValue == role);
    // get module based permission
    if (!isAccess) {
      let isPermission = PERMISSIONS[role]?.[urlPath[0]];
      isAccess = checkPermission({ method, permission: isPermission });
    }

    if (isAccess) {
      next();
      return;
    }
  } catch (err) {
    res.status(STATUS_CODE.FORBIDDEN);
    throw new Error(ERROR_MESSAGE.unauthorized_access_not_allowed);

  }
});

/***************** Module Permissions as per the API method **************/

const checkPermission = ({ method, permission }) => {
  switch (method) {
    case API_METHOD.GET: {
      return permission.read;
    }
    case API_METHOD.POST:
    case API_METHOD.PUT: {
      return permission.write;
    }
    case API_METHOD.DELETE: {
      return permission.delete;
    }

  }
};

module.exports = { checkAuth, authUserAccess };