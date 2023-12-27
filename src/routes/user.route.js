import { Router } from "express";
import { insertUser, getUserById, getAllUser, updateUserDetail, userSignIn } from "../controllers/user.controller.js";
import { userSignInValidation, userSignUpValidation, userUpdateValidation } from "../validators/user.validator.js";
import { authAdminRole, authRole } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.post("/user", userSignUpValidation, insertUser)
userRoute.get("/", authAdminRole, getAllUser)
userRoute.post("/sign-in", userSignInValidation, userSignIn)
userRoute.put("/user/:userId", authRole, userUpdateValidation, updateUserDetail)
userRoute.get("/user/:userId", authRole, getUserById)

export default userRoute;