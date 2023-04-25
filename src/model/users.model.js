const asyncHandler = require("express-async-handler")
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");
const sql = require("../config");

const createUser = asyncHandler(async (newUsers) => {
    return await insertQuery({ queryName: "INSERT INTO Users SET ?", values: newUsers })
})

const checkExistUser = asyncHandler(async (data) => {
    return await selectQuery({
        queryName: `SELECT * FROM Users WHERE LOWER(mobile) = LOWER(${sql.escape(
            data
        )});`
    })
});

const getUserById = asyncHandler(async ({ uid }) => {
    return await selectQuery({ queryName: `SELECT * FROM Users WHERE uid=${uid}` })
})

const getAllUserLists = asyncHandler(async () => {
    return await selectQuery({ queryName: `SELECT * FROM Users` })
})


module.exports = { createUser, checkExistUser, getUserById, getAllUserLists }