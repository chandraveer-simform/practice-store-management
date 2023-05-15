const asyncHandler = require("express-async-handler");
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");
const sql = require("../config/database");

const createUser = asyncHandler(async (newUsers) => {
    const { elements, data } = await insertQuery({ queryName: "INSERT INTO Users SET ?", values: newUsers });
    return { ...data, uid: elements.insertId };
});

const checkExistUser = asyncHandler(async (data) => {
    return await selectQuery({
        queryName: `SELECT * FROM Users WHERE LOWER(mobile) = LOWER(${sql.escape(
            data
        )});`
    });
});

const getUserById = asyncHandler(async ({ uid }) => {
    return await selectQuery({
        queryName: `SELECT * FROM Users as U WHERE U.uid=${uid}`
    });
});

const getAllUserLists = asyncHandler(async () => {
    return await selectQuery({ queryName: "SELECT * FROM Users" });
});


module.exports = { createUser, checkExistUser, getUserById, getAllUserLists };