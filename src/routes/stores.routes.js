const express = require("express");
const { checkAuth, authUserAccess, } = require("../middleware/checkAuth.middleware");
const storesControllers = require("../controllers/stores.controllers");
const { USER_ROLE } = require("../utils/constants");
const router = express.Router();

// Stores Type
router.post("/create-type", checkAuth, authUserAccess([USER_ROLE.OWNER, USER_ROLE.SUPER_ADMIN]), storesControllers.createNewStoreType);

// Stores
router.post("/create-store", checkAuth, storesControllers.createNewStore);
router.get("/getStoreById/:id", checkAuth, storesControllers.getStoreById);
router.get("/getStoreByUserId/:id", checkAuth, storesControllers.getStoreByUserId);

module.exports = router;
