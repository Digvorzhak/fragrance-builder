const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");

connectDb();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/fragrances", require("./routes/fragranceRoutes"));

app.use(errorHandler);

module.exports = app;
