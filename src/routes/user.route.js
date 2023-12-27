import { Router } from "express";
import { insertUser, getUserById, getAllUser, updateUserDetail, userSignIn } from "../controllers/user.controller.js";
import { userSignInValidation, userSignUpValidation, userUpdateValidation } from "../validators/user.validator.js";

const userRoute = Router();

userRoute.post("/user", userSignUpValidation, insertUser)
userRoute.get("/", getAllUser)
userRoute.post("/sign-in", userSignInValidation, userSignIn)
userRoute.put("/user/:userId", userUpdateValidation, updateUserDetail)
userRoute.get("/user/:userId", getUserById)

export default userRoute;