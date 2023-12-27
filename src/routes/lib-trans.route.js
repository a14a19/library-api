import { Router } from "express";
import { addTransaction, getAllTransaction, transactionBasedOnUser, updateTransaction } from "../controllers/lib-trans.controller.js";
import { addTransValidation, updateTransValidation } from "../validators/lib-trans.validator.js";

const libTransRoute = Router();

libTransRoute.get("/", getAllTransaction);
libTransRoute.post("/add", addTransValidation, addTransaction);
libTransRoute.put("/update/:transactionId", updateTransValidation, updateTransaction);
libTransRoute.get("/user/:userId", transactionBasedOnUser);


export default libTransRoute;