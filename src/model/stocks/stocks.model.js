const sql = require("../config");
const asyncHandler = require("express-async-handler")
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");

const createStock = asyncHandler(async (newStock) => {
    return await insertQuery({ queryName: "INSERT INTO Stocks SET ?", values: newStock })
})

const getStockDetailsById = asyncHandler(async ({ stock_id }) => {
    return await selectQuery({ queryName: `SELECT * FROM Stocks WHERE stock_id=${stock_id}` })
})


module.exports = { createStock, getStockDetailsById }