const asyncHandler = require("express-async-handler");
const { objectReformatByKey, arrOfObjectReformatByKey } = require("./utils/helper");
const { insertQuery } = require("./utils/mutations");
const { selectQuery } = require("./utils/queries");

// Create Stores Types
const createStoresType = asyncHandler(async (newValues) => {
    const { elements, data } = await insertQuery({ queryName: "INSERT INTO Stores_Types SET ?", values: newValues });
    return { ...data, stype_id: elements.insertId };
});


// Create Stores
const createStores = asyncHandler(async (newValues) => {
    const { elements, data } = await insertQuery({ queryName: "INSERT INTO Stores SET ?", values: newValues });
    return { ...data, stores_id: elements.insertId };
});

const getStoresByUserId = asyncHandler(async ({ uid }) => {
    const result = await selectQuery({
        queryName: `SELECT 
        S.store_id, S.name as store_name, 
        ST.stype_id, ST.name as store_type_name 
        FROM Stores as S 
        LEFT JOIN Stores_Types as ST ON S.store_type = ST.stype_id  
        WHERE S.user_id=${uid}`
    });

    return arrOfObjectReformatByKey({ keys: { store_type: ["stype_id", "store_type_name"] }, arrayOfObj: result });
});


const getStoresByStoreId = asyncHandler(async ({ id }) => {
    const result = await selectQuery({
        queryName: `SELECT 
        S.store_id, S.name as store_name, S.user_id as user,
        ST.stype_id, ST.name as store_type_name, 
        Us.uid , Us.name as user_name, Us.mobile, Us.email, Us.role  
        FROM Stores as S 
        LEFT JOIN Stores_Types as ST ON S.store_type = ST.stype_id 
        LEFT JOIN Users as Us ON Us.uid = S.user_id 
        WHERE S.store_id=${id}`
    });
    return objectReformatByKey({ keys: { store_type: ["stype_id", "store_type_name"], user: ["uid", "user_name", "mobile", "email", "role"], }, object: result[0] });
});


module.exports = { createStoresType, createStores, getStoresByUserId, getStoresByStoreId };