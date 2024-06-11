
const bcryptjs = require('bcryptjs')

// request handler for user/author registration
const createUserOrAuthor = async (req, res) => {
  const usersCollectionObj = req.app.get("usersCollection");
  const authorsCollectionObj = req.app.get("authorsCollection");

  const user = req.body;

  if (user.usertype == "user") {
    let dbuser = await usersCollectionObj.findOne({ username: user.username });

    if (dbuser != null) {
      res.send({ message: "User Already Exists" });
    }
  }
  else if (user.usertype == "author") {
    let dbuser = await authorsCollectionObj.findOne({
      username: user.username,
    });

    if (dbuser != null) {
      res.send({ message: "Author Already Exists" });
    }
  }

  // hash the pwd
  const hashedPassword = await bcryptjs.hash(user.password, 7);
  // replace pwd with hashed pwd
  user.password = hashedPassword;
  // save in collection
  if ((user.usertype = "user")) {
    await usersCollectionObj.insertOne(user);
    res.send({ message: "User Created" });
  }
  if ((user.usertype = "user")) {
    await authorsCollectionObj.insertOne(user);
    res.send({ message: "Author Created" });
  }
  // send res
}

const userorAuthorLogin = async (req, res) => {

}

module.exports = createUserOrAuthor