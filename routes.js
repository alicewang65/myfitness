const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Entry = mongoose.model("Entry");
const Log = mongoose.model("Log");

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
                const newestFirst = log.items.reverse();
                res.json({"entries": newestFirst});
            }
        });
    }
});

router.get("/entry", (req, res) => {
    console.log("/entry");

    if (!Object.hasOwnProperty.call(req, "user")) {
        res.json({"error": "User hasn't logged in."});
    } else {
        // id of user's log
        const id = req.user.log;
        const entryID = req.query.id;
        
        Log.findById(id, (err, log) => {
            console.log(log);
            if (err) {
                res.json({"error": "Error finding log."});
            } else {
                const entry = (log.items).find((ele) => { return ele["_id"].toString() === entryID });
                // console.log(entry);
                res.json({"entry": entry});
            }
        });
    }
});

router.delete("/delete", (req, res) => {
    console.log("/delete");

    if (!Object.hasOwnProperty.call(req, "user")) {
        res.json({"error": "User hasn't logged in."});
    } else {
        const id = req.user.log;
        const entryID = req.query.id; 
        console.log(req.query);
        console.log(entryID);

        // Entry.find({_id: entryID}, (err, entry) => {
        //     console.log(entry);
        // });

        Log.findById(id, (err, log) => {
            console.log(log);
            if (err) {
                res.json({"error": "Error finding log."});
            } else {
                const entries = log.items;
                const deleteIndex = entries.findIndex((ele) => { return ele["_id"].toString() === entryID });

                entries.splice(deleteIndex, 1);

                // update user's log
                log.items = entries;
                log.save((err) => {
                    if (err) {
                        res.json({"error": "Error removing item from log."});
                    } else {
                        // delete entry from database as well
                        Entry.findOneAndDelete({_id: entryID}, (err, deletedEntry) => {
                            if (err) {
                                res.json({"error": "Error deleting entry from database."});
                            } else {
                                console.log(deletedEntry);
                                res.json({"status": "Successfully removed item from log."});
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post("/update", async (req, res) => {
    console.log("/update");

    if (!Object.hasOwnProperty.call(req, "user")) {
        res.json({"error": "User hasn't logged in."});
    } else {
        const id = req.user.log;
        const entryID = req.body.id;

        const update = {
            title: req.body.title,
            date: req.body.date,
            description: req.body.entry
        }

        Entry.findOneAndUpdate({_id: entryID}, update, {new : true}, (err, updatedEntry) => {
            if (err) {
                res.json({"error": "Error finding and updating entry."});
            } else {
                Log.findById(id, (err, log) => {
                    if (err) {
                        res.json({"error": "Error finding log."});
                    } else {
                        const entries = log.items;
                        console.log(entries);
        
                        const updateIndex = entries.findIndex((ele) => { return ele["_id"].toString() === entryID });
                        if (updateIndex === -1) {
                            res.json({"error": "Error: Entry doesn't exist in log."});
                        } else {
                            entries.splice(updateIndex, 1, updatedEntry);
                            log.save((err) => {
                                if (err) {
                                    res.json({"error": "Error saving updated entry in log."});
                                } else {
                                    res.json({"status": "Successfully updated entry."});
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});

module.exports = router;