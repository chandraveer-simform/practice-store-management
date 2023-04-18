const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
require('dotenv').config()
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const sql = require("../config")
const { makeRandomSting } = require("../helpers/helpers");
const { STATUS_CODE, NUMERIC_VALUES } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { checkExistUser, createUser, getUserById, getAllUserLists } = require("../model/users.model");
const { SUCCESS_MESSAGE } = require("../utils/successMessage");

const userRegister = asyncHandler(async (req, res, next) => {
    const { mobile, store_name, store_type, role } = req.body
    if (!store_name || !mobile || !role || !store_type) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        const result = await checkExistUser(req.body.mobile)
        if (result.length) {
            throw new Error(ERROR_MESSAGE.user_already_exist)
        } else {
            // username is available
            const hash = bcrypt.hashSync(makeRandomSting(NUMERIC_VALUES.PASSWORD_LENGHT), NUMERIC_VALUES.PASS_SALT_ROUNDS)
            try {
                let result = await createUser({
                    ...req.body,
                    password: hash
                })
                res.send(result);
            } catch (err) {
                res.status(STATUS_CODE.SERVER_ERROR)
                throw new Error(err.message || ERROR_MESSAGE.data_creating_error)
            }
        }
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
})


const userLogin = asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        res.status(STATUS_CODE.UNAUTHORIZED)
        throw new Error(ERROR_MESSAGE.unauthorized_invalid_login)
    }
    try {
        const user = await checkExistUser(userName)
        if (user.length) {
            const hash = await bcrypt.compare(password, user[0].password)
            if (hash) {
                const token = await jwt.sign(
                    {
                        userId: user[0].uid,
                        mobile: user[0].mobile,
                        email: user[0].email,
                    },
                    process.env.jwtSecret,
                    {
                        expiresIn: "1d",
                    }
                );
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
                throw new Error(ERROR_MESSAGE.unauthorized_invalid_pass)
            }
        } else {
            res.status(STATUS_CODE.UNAUTHORIZED)
            throw new Error(ERROR_MESSAGE.unauthorized_invalid_user)
        }
    } catch (err) {
        res.status(STATUS_CODE.UNAUTHORIZED)
        throw new Error(err.message || ERROR_MESSAGE.unauthorized_invalid_login)
    }
})

const getMe = asyncHandler(async (req, res) => {
    const uid = req.user?.userId;
    try {
        const [RowDataPacket] = await getUserById({ uid })

        const userById = await _.omit(RowDataPacket, ['password','updated_at']);
        return res.status(200).json({
            userDetails: {
                ...userById
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const RowDataPacket = await getAllUserLists()
        return res.status(200).json({
            users: RowDataPacket
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
});


module.exports = {
    userLogin,
    userRegister,
    getMe,
    getAllUsers
};