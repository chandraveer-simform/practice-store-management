const asyncHandler = require("express-async-handler")
const { STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { createStock, getStockDetailsById } = require("../../model/stocks/stocks.model");

// Add/Create new Product in stock
const addNewProductInStock = asyncHandler(async (req, res, nmext) => {
    const { product_id } = req.body || {}
    if (!product_id) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        let result = await createStock({ ...req.body })
        res.send(result)
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR)
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error)
    }
})

//get stocks details by stock_id
const getStockDetailsByStockId = asyncHandler(async (req, res) => {
    const { stock_id } = req?.body
    try {
        const [RowDataPacket] = await getStockDetailsById({ stock_id })
        return res.status(200).json({
            stockDetails: {
                ...RowDataPacket
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
});

module.exports = {
    addNewProductInStock,
    getStockDetailsByStockId,
};