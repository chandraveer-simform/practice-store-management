const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
require('dotenv').config()
const _ = require("lodash");
const { optMatch, otpGeneratorWithHash } = require("../helpers/helpers");
const { STATUS_CODE, NUMERIC_VALUES } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { checkExistUser, } = require("../model/users.model");
const { SUCCESS_MESSAGE } = require("../utils/successMessage");
const { createOTP, checkExisOTP, getAllOTPLists, deleteOtpByMobile } = require("../model/otp.model");
const { sendOTPToProvider, verifyOTPToProvider } = require("../middleware/smsProvider.middleware");
const smsProvider = require("../config/sms.provider")
const compareOtp = async ({ mobile, otp }) => {
    const otpRes = await checkExisOTP(mobile)
    if (otpRes.length <= 0) {
        throw new Error(ERROR_MESSAGE.otp_expired)
    } else {
        const isValid = await optMatch(otpRes, otp)
        if (isValid) {
            const { name, mobile } = isValid
            return {
                message: SUCCESS_MESSAGE.otp_verified_success,
                otpDetails: {
                    name,
                    mobile
                }
            }
        }
        throw new Error(ERROR_MESSAGE.otp_invalid)
    }
}

const sendOTP = asyncHandler(async (req, res, next) => {
    const { mobile } = req.body
    const { resend } = req?.query
    if (!mobile) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        const result = await checkExistUser(req.body.mobile)
        if (result.length) {
            throw new Error(ERROR_MESSAGE.user_already_exist)
        } else {
            // username is available 
            const { otp, hash } = await otpGeneratorWithHash()
            console.log(otp)
            try {
                const { message } = await sendOTPToProvider({ mobile, otp, isRresend: resend })
                let result = await createOTP({
                    ...req.body,
                    otp: hash,
                    smsId: message
                })
                res.send({
                    message: Boolean(resend) ? SUCCESS_MESSAGE.otp_resend_success : SUCCESS_MESSAGE.otp_send_success,
                    otpDetails: result
                });
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

const verifiyOTP = asyncHandler(async (req, res) => {
    const { mobile, otp } = req.body
    if (!mobile) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        const { message } = await verifyOTPToProvider({ mobile, otp })
        let otpRes = await compareOtp({ mobile, otp })
        otpRes = _.omit(otpRes, ['otpDetails'])
        return res.status(200).json({
            ...otpRes
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
});

const getAllOTP = asyncHandler(async (req, res) => {
    try {
        const RowDataPacket = await getAllOTPLists()
        return res.status(200).json({
            otp: RowDataPacket
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
});

const deleteOtp = async ({ mobile }) => {
    try {
        const deleteOtpRes = await deleteOtpByMobile({ mobile })
        if (deleteOtpRes.affectedRows) {
            return {
                message: SUCCESS_MESSAGE.delete_success,
                affectedRows: deleteOtpRes.affectedRows,
            }
        }
        throw new Error(ERROR_MESSAGE.something_wrong)
    } catch (err) {
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
}


module.exports = {
    sendOTP,
    verifiyOTP,
    compareOtp,
    getAllOTP,
    deleteOtp
};
