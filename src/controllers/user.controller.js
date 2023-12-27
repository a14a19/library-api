import mongoose from "mongoose";
import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const insertUser = async (req, res, next) => {
    try {
        const newUser = new Users(req.body)
        // ! hashing the password
        newUser.password = newUser.generateHash(req.body.password);

        const userSave = await newUser.save();

        return res.status(200).send({ data: userSave, error: undefined, message: "User saved successfully", status: true })
    } catch (e) {
        // console.log("insert user: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const updateUserDetail = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.userId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        await Users.findByIdAndUpdate(req.params.userId, req.body)
        const updatedUser = await Users.findById(req.params.userId)
        return res.status(200).send({ data: updatedUser, error: undefined, message: "User updated successfully", status: true })
    } catch (e) {
        // console.log("update user error: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.userId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        const userById = await Users.findById(req.params.userId)
        return res.status(200).send({ data: userById, error: undefined, message: "User information by id", status: true })
    } catch (e) {
        // console.log("User by Id: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const allUser = await Users.find({})
        return res.status(200).send({ data: allUser, error: undefined, message: "all user information", status: true })
    } catch (e) {
        // console.log("all user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const userSignIn = async (req, res, next) => {
    try {
        const checkUserDetail = await Users.find({ email: req.body.email })
        const pwdCheck = new Users(req.body);
        // pwdCheck.validatePassword(req.body.password)
        if (pwdCheck.validatePassword(req.body.password, checkUserDetail[0].password)) {
            const claims = {
                name: checkUserDetail[0].name,
                userName: checkUserDetail[0].userName,
                email: checkUserDetail[0].email,
                role: checkUserDetail[0].role,
            }
            const token = jwt.sign(claims, process.env.JWT_TOKEN_KEY, {
                algorithm: 'HS256',
                expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
            });

            checkUserDetail[0].token = token;
            return res.status(200).send({ data: checkUserDetail, token: checkUserDetail[0].token, error: undefined, message: "User sign-in successful", status: pwdCheck.validatePassword(req.body.password, checkUserDetail[0].password) })
        } else {
            return res.status(400).send({ data: undefined, error: "Password didn't matched", message: "Password didn't matched", status: false })
        }
    } catch (e) {
        // console.log("sign in user: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}
