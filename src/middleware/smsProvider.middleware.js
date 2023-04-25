const sms = require("../config/sms.provider")


const sendOTP = async ({ mobile, otp }) => {
    try {
        return sms.send("flowId", { 'mobile': mobile, "VAR1": otp });
    } catch (e) {
        return e
    }
}

module.exports = { sendOTP }