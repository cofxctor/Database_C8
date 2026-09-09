const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

const compass_string = "mongodb://localhost:27017/second_db";
const atlas_string =
  "mongodb+srv://samarasuzi3_db_user:Thenew47@cluster0.iaalney.mongodb.net/first_db?appName=Cluster0";

mongoose
  .connect(compass_string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) =>
    console.error("An error occured during MongoDB connection: ", err),
  );

const app = express();

const PORT = 2026;
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
