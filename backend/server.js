const exp = require('express')
const app = exp()
require('dotenv').config()

// Body Parser
app.use(exp.json())

const mongoClient = require('mongodb').MongoClient

// connect to mongodb server
const URL = process.env.DB_URL;
mongoClient.connect(URL)
    .then(client => {
        const blogdbObj = client.db('blogappdb')
        // create collection objects
        const usersCollection = blogdbObj.collection('users')
        const authorsCollection = blogdbObj.collection('authors')
        const articlesCollection = blogdbObj.collection('articles')

        // share them to the apis
        app.set("usersCollection", usersCollection);
        app.set("authorsCollection", authorsCollection);
        app.set("articlesCollection", articlesCollection);
        console.log("Database Connected...")
    })
    .catch(err => {
        console.log("Error in DB Connection :")
        console.log(err)
    })

// import all the apis
const userApp = require ("./APIs/user-api")
const authorApp = require("./APIs/author-api");
const adminApp = require("./APIs/admin-api");

app.use("/user-api", userApp)
app.use("/author-api", authorApp)
app.use("/admin-api", adminApp)

app.use((err, req, res, next) => {
    res.send({message: err.message})
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`http server on port ${port}`);
})