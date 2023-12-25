const user = require("express").Router();

user.get("/", (req, res, next) => {
    res.send({msg: "User here"})
});

module.exports = user;