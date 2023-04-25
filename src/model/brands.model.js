const asyncHandler = require("express-async-handler")
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");

const createBrand = asyncHandler(async (newBrand) => {
    return await insertQuery({ queryName: "INSERT INTO Brands SET ?", values: newBrand })
})

const getAllBrandsLists = asyncHandler(async () => {
    return await selectQuery({ queryName: "SELECT * FROM Brands" })
})

const getBrandByBrandId = asyncHandler(async ({ brand_id }) => {
    return await selectQuery({ queryName: `SELECT * FROM Brands WHERE brand_id=${brand_id}` })
})
 
module.exports = { createBrand, getAllBrandsLists, getBrandByBrandId }