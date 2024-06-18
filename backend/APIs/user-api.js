const exp = require("express");
const userApp = exp.Router();
const { createUserOrAuthor, userorAuthorLogin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

let articlesCollection;
let usersCollection;
userApp.use((req, res, next) => {
    usersCollection = req.app.get("usersCollection")
    articlesCollection = req.app.get("articlesCollection");
    next();
})

userApp.post("/register", expressAsyncHandler (createUserOrAuthor));

userApp.post("/login", expressAsyncHandler (userorAuthorLogin));

userApp.get("/articles", expressAsyncHandler(async (req, res) => {
    const articlesList = await articlesCollection.find({status: true}).toArray()

    res.send({ message: "Articles List", payload:  articlesList  });
}))

// write comments
userApp.post("/comment/:articleId", expressAsyncHandler(async (req, res) => {
    // get article id from url
    const articleIdFromUrl = req.params.articleId;
    // get commentobj from req
    const userComment = req.body;
    // get article document
    // add the comment in the array
    // update the document
    // all can be done in single step using $addToSet operator in mongo
    await articlesCollection.updateOne({ article: articleIdFromUrl }, { $addToSet: { comments: userComment } })
    res.send({message: "comment added!"})
}))

module.exports = userApp;