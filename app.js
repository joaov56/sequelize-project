const express = require("express");
const exphs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/db");

const app = express();

app.get("/", (req, res) => {
  res.send("index");
});

//Gig Routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/gigs", require("./routes/gigs"));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
