import { Router } from "express";
import { deleteBook, getAllBooks, insertBook, updateBook } from "../controllers/book.controller.js";
import { bookAddValidation, bookUpdateValidation } from "../validators/book.validator.js";

const bookRoute = Router();

bookRoute.get("/", getAllBooks);
bookRoute.post("/add", bookAddValidation, insertBook);
bookRoute.put("/update/:bookId", bookUpdateValidation, updateBook);
bookRoute.delete("/delete/:bookId", deleteBook);



export default bookRoute;