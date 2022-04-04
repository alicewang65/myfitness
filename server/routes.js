const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Entry = mongoose.model("Entry");
const Log = mongoose.model("Log")
;

router.post("/create", (req, res) => {
    // form requires fields to be filled before submitting
    // so can guarantee fields exist

    if (!Object.hasOwnProperty.call(req, "user")) {
        // if user isn't logged in
        res.json({"error": "User hasn't logged in."});
    } else {
        new Entry({
            title: req.body.title,
            date: req.body.date,
            description: req.body.entry
        }).save((err, entry) => {
            if (err) {
                res.json({"error": "Error creating new entry."});
            } else {
                const id = req.user.log;

                Log.findById(id, (err, log) => {
                    log.items.push(entry);
                    log.save((err) => {
                        if (err) {
                            res.json({"error": "Error adding entry to log."});
                        } else {
                            res.json({"status": "Successfully added entry"});
                        }
                    });
                });
            }
        });
    }
});

router.get("/entries", (req, res) => {
    console.log("/entries");
    console.log(req.user);

    if (!Object.hasOwnProperty.call(req, "user")) {
        // if user isn't logged in
        res.json({"error": "User hasn't logged in."});
    } else {
        // id of user's log
        const id = req.user.log;

        Log.findById(id, (err, log) => {
            if (err) {
                res.json({"error": "Error finding log."});
            } else {
                res.json({"entries": log.items});
            }
        });
    }
});

module.exports = router;