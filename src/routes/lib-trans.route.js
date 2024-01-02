import { Router } from "express";
import { addTransaction, getAllTransaction, transactionBasedOnUser, updateTransaction, updateTransactionByUserBookIds, getTransactionByUserBookIds } from "../controllers/lib-trans.controller.js";
import { addTransValidation, updateTransValidation } from "../validators/lib-trans.validator.js";
import { authAdminRole, authRole } from "../middlewares/auth.middleware.js";

const libTransRoute = Router();

libTransRoute.get("/", authAdminRole, getAllTransaction);
libTransRoute.post("/add", authAdminRole, addTransaction);
libTransRoute.put("/update/:transactionId", authAdminRole, updateTransValidation, updateTransaction);
libTransRoute.put("/update-trans", authAdminRole, updateTransactionByUserBookIds);
libTransRoute.get("/get-update-trans", authAdminRole, getTransactionByUserBookIds);
libTransRoute.get("/user/:userId", authRole, transactionBasedOnUser);


export default libTransRoute;