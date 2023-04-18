const asyncHandler = require("express-async-handler")
const { STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { createBrand, getBrandByBrandId, getAllBrandsLists } = require("../model/brands.model");

// Create new Brand
const createNewBrand = asyncHandler(async (req, res, nmext) => {
    const { brand_name } = req.body || {}
    if (!brand_name) {
        res.status(STATUS_CODE.VALIDATION_ERROR)
        throw new Error(ERROR_MESSAGE.mandatory_all_fields)
    }
    try {
        let result = await createBrand({ ...req.body })
        res.send(result)
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR)
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error)
    }
})

// get all brands list
const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const RowDataPacket   = await getAllBrandsLists()
        return res.status(200).json({
            brands: RowDataPacket,
        })
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.something_wrong)
    }
})

//get brand by brand id
const getBrandById = asyncHandler(async (req, res) => {
    const  brand_id  = req.params.id;
    try {
        const [RowDataPacket] = await getBrandByBrandId({ brand_id })
        return res.status(200).json({
            brandDetails: {
                ...RowDataPacket
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN)
        throw new Error(err.message || ERROR_MESSAGE.records_not_found)
    }
});


module.exports = {
    createNewBrand,
    getAllBrands,
    getBrandById,
};