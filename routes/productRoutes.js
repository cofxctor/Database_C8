const express = require("express");

const { getAllProducts, uploadProduct } = require('../controller/productController.js');

const router = express.Router();

router.post("/upload-product/:userId", uploadProduct);
router.get("/get-all", getAllProducts);

module.exports = router;