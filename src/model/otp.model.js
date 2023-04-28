const asyncHandler = require("express-async-handler")
const { insertQuery, deleteQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");
const sql = require("../config/database");
const tableName = 'otp'

const createOTP = asyncHandler(async (newValues) => {
    const { elements, data } = await insertQuery({ queryName: `INSERT INTO ${tableName} SET ?`, values: newValues })
    return { ...data, otp_id: elements.insertId }
})

const checkExisOTP = asyncHandler(async (data) => {
    return await selectQuery({
        queryName: `SELECT * FROM  ${tableName} WHERE LOWER(mobile) = LOWER(${sql.escape(
            data
        )});`
    })
});


const getAllOTPLists = asyncHandler(async () => {
    return await selectQuery({ queryName: `SELECT * FROM ${tableName}` })
})

const deleteOtpByMobile = asyncHandler(async({ mobile }) => {
    const { elements, data }= await deleteQuery({ queryName: `DELETE FROM ${tableName} WHERE mobile=${mobile}` })
    return { ...data,affectedRows:elements.affectedRows}
})


module.exports = { createOTP, checkExisOTP, getAllOTPLists, deleteOtpByMobile }
