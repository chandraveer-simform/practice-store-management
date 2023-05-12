/* eslint-disable quotes */
/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const _ = require("lodash");
const { makeRandomSting } = require("../helpers/helpers");
const { STATUS_CODE, NUMERIC_VALUES } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { checkExistUser, createUser, getUserById, getAllUserLists } = require("../model/users.model");
const { SUCCESS_MESSAGE } = require("../utils/successMessage");
const { createToken, getUserDataByToken } = require("../middleware/tokenProvider.middleware");
const { compareOtp, deleteOtp } = require("./otp.controllers");

const createRegisterUser = async ({ values }) => {
    try {
        const pass = makeRandomSting(NUMERIC_VALUES.PASSWORD_LENGHT);
        const hash = bcrypt.hashSync(pass, NUMERIC_VALUES.PASS_SALT_ROUNDS);
        const res = await createUser({
            ...values,
            password: hash
        });
        let user = await _.omit(res, ["password", "created_at", "updated_at"]);
        return { ...user, password: pass };
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR);
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error);
    }
};

// eslint-disable-next-line no-unused-vars
const signupWitOTP = asyncHandler(async (req, res, next) => {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
        res.status(STATUS_CODE.VALIDATION_ERROR);
        throw new Error(ERROR_MESSAGE.otp_invalid);
    }
    try {
        const result = await checkExistUser(mobile);
        if (0 < result.length) {
            throw new Error(ERROR_MESSAGE.user_already_exist);
        } else {
            // username is available   
            try {
                let { otpDetails } = await compareOtp({ mobile, otp });
                await deleteOtp({ mobile });
                let result = await createRegisterUser({ values: { name: otpDetails.name, mobile: otpDetails.mobile } });
                const token = await createToken(tokenValue = {
                    userId: result.uid,
                    role: result.role,
                    mobile: result.mobile,
                });
                result = await _.omit(result, ["password"]);
                res.send({
                    userDetails: {
                        ...result
                    },
                    token: token
                });
            } catch (err) {
                res.status(STATUS_CODE.SERVER_ERROR);
                throw new Error(err.message || ERROR_MESSAGE.data_creating_error);
            }
        }
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR);
        throw new Error(err.message || ERROR_MESSAGE.something_wrong);
    }
});

// eslint-disable-next-line no-unused-vars
const signup = asyncHandler(async (req, res, next) => {
    const { mobile, role } = req.body;
    if (!mobile || !role) {
        res.status(STATUS_CODE.VALIDATION_ERROR);
        throw new Error(ERROR_MESSAGE.mandatory_all_fields);
    }
    try {
        const result = await checkExistUser(req.body.mobile);
        if (result.length) {
            throw new Error(ERROR_MESSAGE.user_already_exist);
        } else {
            // username is available 
            try {
                let result = await createRegisterUser({ values: { ...req.body } });
                result = await _.omit(result, ["password"]);
                res.send({
                    message: SUCCESS_MESSAGE.sign_up_success,
                    userDetails: {
                        ...result
                    }
                });
            } catch (err) {
                res.status(STATUS_CODE.SERVER_ERROR);
                throw new Error(err.message || ERROR_MESSAGE.data_creating_error);
            }
        }
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR);
        throw new Error(err.message || ERROR_MESSAGE.something_wrong);
    }
});


// eslint-disable-next-line no-unused-vars
const userLogin = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(STATUS_CODE.UNAUTHORIZED);
        throw new Error(ERROR_MESSAGE.unauthorized_invalid_login);
    }
    try {
        const user = await checkExistUser(userName);
        console.log("user", user);
        if (user.length) {
            const hash = await bcrypt.compare(password, user[0].password);
            if (hash) {
                const token = await createToken({
                    tokenValue: {
                        userId: user[0].uid,
                        role: user[0].role,
                        mobile: user[0].mobile,
                    }
                });
                return res.status(200).json({
                    message: SUCCESS_MESSAGE.auth_success,
                    userDetails: {
                        uid: user[0].uid,
                        first_name: user[0].first_name,
                        last_name: user[0].last_name,
                        mobile: user[0].mobile,
                        email: user[0].email,
                        age: user[0].age,
                        store_name: user[0].store_name,
                        store_type: user[0].store_type,
                        role: user[0].role,
                    },
                    token: token,
                });
            } else {
                throw new Error(ERROR_MESSAGE.unauthorized_invalid_pass);
            }
        } else {
            res.status(STATUS_CODE.UNAUTHORIZED);
            throw new Error(ERROR_MESSAGE.unauthorized_invalid_user);
        }
    } catch (err) {
        res.status(STATUS_CODE.UNAUTHORIZED);
        throw new Error(err.message || ERROR_MESSAGE.unauthorized_invalid_login);
    }
});

const getMe = asyncHandler(async (req, res) => {
    try {
        const { data } = await getUserDataByToken({ req, res });
        const uid = data.userId;
        const [RowDataPacket] = await getUserById({ uid });

        const userById = await _.omit(RowDataPacket, ["password", "updated_at"]);
        return res.status(200).json({
            userDetails: {
                ...userById
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN);
        throw new Error(err.message || ERROR_MESSAGE.something_wrong);
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const RowDataPacket = await getAllUserLists();
        return res.status(200).json({
            users: RowDataPacket
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN);
        throw new Error(err.message || ERROR_MESSAGE.something_wrong);
    }
});


module.exports = {
    userLogin,
    createRegisterUser,
    signup,
    signupWitOTP,
    getMe,
    getAllUsers
};
