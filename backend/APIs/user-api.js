const exp = require("express");
const userApp = exp.Router();
const { createUserOrAuthor, userorAuthorLogin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

userApp.post("/register", expressAsyncHandler (createUserOrAuthor));

userApp.post("/login", expressAsyncHandler (userorAuthorLogin));


module.exports = userApp;