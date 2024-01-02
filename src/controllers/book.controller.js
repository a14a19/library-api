import mongoose from "mongoose";
import Books from "../models/book.model.js";

export const getAllBooks = async (req, res, next) => {
    try {
        const getBooks = await Books.find({})
        return res.status(200).send({ data: getBooks, error: undefined, message: "All books", status: true })
    } catch (e) {
        // console.log("get all books: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const insertBook = async (req, res, next) => {
    try {
        const bookExist = await Books.find({ name: req.body.name, author: req.body.author })
        if (bookExist.length > 0) {
            return res.status(300).send({ data: bookExist, error: undefined, message: "Book already exists", status: false })
        }
        const addBook = new Books(req.body)
        addBook.save()
        return res.status(200).send({ data: addBook, error: undefined, message: "Book added successfully", status: true })
    } catch (e) {
        // console.log("insert books: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const bulkInsertBook = async (req, res, next) => {
    try {
        // ! have to work on it
        return res.status(200).send({ data: req.body, error: undefined, message: "All books", status: true })
    } catch (e) {
        // console.log("insert books: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.bookId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        await Books.findByIdAndUpdate(req.params.bookId, req.body)
        const updateBook = await Books.findById(req.params.bookId)
        return res.status(200).send({ data: updateBook, error: undefined, message: "Book updated", status: true })
    } catch (e) {
        // console.log("update book: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.bookId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        const bookToDelete = await Books.deleteOne({ _id: req.params.bookId })
        return res.status(200).send({ data: bookToDelete, error: undefined, message: "Book deleted", status: true })
    } catch (e) {
        // console.log("update book: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}

export const getBookById = async (req, res, next) => {
    try {
        const isMongooseId = mongoose.Types.ObjectId.isValid(req.params.bookId.toString())
        if (!isMongooseId) {
            return res.status(400).send({ data: undefined, error: "Please enter valid Id", message: "Please enter valid Id", status: false })
        }
        const bookById = await Books.findById(req.params.bookId)
        return res.status(200).send({ data: bookById, error: undefined, message: "User information by id", status: true })
    } catch (e) {
        // console.log("User by Id: ", e)
        return res.status(500).send({ data: undefined, error: e, message: "Internal server error", status: false })
    }
}