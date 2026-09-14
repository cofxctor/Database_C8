require('dotenv').config();
// import 

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");



mongoose
  .connect(process.env.ATLAS_STRING)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) =>
    console.error("An error occured during MongoDB connection: ", err),
  );

const app = express();

const PORT = process.env.PORT;
let terminalMessage = `Server is now up and running on port ${PORT}`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello, there! The server is LIVE!`);
});

app.use("/users", routes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(terminalMessage);
});
