import mongoose from "mongoose";
import LibTrans from "../models/lib-trans.model.js";
import Books from "../models/book.model.js";

const ObjectId = mongoose.Types.ObjectId;

export const getAllTransaction = async (req, res, next) => {
    try {
        const allTrans = await LibTrans.find({});
        return res.status(200).send({ data: allTrans, error: undefined, message: "All library transactions", status: true })
    } catch (e) {
        console.log("get all transaction: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const transactionBasedOnUser = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.userId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        const allTransBasedOnUser = await LibTrans.find({ userId: req.params.userId }).populate({ path: 'bookId' });
        return res.status(200).send({ data: allTransBasedOnUser, error: undefined, message: "All library transactions of a User", status: true })
    } catch (e) {
        console.log("get all transaction: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const addTransaction = async (req, res, next) => {
    try {
        console.log("add trans: ", req.body)
        if (req.body.userId === req.body.bookId) {
            return res.status(400).send({ data: undefined, error: "Please enter correct mongodb Ids", message: "Please enter correct mongodb Ids", status: false })
        }
        // ! check for same entry, but commented the code as it felt irrelevant
        // const entryAlreadyExist = await LibTrans.find({ userId: req.body.userId, bookId: req.body.bookId })
        // if (entryAlreadyExist.length > 0) {
        //     return res.status(400).send({ data: entryAlreadyExist, error: "Entry for similar record exists", message: "Entry for similar record exists", status: false })
        // }

        if (req.body.transactionType == "borrow") {
            // ! book status is borrowed
            await Books.findByIdAndUpdate(req.body.bookId, { status: "borrowed" })
        }

        const addTrans = new LibTrans(req.body)
        addTrans.save()
        return res.status(200).send({ data: addTrans, error: undefined, message: "Library transaction added", status: true })
    } catch (e) {
        console.log("get all transaction: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const updateTransaction = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.transactionId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        await LibTrans.findByIdAndUpdate(req.params.transactionId, req.body)
        const updateTransaction = await LibTrans.findById(req.params.transactionId)
        return res.status(200).send({ data: updateTransaction, error: undefined, message: "updated library transactions", status: true })
    } catch (e) {
        console.log("get all transaction: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const updateTransactionByUserBookIds = async (req, res, next) => {
    try {
        const isMongooseUserId = mongoose.Types.ObjectId.isValid(req.query.userId.toString())
        const isMongooseBookId = mongoose.Types.ObjectId.isValid(req.query.bookId.toString())
        if (!isMongooseUserId && !isMongooseBookId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }

        if (req.body.transactionType == "return") {
            // ! book status available
            await Books.findByIdAndUpdate(req.query.bookId, { status: "available" })
        }
        const user_ID = new ObjectId(req.query.userId)
        const book_ID = new ObjectId(req.query.bookId)
        console.log(user_ID, book_ID);
        await LibTrans.findOneAndUpdate({ userId: req.query.userId, bookId: req.query.bookId }, req.body)
        const updateTransaction = await LibTrans.find({ userId: req.query.userId, bookId: req.query.bookId })
        return res.status(200).send({ data: updateTransaction, error: undefined, message: "updated library transactions", status: true })
    } catch (e) {
        console.log("updateTransactionByUserBookIds: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}

export const getTransactionByUserBookIds = async (req, res, next) => {
    try {
        const isMongooseUserId = mongoose.Types.ObjectId.isValid(req.query.userId.toString())
        const isMongooseBookId = mongoose.Types.ObjectId.isValid(req.query.bookId.toString())
        if (!isMongooseUserId && !isMongooseBookId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }

        const updateTransaction = await LibTrans.find({ userId: req.query.userId, bookId: req.query.bookId })
        return res.status(200).send({ data: updateTransaction, error: undefined, message: "updated library transactions", status: true })
    } catch (e) {
        console.log("get all transaction: ", e)
        return res.status(500).send({ error: e, data: undefined, message: "Internal server error", status: false })
    }
}