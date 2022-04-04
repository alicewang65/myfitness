const mongoose = require("mongoose");
const User = mongoose.model("User");
const Log = mongoose.model("Log");
const argon2 = require("argon2");

module.exports = (app, passport) => {
    // app.get("/login", (req, res) => {
    //     console.log(req.user);
    // });

    app.post("/login", (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            console.log("passport authenticate");
            console.log(user);
            if (err) {
                res.json({"error": "Error authenticating."});
            } else if (user.length === 0) {
                res.json({"error": "No user with that username exists."});
            } else {
                req.login(user, (err) => {
                    if (err) {
                        res.json({"error": "Error logging in."});
                    } else {
                        console.log("authenticate method req user");
                        console.log(req.user);
                        
                        // res.setHeader("Access-Control-Allow-Credentials", "true");
                        res.json({"status": "Successfully logged in."});
                        // console.log(req.user);
                    }
                });
            }
        })(req, res, next);
    });
    
    app.post("/register", (req, res) => {
        // form requires fields to be filled before submitting
        // so can guarantee username and password exist
        User.find({ "username" : req.body.username }, async (err, user) => {
            if (err) {
                res.json({"error": "Error registering."});
            } else if (user.length !== 0) {
                res.json({"error": "Username already exists."});
            } else {
                const hashedPass = await argon2.hash(req.body.password);
                
                new Log({items: []}).save((err, log) => {
                    if (err) {
                        console.log(err);
                    } else {
                        new User({
                            username: req.body.username,
                            password: hashedPass,
                            log: log["_id"]
                        }).save((err, user) => {
                            if (err) {
                                res.json({"error": "Error saving user to database."});
                            } else {
                                res.json({"status": "Sucessfully registered user."});
                            }
                        });
                    }
                });
            }
        });
    });
    
    // app.post("/register", (req, res) => {
        
    //     console.log(req);
    //     console.log(req.body.username);
    //     console.log(req.body.password);
    // });
};