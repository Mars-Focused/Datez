require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const authCtrl = require("./controllers/authController");
const compCtrl = require("./controllers/compController");
const dateCtrl = require("./controllers/dateController");
const auth = require("./middleware/authMiddleware");

const PORT = 4000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("Database connected! Nya~");
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.get("/api/datez_ideas", auth.usersOnly);

app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);

app.post("/api/add_companion/:newComp", compCtrl.addCompanion);
app.get("/api/companions", compCtrl.getCompanions);
app.delete("/api/delete_companion/:comp", compCtrl.deleteCompanion);

//COMP WILL ALWAYS EQUAL THE !!!NAME!!! OF THE USER SELECTED
// all of the getDateIdea AddDateIdea etc... THEY are our handler functions.
// app.post("/api/", dateCtrl.addDateIdea);
app.get("/api/date_ideas/:comp", dateCtrl.getDateIdeas);
app.post("/api/add_date/:comp", dateCtrl.addDateIdea);
app.put("/api/edit_date/", dateCtrl.editDateIdea);

app.use(express.static(`${__dirname}/../build`));

app.get("*", (res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => console.log(`Port ${PORT} Ready Master! `));
