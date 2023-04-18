const asyncHandler = require("express-async-handler")
const { STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { createProduct, getProductByProductId, getAllProductsLists } = require("../model/products.modal");

// Create new Product
const createNewProduct = asyncHandler(async (req, res, nmext) => {
    const { product_name, brand_id } = req.body || {}
    if (!product_name || !brand_id) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        let result = await createProduct({ ...req.body })
        res.send(result)
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR)
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error)
    }
})

// get all products list
const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const RowDataPacket   = await getAllProductsLists()
        return res.status(200).json({
            products: RowDataPacket,
        })
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
})

//get product by product id
const getProductById = asyncHandler(async (req, res) => {
    const  product_id  = req.params.id;
    try {
        const [RowDataPacket] = await getProductByProductId({ product_id })
        return res.status(200).json({
            productDetails: {
                ...RowDataPacket
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.records_not_found)
    }
});

module.exports = {
    createNewProduct,
    getAllProducts,
    getProductById,
};