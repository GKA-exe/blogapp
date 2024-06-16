const exp = require("express");
const authorApp = exp.Router();
const { createUserOrAuthor, userorAuthorLogin } = require("./util");

authorApp.post("/register", createUserOrAuthor);

authorApp.post("/login", userorAuthorLogin);

// to save new article
authorApp.post('/new-article', )

module.exports = authorApp;
