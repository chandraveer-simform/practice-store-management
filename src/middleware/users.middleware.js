const { check } = require("express-validator");

exports.sendOTPValidation = [
    check("mobile", "Name is requied").not().isEmpty(), 
];
