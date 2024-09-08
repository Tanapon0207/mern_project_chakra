const express = require('express');
const { getProducts, createProducts, updateProducts, deleteProducts} = require('../controllers/product.controller');
const router = express.Router();

// get_all_product
router.get('/',getProducts);

// create_product
router.post('/', createProducts);

// update_product
router.put('/:id',updateProducts );

// delete_product
router.delete('/:id',deleteProducts);


module.exports = router;
