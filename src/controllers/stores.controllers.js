const asyncHandler = require("express-async-handler");
const { STATUS_CODE } = require("../utils/constants");
const { ERROR_MESSAGE } = require("../utils/errorMessage");
const { createStores, getStoresByStoreId, createStoresType, getStoresByUserId } = require("../model/stores.modal");

// Create new Stores Type
const createNewStoreType = asyncHandler(async (req, res,) => {
    const { name } = req.body || {};
    if (!name) {
        res.status(STATUS_CODE.VALIDATION_ERROR);
        throw new Error(ERROR_MESSAGE.mandatory_all_fields);
    }
    try {
        let result = await createStoresType({ ...req.body });
        res.send(result);
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR);
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error);
    }
});

// Create new Stores
const createNewStore = asyncHandler(async (req, res,) => {
    const { name, user_id } = req.body || {};
    if (!name, !user_id) {
        res.status(STATUS_CODE.VALIDATION_ERROR);
        throw new Error(ERROR_MESSAGE.mandatory_all_fields);
    }
    try {
        let result = await createStores({ ...req.body });
        res.send(result);
    } catch (err) {
        res.status(STATUS_CODE.SERVER_ERROR);
        throw new Error(err.message || ERROR_MESSAGE.data_creating_error);
    }
});

//get store by store id
const getStoreById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getStoresByStoreId({ id });
        return res.status(200).json({
            storeDetails: {
                ...result
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN);
        throw new Error(err.message || ERROR_MESSAGE.records_not_found);
    }
});

//get store by user id
const getStoreByUserId = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const result = await getStoresByUserId({ uid: id });
        return res.status(200).json({
            storeDetails: {
                ...result
            }
        });
    } catch (err) {
        res.status(STATUS_CODE.FORBIDDEN);
        throw new Error(err.message || ERROR_MESSAGE.records_not_found);
    }
});

module.exports = {
    createNewStoreType,
    createNewStore,
    getStoreById,
    getStoreByUserId
};