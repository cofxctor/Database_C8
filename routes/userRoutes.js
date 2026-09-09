 const express = require("express");

 const userRoute = express.Router();

 const { getAllUsers, createUser, deleteUser, getSingleUser, updateUser, updateEntry, getUserProducts } = require("../controller/userController.js");

 
userRoute.get("/all-users", getAllUsers);
userRoute.post("/new-user", createUser);
userRoute.get("/get-one-user/:id", getSingleUser);
userRoute.delete("/delete-user/:userId", deleteUser);
userRoute.patch("/update-user/:id", updateUser);
userRoute.patch("/user-update/:userId", updateEntry);
userRoute.get("/user-products/:id", getUserProducts);

module.exports = userRoute;

