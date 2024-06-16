const exp = require("express");
const userApp = exp.Router();
const { createUserOrAuthor, userorAuthorLogin } = require("./util");

userApp.post("/register", createUserOrAuthor);

userApp.post("/login", userorAuthorLogin);


module.exports = userApp;