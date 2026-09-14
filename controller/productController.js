const productModel = require("../model/productModel.js");
const userModel = require("../model/userModel.js");
const cloudinary = require("../config/cloudinary.js");

const uploadProduct = async (req, res) => {
    const userId = req.params.userId;
    const { name, price, description, category, stock, image } = req.body;
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: `User with, ${userId} not found.`
            });
        };

        if (!req.file) {
            console.log(`User with ID, ${userId} attempted to create a product without uploading an image...`);
            return res.status(400).json({
                message: 'No image uploaded. Please upload an image...'
            });
        };

        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;

        const product = await productModel.create({
            name, price, description, category, stock, image: imageUrl
        });

        await user.products.push(product._id);
        await user.save();

        console.log(`A new product was just created in the database.\nProduct \nName: ${product.name}\nPhoto: ${product.image}`);
        res.status(201).json({
            message: "New product uploaded successfully.", product
        });
    
    } catch (error) {
        console.log("Internal server error during product upload from user with ID: " + userId);
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const getAll = await productModel.find()
        res.status(200).json({
            message: "All products fetched successfully from the database.",
            data: getAll
        });
        console.log('A request to fetch all products from the database was successfully executed on the server.');
    } catch (error) {
        console.log('Internal server error during products fetch..');
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { uploadProduct, getAllProducts };