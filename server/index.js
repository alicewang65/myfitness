require('./db.js');
const express = require("express");
const cors = require("cors");
const path = require("path");
var authRouter = require("./auth.js");
const passport = require('passport');
const session = require("express-session");

const app = express();

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// required for passport
require("./passport.js")(passport);

app.use(session({ secret: "secrettt", saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

require("./auth.js")(app, passport);

app.listen(3000);