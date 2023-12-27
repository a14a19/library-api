import { config } from "dotenv";
config();

import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import morgan from "morgan";

// ! db
import { connectToDatabase } from "./db/db.js";


// ! app utilities
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")) // ? remove in production mode

// ! routing
app.use("/api/v1", routes);

// ! server listening
connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server running at -> http://${process.env.HOSTNAME}:${process.env.PORT}/api/v1`);
        });
    })
    .catch((err) => {
        console.warn("error => ", err)
    })