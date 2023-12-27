import { Router } from "express";
import { deleteBook, getAllBooks, insertBook, updateBook } from "../controllers/book.controller.js";
import { bookAddValidation, bookUpdateValidation } from "../validators/book.validator.js";
import { authAdminRole, authRole } from "../middlewares/auth.middleware.js";

const bookRoute = Router();

bookRoute.get("/", authRole, getAllBooks);
bookRoute.post("/add", authAdminRole, bookAddValidation, insertBook);
bookRoute.put("/update/:bookId", authAdminRole, bookUpdateValidation, updateBook);
bookRoute.delete("/delete/:bookId", authAdminRole, deleteBook);



export default bookRoute;