const asyncHandler = require("express-async-handler");
const { objectReformatByKey } = require("./utils/helper");
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");


const createProduct = asyncHandler(async (newProduct) => {
    const { elements, data }=  await insertQuery({ queryName: "INSERT INTO Products SET ?", values: newProduct });
    return { ...data, product_id: elements.insertId };
});

const getAllProductsLists = asyncHandler(async () => {
    return await selectQuery({ queryName: "SELECT * FROM Products" });
});

const getProductByProductId = asyncHandler(async ({ product_id }) => {
    const [RowDataPacket] = await selectQuery({
        queryName: `SELECT * FROM Products as P 
    LEFT JOIN Brands as B ON P.brand = B.brand_id 
    LEFT JOIN GoodsComprisesCode as G ON P.hsn_code = G.gcc_id
    LEFT JOIN Units as U ON P.unit = U.unit_id
    WHERE P.product_id=${product_id}`
    });
    return objectReformatByKey({ keys: { brand: ["brand_id", "brand_name"], hsn_code: ["gcc_id", "gcc_code", "gcc_description"], unit: ["unit_id", "unit_name",] }, object: RowDataPacket });
});


module.exports = { createProduct, getAllProductsLists, getProductByProductId };