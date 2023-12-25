require("dotenv").config();

// ! db
require("./db/db");

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParse = require("cookie-parser");

const routes = require("./routes");

// ! app utilities
app.use(cors());
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! routing
app.use("/api/v1", routes);

// ! server listening
app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server running at -> http://${process.env.HOSTNAME}:${process.env.PORT}/api/v1`)
});