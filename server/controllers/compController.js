module.exports = {
  getCompanions: async (req, res) => {
    const { id } = req.session.user;
    const comp = await req.app.get("db").get_companions([id]);
    const mappedComp = comp.map((connection) => {
      if (connection.sender_id === id) {
        return connection.receiver_id;
      } else {
        return connection.sender_id;
      }
    });
    // console.log(mappedComp);
    const compList = await req.app
      .get("db")
      .datez_users.find({ id: mappedComp }, { fields: ["id", "username"] });
    return res.send(compList);
  },

  addCompanion: async (req, res) => {
    const { newComp } = req.params;
    const db = req.app.get("db");
    const foundUser = await db.get_user(newComp);

    if (!foundUser[0]) {
      return res.status(400).send("Companion not found Please try again");
    }

    const foundMatches = await db.get_matches(
      req.session.user.id,
      foundUser[0].id
    );

    if (foundMatches[0]) {
      return res.status(406).send("This person is already your companion");
    }

    await db.add_companion(foundUser[0].id, req.session.user.id);

    res.sendStatus(200);
  },

  deleteCompanion: async (req, res) => {
    const { comp } = req.params;
    const db = req.app.get("db");
    const foundUser = await db.get_user(comp);

    // console.log(req.session.user);
    if (!req.session.user) {
      return res.status(400).send("Please Log in");
    }

    const foundMatch = await db.get_matches(
      req.session.user.id,
      foundUser[0].id
    );

    if (!foundMatch[0]) {
      return res.status(400).send("Companion not found");
    }

    const { companion_id } = foundMatch[0];
    await db.delete_companion(companion_id);
    return res.status(200).send("Companion deleted");
  },
};
