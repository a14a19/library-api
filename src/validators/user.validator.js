import { check, validationResult, query } from 'express-validator';
import User from '../models/user.model.js';

export const userValidation = async (req, res, next) => {

    await check('name', 'Name is required').exists().trim().run(req);
    await check('name', 'Name should be a string').isString().run(req);
    await check('name', 'Name length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);

    await check('userName', 'User name is required').exists().trim().run(req);
    await check('userName', 'User name should be a alphanumeric').isAlphanumeric().run(req);
    await check('userName', 'User name length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);

    await check('email', 'Email is required').exists().trim().run(req);
    await check('email', 'Email should be a string').isString().run(req);
    await check('email', 'Please enter the correct format for email.').isEmail().run(req);
    await check('email', 'Email is already registered').custom(value => {
        return User.findOne({ where: { email: value } })
            .then(() => {
                return Promise.reject('Email already registered')
            })
    })

    await check('number', 'Number is required').exists().trim().run(req);
    await check('number', 'Please enter only numbers').isNumeric().run(req);
    await check('number', 'Please enter only 10 digit numbers').isLength(10).run(req);

    await check('password', 'Password is required').exists().trim().run(req);
    await check('password', 'Password should be strong').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).run(req);
    await check('password', 'Password should be strong').isString().run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}