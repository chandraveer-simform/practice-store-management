const smsInitialization = require("../config/sms.provider")
const { STATUS_TYPE_MESSAGE } = require("../utils/constants")
const { API_PARAMS } = require("../utils/engText")
const { ERROR_MESSAGE } = require("../utils/errorMessage")

require('dotenv').config()

const ROUTE = {
    otp: 106
}
const OTPConfig = {
    authKey: process.env.smsAuthKey,
    senderId: process.env.smsSenderId,
    template_id: process.env.smsTemplateId,
    route: ROUTE?.otp
}

const { send, resend, verify } = smsInitialization({ ...OTPConfig });

const sendOTPToProvider = async ({ mobile, otp, isRresend }) => {
    try {
        
        if (Boolean(isRresend)) {
            const res = await resend({ mobileNos: mobile, message: otp })
            const { message, request_id, type } = res
            if (type === STATUS_TYPE_MESSAGE.SUCCESS) {
                return { message: request_id }
            }
            throw new Error(message || ERROR_MESSAGE.something_wrong)
        }
        const res = await send({ mobileNos: mobile, message: otp })
        const { message, request_id, type } = res
        console.log(res)
        if (type === STATUS_TYPE_MESSAGE.SUCCESS) {
            return { message: request_id }
        }
        throw new Error(message || ERROR_MESSAGE.something_wrong)
    } catch (err) {
        throw new Error(err, ERROR_MESSAGE.something_wrong)
    }
}

const verifyOTPToProvider = async ({ mobile, otp }) => {
    try {
        const res = await verify({ mobileNos: mobile, message: otp })
        const { message, request_id, type } = res
        console.log("verify", res)
        if (type === STATUS_TYPE_MESSAGE.SUCCESS) {
            return { message: message }
        }
        throw new Error(message || ERROR_MESSAGE.something_wrong)
    } catch (err) {
        throw new Error(err, ERROR_MESSAGE.something_wrong)
    }
}

module.exports = { sendOTPToProvider, verifyOTPToProvider }
