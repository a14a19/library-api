import { check, validationResult, query } from 'express-validator';

export const bookAddValidation = async (req, res, next) => {

    await check('name', 'Name is required').exists().trim().run(req);
    await check('name', 'Name should be a string').isString().run(req);
    await check('name', 'Name length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);

    await check('author', 'Author is required').exists().trim().run(req);
    await check('author', 'Author should be a string').isString().run(req);
    await check('author', 'Author length should be at least 2 characters.').isLength({ min: 2, max: 255 }).run(req);

    await check('status', 'Status is required').exists().trim().run(req);
    await check('status', 'Status should be a string').isString().run(req);
    await check('status', 'Status is invalid, choose from - "available", "borrowed"').isIn(["available", "borrowed"]).run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}

export const bookUpdateValidation = async (req, res, next) => {

    await check('name', 'Name is required').optional().trim().run(req);
    await check('name', 'Name should be a string').optional().isString().run(req);
    await check('name', 'Name length should be at least 2 characters.').optional().isLength({ min: 2, max: 255 }).run(req);

    await check('author', 'Author is required').optional().trim().run(req);
    await check('author', 'Author should be a string').optional().isString().run(req);
    await check('author', 'Author length should be at least 2 characters.').optional().isLength({ min: 2, max: 255 }).run(req);

    await check('status', 'Status is required').optional().trim().run(req);
    await check('status', 'Status should be a string').optional().isString().run(req);
    await check('status', 'Status is invalid, choose from - "available", "borrowed"').optional().isIn(["available", "borrowed"]).run(req);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() })
    } else {
        next();
    }
}