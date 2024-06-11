const exp = require("express");
const userApp = exp.Router();
const createUserOrAuthor = require("./util");

userApp.post("/register", createUserOrAuthor);

module.exports = userApp;