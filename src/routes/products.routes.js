const express = require('express');
const checkAuth = require('../middleware/checkAuth.middleware');
const productsControllers = require('../controllers/products.controllers');
const router = express.Router();

router.post('/create-product', checkAuth, productsControllers.createNewProduct);
router.get('/getAllProducts', checkAuth, productsControllers.getAllProducts);
router.get('/getProductById/:id', checkAuth, productsControllers.getProductById);

module.exports = router