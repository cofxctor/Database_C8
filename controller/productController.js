const productModel = require("../model/productModel.js");
const userModel = require("../model/userModel.js");

const uploadProduct = async (req, res) => {
    const userId = req.params.userId;
    const { name, price, description, category, stock, image } = req.body;
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({
                message: `User with, ${userId} not found.`
            })
        };

        const product = await productModel.create({
            name, price, description, category, stock, image
        });

        await user.products.push(product._id);
        await user.save();

        console.log(`A new product was just created in the database.\nProduct: ${product.name}`);
        res.status(201).json({
            message: "New product uploaded successfully.", product
        });
    
    } catch (error) {
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