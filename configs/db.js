const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.dbConnectionUrl;

mongoose
  .connect(dbUrl)
  .then(() => console.log("Server Connected to DB"))
  .catch((err) => console.log(err));
