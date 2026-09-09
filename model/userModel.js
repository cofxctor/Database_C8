const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    products : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products'}],
});

const userModel = mongoose.model("User", userSchema);
// userSchema is the individual document structure or object and 
// "User"  is the collection name where the userSchema document will be stored. 
// A collection is simply  a collection documents stored in a Non-relational datatbase

module.exports = userModel;