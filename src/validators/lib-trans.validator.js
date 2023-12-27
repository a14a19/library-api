import { check, validationResult, query } from 'express-validator';
import mongoose from 'mongoose';

export const addTransValidation = async (req, res, next) => {

    await check('userId', 'UserID is required').exists().trim().run(req);
    await check('userId', 'UserID should be a string').isString().run(req);
    await check('userId', 'UserID should be a valid mongodb Id').custom(async (value) => {
        const checkUserId = mongoose.Types.ObjectId.isValid(value.toString())
        if (!checkUserId) {
            return Promise.reject('UserId should be valid mongodb Id')
        }
    }).run(req);

    await check('bookId', 'BookID is required').exists().trim().run(req);
    await check('bookId', 'BookID should be a string').isString().run(req);
    await check('bookId', 'BookID should be a valid mongodb Id').custom(async (value) => {
        const checkBookId = mongoose.Types.ObjectId.isValid(value.toString())
        if (!checkBookId) {
            return Promise.reject('BookId should be valid mongodb Id')
        }
    }).run(req);

    await check('dueDate', 'Due date is required').exists().trim().run(req);
    await check('dueDate', 'Due date should be a date').isDate().run(req);

    await check('transactionType', 'Transaction type is required').exists().trim().run(req);
    await check('transactionType', 'Transaction type should be a string').isString().run(req);
    await check('transactionType', 'Transaction type is invalid, choose from - "returned", "borrowed"').isIn(["borrowed", "returned"]).run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}


export const updateTransValidation = async (req, res, next) => {

    await check('userId', 'UserID is required').optional().trim().run(req);
    await check('userId', 'UserID should be a string').optional().isString().run(req);
    await check('userId', 'UserID should be a valid mongodb Id').optional().custom(async (value) => {
        const checkUserId = mongoose.Types.ObjectId.isValid(value.toString())
        if (!checkUserId) {
            return Promise.reject('UserId should be valid mongodb Id')
        }
    }).run(req);

    await check('bookId', 'BookID is required').optional().trim().run(req);
    await check('bookId', 'BookID should be a string').optional().isString().run(req);
    await check('bookId', 'BookID should be a valid mongodb Id').optional().custom(async (value) => {
        const checkBookId = mongoose.Types.ObjectId.isValid(value.toString())
        if (!checkBookId) {
            return Promise.reject('BookId should be valid mongodb Id')
        }
    }).run(req);

    await check('dueDate', 'Due date is required').optional().trim().run(req);
    await check('dueDate', 'Due date should be a date').optional().isDate().run(req);

    await check('transactionType', 'Transaction type is required').optional().trim().run(req);
    await check('transactionType', 'Transaction type should be a string').optional().isString().run(req);
    await check('transactionType', 'Transaction type is invalid, choose from - "returned", "borrowed"').optional().isIn(["borrowed", "returned"]).run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}