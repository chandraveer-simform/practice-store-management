const express = require('express');
const checkAuth = require('../middleware/checkAuth.middleware');
const brandControllers = require('../controllers/brands.controllers');
const router = express.Router();

router.post('/create-brand', checkAuth, brandControllers.createNewBrand);
router.get('/getAllBrands', checkAuth, brandControllers.getAllBrands);
router.get('/getBrandById/:id', checkAuth, brandControllers.getBrandById);

module.exports = router