const exp = require ("express");
const authorApp = exp.Router();
const { createUserOrAuthor, userorAuthorLogin } = require("./util");
const expressAsyncHandler = require("express-async-handler");

let authorsCollection;
let articlesCollection;
authorApp.use((req, res, next) => {
    authorsCollection = req.app.get('authorsCollection')
    articlesCollection = req.app.get("articlesCollection");
    next()
})

authorApp.post("/register", expressAsyncHandler(createUserOrAuthor));

authorApp.post("/login", expressAsyncHandler(userorAuthorLogin));

// to save new article
authorApp.post("/new-article", expressAsyncHandler(async (req, res) => {
    // get article from client
    const newArticle = req.body;
    // save new article to articles collection
    await articlesCollection.insertOne(newArticle)
    // send res
    res.send({message: "New Article added"})
}));

// read articles by author's username
authorApp.get("/articles/:username", expressAsyncHandler(async (req, res) => {
    const authorname = req.params.username
    // get articles of aurrent author
    const articlesList = await articlesCollection.find({ username: authorname, status: true }).toArray()
    //  send res
    res.send({message: "Articles", payload: articlesList})
}));

authorApp.put("/article", expressAsyncHandler(async (req, res) => {
    // get modified article:
    const modifiedArticle = req.body;
    await articlesCollection.updateOne({ articleid: modifiedArticle.articleid }, { $set: { ...modifiedArticle } })
    // send res
    res.send({message: "Article Modified"})
}))

// Delete Article (soft delete)
authorApp.put('/article/:articleId', expressAsyncHandler(async (req, res) => {
    let articleid = req.params.articleId;
    let modifiedArticle = req.body;
    
    await articlesCollection.updateOne(
      { articleid: articleid },
      { $set: { ...modifiedArticle } }
    );
    // send res
    res.send({ message: "Article Deleted" });
}))


module.exports = authorApp;
