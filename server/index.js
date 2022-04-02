require('./db.js');
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3000);