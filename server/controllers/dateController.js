module.exports = {
  addDateIdea: async (req, res) => {
    const { comp } = req.params;
    const db = req.app.get("db");
    const { date } = req.body;
    const foundUser = await db.get_user(comp);
    const foundMatch = await db.get_matches(
      req.session.user.id,
      foundUser[0].id
    );

    const { companion_id } = foundMatch[0];

    const dateIdea = await req.app
      .get("db")
      .add_date_idea([companion_id, date]);
    return res.status(200).send(dateIdea);
  },

  getDateIdeas: async (req, res) => {
    const { comp } = req.params;
    const db = req.app.get("db");
    const returned = await db.get_user(comp);
    const foundMatch = await db.get_matches(
      req.session.user.id,
      returned[0].id
    );
    console.log(`dateCont foundMatch: ${foundMatch[0].companion_id}`);
    const { companion_id } = foundMatch[0];

    const dateIdeas = await req.app.get("db").get_date_ideas(companion_id);
    return res.status(200).send(dateIdeas);
  },

  editDateIdea: async (req, res) => {
    const db = req.app.get("db");
    const { editText, date_id } = req.body;
    await db.edit_date_idea(editText, date_id);
    return res.sendStatus(200);
  },
};
