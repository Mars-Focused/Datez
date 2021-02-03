const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const result = await db.get_user([username]);
    const existingUser = result[0];
    if (existingUser) {
      return res.status(409).send("Username Taken");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const registeredUser = await db.register_user([username, hash]);
    const user = registeredUser[0];
    req.session.user = { username: user.username, id: user.id };
    return res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    //I removed brackets around the word username because I did not understand why they were there.
    const foundUser = await db.get_user(username);
    const user = foundUser[0];
    // console.log(`authController user:${user}`);
    if (!user) {
      return res
        .status(401)
        .send(
          "User not found. Please register as a new user before logging in."
        );
    }
    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password");
    }
    // Login user Successful creating req.session.user
    req.session.user = {
      id: user.id,
      username: user.username,
    };
    // console.log(req.session);
    return res.status(200).send(req.session.user); // <- sending req.session.user to the front end (Login.js line: 40)
  },

  logout: (req, res) => {
    req.session.destroy();
    // console.log("User Logged out!");
    return res.sendStatus(200);
  },
};
