import { Router } from "express";
const routes = Router();

import userRoute from "./user.route.js";
import bookRoute from "./book.route.js";
import libTransRoute from "./lib-trans.route.js";


routes.get("/", (req, res) => {
    res.send({ msg: 'Welcome to library again' })
});

routes.use("/users", userRoute)
routes.use("/books", bookRoute)
routes.use("/lib-trans", libTransRoute)

export default routes;