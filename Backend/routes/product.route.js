const express = require('express');
const productController = require('../controllers/product.controller');


const router = express.Router();
//Posts Route
router.route('/').get(productController.getProducts)
                 .post(productController.createProduct )
router.route('/search/:search').get(productController.Search)
router.route('/:id').delete(productController.DeleteProduct)
                    .patch(productController.updateProduct)
                    .get(productController.getProduct)

                             
module.exports = router; 



