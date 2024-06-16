
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

// request handler for user/author registration
const createUserOrAuthor = async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollectionObj = req.app.get("authorsCollection");

  const user = req.body;
  if (user.usertype === "user") {
    let dbuser = await usersCollectionObj.findOne({ username: user.username });

    if (dbuser !== null) {
      return res.send({ message: "User Already Exists" });
    }
  }
  if (user.usertype === "author") {
    let AuthorUser = await authorsCollectionObj.findOne({
      username: user.username,
    });

    if (AuthorUser !== null) {
      return res.send({ message: "Author Already Exists" });
    }
  }

  // hash the pwd
  const hashedPassword = await bcryptjs.hash(user.password, 7);
  // replace pwd with hashed pwd
  user.password = hashedPassword;
  // save in collection
  if (user.usertype === "user") {
    await usersCollectionObj.insertOne(user);
    return res.send({ message: "User Created" });
  }
  if (user.usertype === "author") {
    await authorsCollectionObj.insertOne(user);
    return res.send({ message: "Author Created" });
  }
  // send res
};

const userorAuthorLogin = async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollectionObj = req.app.get("authorsCollection");

  const userCred = req.body;
  // verify the usename of the user
  if (userCred.usertype === "user") {
    let dbuser = await usersCollectionObj.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Username Invalid" });
    } else {
      let status = bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign({ username: dbuser.username }, "abcdef", {
          expiresIn: 50,
        });
        delete dbuser.password;
        res.send({
          message: "Login Success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }

  // verify the usename of the author
  if (userCred.usertype === "author") {
    let dbuser = await authorsCollectionObj.findOne({
      username: userCred.username,
    });
    if (dbuser === null) {
      return res.send({ message: "Username Invalid" });
    } else {
      let status = bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        return res.send({ message: "Invalid Password" });
      } else {
        const signedToken = jwt.sign({ username: dbuser.username }, "abcdef", {
          expiresIn: 50,
        });
        delete dbuser.password;
        res.send({
          message: "Login Success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  }

  // user and author are valid:
};

module.exports = { createUserOrAuthor, userorAuthorLogin };