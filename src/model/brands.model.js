const asyncHandler = require("express-async-handler")
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");

const createBrand = asyncHandler(async (newBrand) => {
    const { elements, data }= await insertQuery({ queryName: "INSERT INTO Brands SET ?", values: newBrand })
    return { ...data, brand_id: elements.insertId }
})

const getAllBrandsLists = asyncHandler(async () => {
    return await selectQuery({ queryName: "SELECT * FROM Brands" })
})

const getBrandByBrandId = asyncHandler(async ({ brand_id }) => {
    return await selectQuery({ queryName: `SELECT * FROM Brands WHERE brand_id=${brand_id}` })
})
 
module.exports = { createBrand, getAllBrandsLists, getBrandByBrandId }