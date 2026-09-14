const express = require("express");

const { getAllProducts, uploadProduct } = require('../controller/productController.js');

const upload = require('../config/multer.js');

const router = express.Router();

router.post("/upload-product/:userId", upload.single("image"), uploadProduct);
router.get("/get-all", getAllProducts);

module.exports = router;