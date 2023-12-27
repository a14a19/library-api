import { Router } from "express";
import { addTransaction, getAllTransaction, transactionBasedOnUser, updateTransaction } from "../controllers/lib-trans.controller.js";
import { addTransValidation, updateTransValidation } from "../validators/lib-trans.validator.js";
import { authAdminRole } from "../middlewares/auth.middleware.js";

const libTransRoute = Router();

libTransRoute.get("/", authAdminRole, getAllTransaction);
libTransRoute.post("/add", authAdminRole, addTransValidation, addTransaction);
libTransRoute.put("/update/:transactionId", authAdminRole, updateTransValidation, updateTransaction);
libTransRoute.get("/user/:userId", authAdminRole, transactionBasedOnUser);


export default libTransRoute;