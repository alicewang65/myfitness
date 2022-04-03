const argon2 = require("argon2");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

function reg(passport) {
    // required for passport to maintain persistent
    // login sessions
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    // register
    passport.use("local-signup", new LocalStrategy((username, password, done) => {
        User.find({ "username": username }, async (err, user) => {
            console.log("username: ", username);
            console.log("password: ", password);

            if (err) {
                // return errors if there are
                return done(err);
            }
            if (user.length !== 0) {
                console.log("already exists :(((");
                // check if user already exists
                return done(null, false);
            } else {
                const hashedPass = await argon2.hash(password);

                const newUser = new User({
                    username: username,
                    password: hashedPass
                }).save((err, review) => {
                    if (err) {
                        console.log("error adding user to db");
                        console.log(err);
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));
}

module.exports = reg;