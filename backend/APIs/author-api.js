const exp = require("express");
const authorApp = exp.Router();
const createUserOrAuthor = require("./util");


authorApp.post("/register", createUserOrAuthor);


module.exports = authorApp;
