const routes = require("express").Router();
const user = require("./user.route");

routes.get("/", (req, res) => {
    res.send({ msg: 'Welcome to library again' })
});

routes.use("/user", user)

module.exports = routes;