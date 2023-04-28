const { find } = require("underscore");
const bcrypt = require("bcrypt");
const { NUMERIC_VALUES } = require("../utils/constants");
const makeRandomSting = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const otpGenerator = (length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const otpGeneratorWithHash = async (otpLenght = NUMERIC_VALUES.OTP_LENGHT, otpSalt = NUMERIC_VALUES.OTP_SALT_ROUNDS) => {
  const otp = await otpGenerator(otpLenght)
  const hash = await bcrypt.hashSync(otp, otpSalt)
  return { otp, hash }
}

const getJson = (value) => {
  return JSON.parse(JSON.stringify(value))
}

const optMatch = async (otpList, otp) => {
  for (let key in otpList) {
    let value = otpList[key]
    const hash = await bcrypt.compare(otp, value.otp)
    if (hash) {
      return value
    }
  }
  return undefined
}




module.exports = { makeRandomSting, otpGenerator, otpGeneratorWithHash, getJson, optMatch }
