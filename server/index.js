require('./db.js');
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require('passport');
const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true
}));

app.use(session({ secret: "secrettt", saveUninitialized: false, resave: false }));
app.use(cookieParser("secrettt"));

app.use(passport.initialize());
app.use(passport.session());
require("./passport_config.js")(passport);


require("./auth.js")(app, passport);

app.get("/", (req, res) => {
    // res.send("Hello World!");
});

app.get("/user", (req, res) => {
    console.log("user route");
    console.log(req.user);
    res.json({"message": "hello"});
});

const routes = require("./routes.js");
app.use("/", routes);

app.listen(3000);