import { Router } from "express";
const routes = Router();

import user from "./user.route.js";


routes.get("/", (req, res) => {
    res.send({ msg: 'Welcome to library again' })
});

routes.use("/user", user)

export default routes;