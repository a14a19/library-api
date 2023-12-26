import { Router } from "express";
import { insertUser } from "../controllers/user.controller.js";
import { userValidation } from "../validators/user.validator.js";

const user = Router();

user.get("/", (req, res, next) => {
    res.send({ msg: "User here" })
});

user.post("/", userValidation, insertUser)

export default user;