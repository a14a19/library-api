import { check, validationResult, query } from 'express-validator';
import Users from '../models/user.model.js';

export const userSignUpValidation = async (req, res, next) => {

    await check('name', 'Name is required').exists().trim().run(req);
    await check('name', 'Name should be a string').isString().run(req);
    await check('name', 'Name length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);

    await check('userName', 'User name is required').exists().trim().run(req);
    await check('userName', 'User name should be a alphanumeric').isAlphanumeric().run(req);
    await check('userName', 'User name length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);
    await check('userName', 'User name is already registered').custom(async (value) => {
        const findUserName = await Users.find({ userName: value })
        if (findUserName.length > 0) {
            return Promise.reject('User name already registered')
        }
    }).run(req);

    await check('email', 'Email is required').exists().trim().run(req);
    await check('email', 'Email should be a string').isString().run(req);
    await check('email', 'Please enter the correct format for email.').isEmail().run(req);
    await check('email', 'Email is already registered').custom(async (value) => {
        const findUserEmail = await Users.find({ email: value })
        if (findUserEmail.length > 0) {
            return Promise.reject('Email already registered')
        }
    }).run(req);

    await check('number', 'Number is required').exists().trim().run(req);
    await check('number', 'Please enter only numbers').isNumeric().run(req);
    await check('number', 'Please enter only 10 digit numbers').isLength(10).run(req);

    await check('password', 'Password is required').exists().trim().run(req);
    await check('password', 'Password should be strong').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).run(req);
    await check('password', 'Password should be strong').isString().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}


export const userSignInValidation = async (req, res, next) => {

    await check('email', 'Email is required').exists().trim().run(req);
    await check('email', 'Email should be a string').isString().run(req);
    await check('email', 'Please enter the correct format for email').isEmail().run(req);
    await check('email', 'Email is not registered, please sign up').custom(async (value) => {
        const findUserEmail = await Users.find({ email: value })
        if (findUserEmail.length === 0) {
            return Promise.reject('Email is not registered, please sign up')
        }
    }).run(req);

    await check('password', 'Password is required').exists().trim().run(req);
    await check('password', 'Password didn\'t match, please try again.').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).run(req);
    await check('password', 'Password should be string').isString().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    } else {
        next();
    }
}


export const userUpdateValidation = async (req, res, next) => {

    await check('name', 'Name is required').optional().trim().run(req);
    await check('name', 'Name should be a string').optional().isString().run(req);
    await check('name', 'Name length should be at least 2 characters.').optional().isLength({ min: 2, max: 255 }).run(req);
    await check('email', 'Email is already registered').optional().custom(async (value) => {
        const findUserEmail = await Users.find({ email: value })
        if (findUserEmail.length > 0) {
            return Promise.reject('Email already registered')
        }
    }).run(req);

    await check('userName', 'User name is required').optional().trim().run(req);
    await check('userName', 'User name should be a alphanumeric').optional().isAlphanumeric().run(req);
    await check('userName', 'User name length should be at least 2 characters.').optional().isLength({ min: 2, max: 255 }).run(req);
    await check('userName', 'User name is already registered').optional().custom(async (value) => {
        const findUserName = await Users.find({ userName: value })
        if (findUserName.length > 0) {
            return Promise.reject('User name already registered')
        }
    }).run(req);

    await check('email', 'Email is required').optional().trim().run(req);
    await check('email', 'Email should be a string').optional().isString().run(req);
    await check('email', 'Please enter the correct format for email.').optional().isEmail().run(req);
    await check('email', 'Email is already registered').optional().custom(async (value) => {
        const findUserEmail = await Users.find({ email: value })
        if (findUserEmail.length > 0) {
            return Promise.reject('Email already registered')
        }
    }).run(req);

    await check('number', 'Number is required').optional().trim().run(req);
    await check('number', 'Please enter only numbers').isNumeric().optional().run(req);
    await check('number', 'Please enter only 10 digit numbers').optional().isLength(10).run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}