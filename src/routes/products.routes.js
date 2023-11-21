const express = require("express");
const { checkAuth, authUserAccess } = require("../middleware/checkAuth.middleware");
const productsControllers = require("../controllers/products.controllers");
const { USER_ROLE } = require("../utils/constants");
const router = express.Router();

router.post("/create-product", checkAuth, authUserAccess([USER_ROLE.OWNER, USER_ROLE.SUPER_ADMIN]), productsControllers.createNewProduct);
router.get("/getAllProducts/", checkAuth, authUserAccess([USER_ROLE.OWNER, USER_ROLE.SUPER_ADMIN]), productsControllers.getAllProducts);
router.get("/getProductById/:id", checkAuth, productsControllers.getProductById);

module.exports = router;
