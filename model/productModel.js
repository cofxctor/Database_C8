const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    stock: {type: Boolean, default: true},
    image: {type: String, required: true}
}, { timestamps: true });

const productModel = mongoose.model("Products", productsSchema);

module.exports = productModel;