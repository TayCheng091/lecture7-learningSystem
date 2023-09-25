const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => {
    console.log("Connect success");
  })
  .catch((e) => {
    console.log("Something wrong when connect to mongoDB , err = ", e);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
