const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Entry = mongoose.model("Entry");
const Log = mongoose.model("Log")
;

router.post("/create", (req, res) => {
    // form requires fields to be filled before submitting
    // so can guarantee fields exist

    new Entry({
        title: req.body.title,
        date: req.body.date,
        description: req.body.entry
    }).save((err, entry) => {
        Log.findById("624afb8d26b208516823260a", (err, log) => {
            log.items.push(entry);
            log.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({"status": "Successfully added entry"});
                }
            });
        });
    });
});

router.get("/entries", (req, res) => {
    Log.findById("624afb8d26b208516823260a", (err, log) => {
        if (err) {
            console.log(err);
        } else {
            res.json({"entries": log.items});
        }
    })


})



module.exports = router;